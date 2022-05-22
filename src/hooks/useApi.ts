import { PENDING, ERROR, SUCCESS } from '../constants/api/apiStatuses'
import { useApiStatus } from '@/hooks/useApiStatuses'
import { useState } from 'react'

interface USeApiConfig<T> {
  initialData?: T
}

type ApiFunction<T = unknown> = (...args: unknown[]) => T | Promise<T>

export function useApi<TData = unknown, TError = unknown>(
  fn: ApiFunction<TData>,
  config: USeApiConfig<TData> = {}
) {
  const { initialData } = config
  const [data, setData] = useState<TData | undefined>(initialData)
  const [error, setError] = useState<TError | unknown>()
  const { status, setStatus, ...normalizedStatuses } = useApiStatus()

  const call = async (...args: unknown[]) => {
    try {
      setStatus(PENDING)

      const data = await fn(...args)
      setData(data)
      setStatus(SUCCESS)
      return {
        data,
        error: null,
      }
    } catch (error) {
      setError(error)
      setStatus(ERROR)
      return {
        data: null,
        error,
      }
    }
  }

  return {
    data,
    error,
    status,
    call,
    setStatus,
    ...normalizedStatuses,
  }
}
