import { useStorage } from './use-react-store'
import { WebStorageAdapter } from './web-storage-adapter'

export interface Params<V> {
  key: string
  initialValue?: V | null
}

export const createUseWebStorage = (webStorage: Storage | null) => {
  const storage = new WebStorageAdapter(webStorage)

  return <V>({ key, initialValue }: Params<V>) =>
    useStorage<V>({
      key,
      initialValue,
      storage,
    })
}

export const useLocalStorage = createUseWebStorage(typeof window === 'undefined' ? null : window.localStorage)

export const useSessionStorage = createUseWebStorage(typeof window === 'undefined' ? null : window.sessionStorage)
