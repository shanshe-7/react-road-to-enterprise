import { useMemo, useState } from 'react'
import {
  ApiStatus,
  IDLE,
  defaultApiStatuses,
} from '@/constants/api/apiStatuses'

type Statuses = Record<`is${Capitalize<Lowercase<ApiStatus>>}`, Boolean>

function capitalize(status: string): string {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

function prepareStatuses(currentStatus: ApiStatus): Statuses {
  const statuses = {} as Statuses
  for (const status of defaultApiStatuses) {
    const normalizedStatus = capitalize(status.toLowerCase())
    const normalizedStatusKey = `is${normalizedStatus}` as keyof Statuses
    statuses[normalizedStatusKey] = status === currentStatus
  }

  return statuses
}

export function useApiStatus(currentStatus: ApiStatus = IDLE) {
  const [status, setStatus] = useState<ApiStatus>(currentStatus)
  const statuses = useMemo(() => prepareStatuses(status), [status])

  return {
    status,
    setStatus,
    ...statuses,
  }
}
