import {
  Canceler,
  AxiosInstance,
  AxiosError,
  AxiosPromise,
  AxiosRequestConfig,
} from 'axios'

export type { Canceler }

type AxiosMethods = Pick<
  AxiosInstance,
  'get' | 'post' | 'put' | 'patch' | 'delete'
>

export type WithAbortFn = AxiosMethods[keyof AxiosMethods]

export type ApiError = AxiosError

export type ApiExecutor<T> = {
  (url: string, body: unknown, config: AxiosRequestConfig): AxiosPromise<T>
  (url: string, config: AxiosRequestConfig): AxiosPromise<T>
}

export type ApiExecutorArgs =
  | [string, unknown, AxiosRequestConfig]
  | [string, AxiosRequestConfig]

export type ApiRequestConfig = AxiosRequestConfig & {
  abort?: (cancel: Canceler) => void
}
