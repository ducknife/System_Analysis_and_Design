import { useEffect, useState } from 'react'
import { HTTPClient } from './HTTPClient'
import { showError } from './showError'

export function useFetch<T>(path: string, initialValue: T) {
  const [data, setData] = useState<T>(initialValue)

  useEffect(() => {
    HTTPClient.fetch<T>(path).then(setData).catch(showError)
  }, [path])

  return [data, setData] as const
}
