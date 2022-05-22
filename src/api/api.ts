import axios, { AxiosInstance, AxiosRequestConfig, Cancel } from 'axios'
import {
  ApiRequestConfig,
  WithAbortFn,
  ApiExecutor,
  ApiExecutorArgs,
  ApiError,
} from './api.types'

const axiosParams = {
  baseURL: 'http://localhost:3000/api',
}

const axiosInstance = axios.create(axiosParams)

export const didAbort = (
  error: unknown
): error is Cancel & { aborted: boolean } => axios.isCancel(error)

const getCancelSource = () => axios.CancelToken.source()

export const isApiError = (error: unknown): error is ApiError => {
  return axios.isAxiosError(error)
}
const withABort = <T>(fn: WithAbortFn) => {
  const executor: ApiExecutor<T> = async (...args: ApiExecutorArgs) => {
    const originalConfig = args[args.length - 1] as ApiRequestConfig
    const { abort, ...config } = originalConfig
    if (typeof abort === 'function') {
      const { cancel, token } = getCancelSource()
      config.cancelToken = token
      abort(cancel)
    }
    try {
      if (args.length > 2) {
        const [url, body] = args
        return await fn<T>(url, body, config)
      } else {
        const [url] = args
        return await fn<T>(url, config)
      }
    } catch (error) {
      console.log('api error', error)
      if (didAbort(error)) {
        error.aborted = true
      }
      throw error
    }
  }
  return executor
}

const api = (axios: AxiosInstance) => {
  const get = <T>(url: string, config: AxiosRequestConfig = {}) => {
    return withABort<T>(axios.get)(url, config)
  }

  const post = <T>(url: string, body: unknown, config: AxiosRequestConfig) => {
    return withABort<T>(axios.post)(url, body, config)
  }

  const put = <T>(url: string, body: unknown, config: AxiosRequestConfig) => {
    return withABort<T>(axios.put)(url, body, config)
  }

  const patch = <T>(url: string, body: unknown, config: AxiosRequestConfig) => {
    return withABort<T>(axios.patch)(url, body, config)
  }

  const del = <T>(url: string, config: AxiosRequestConfig) => {
    return withABort<T>(axios.delete)(url, config)
  }

  return {
    get,
    post,
    put,
    patch,
    del,
  }
}

export default api(axiosInstance)
