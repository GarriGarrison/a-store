import { useCallback, useEffect, useState } from 'react'
import { storageEventObserver, StorageEvent } from './storage-event-observer'
import { Maybe, Storage } from './types'


export const isActualEvent = <V, K>(event: StorageEvent, storage: Storage<K, V>, key: K): event is StorageEvent<K, V> =>
  event.key === key && event.storage === storage

export interface Params<V, K> {
  key: K
  initialValue?: Maybe<V>
  storage: Storage<K, V>
}

export const useStorage = <V, K = any>({
  key,
  storage,
  initialValue = null,
}: Params<V, K>): [Maybe<V>, (data: V) => void, () => void] => {
  const [localValue, setLocalValue] = useState<Maybe<V>>(initialValue)

  const handleSetValue = useCallback(
    (data: V) => {
      storage.setItem(key, data)
      storageEventObserver.dispatch({
        storage,
        key,
        value: data,
      })
    },
    [key, storage]
  )

  const handleRemoveValue = useCallback(() => {
    storage.removeItem(key)
    storageEventObserver.dispatch({
      storage,
      key,
      value: null,
    })
  }, [storage, key])

  useEffect(() => {
    const storedValue = storage.getItem(key)
    const actualValue = storedValue ?? initialValue

    setLocalValue(actualValue)

    if (actualValue !== null && storedValue !== actualValue) {
      handleSetValue(actualValue)
    }
  }, [key, initialValue, storage, handleSetValue])

  useEffect(() => {
    const handleStorageValueChange = (event: StorageEvent) => {
      if (!isActualEvent<V, K>(event, storage, key)) {
        return
      }

      setLocalValue(event.value)
    }

    storageEventObserver.subscribe(handleStorageValueChange)

    return () => {
      storageEventObserver.unsubscribe(handleStorageValueChange)
    }
  }, [storage, key])

  return [localValue, handleSetValue, handleRemoveValue]
}
