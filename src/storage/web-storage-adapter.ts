import { Maybe, Storage as BaseStorage } from './types'


export class WebStorageAdapter implements BaseStorage<string> {
  storage: Storage | null

  constructor(storage: Storage | null) {
    this.storage = storage
  }

  getItem<V>(key: string): Maybe<V> {
    const value = this.storage?.getItem(key)

    if (value === null || typeof value === 'undefined') {
      return null
    }

    return JSON.parse(value)
  }

  setItem<V>(key: string, value: V) {
    this.storage?.setItem(key, JSON.stringify(value))
  }

  removeItem(key: string) {
    this.storage?.removeItem(key)
  }
}
