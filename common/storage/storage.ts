import { MMKV } from "react-native-mmkv";

export interface Storage {
  setItem: (key: string, value: string | number | boolean) => void;
  getItem: (key: string) => string | number | boolean | undefined;
  clear: () => void;
  removeItem: (key: string) => void;
  containsKey: (key: string) => boolean;
}

class MMKVStorage implements Storage {
  private static storage: MMKV;
  private static instance: MMKVStorage;
  constructor() {
    if (MMKVStorage.instance) {
      return MMKVStorage.instance;
    }
    MMKVStorage.storage = new MMKV();
    MMKVStorage.instance = this;
  }

  setItem(key: string, value: string | number | boolean): void {
    MMKVStorage.storage.set(key, value);
  }

  getItem(key: string) {
    return (
      MMKVStorage.storage.getString(key) ||
      MMKVStorage.storage.getNumber(key) ||
      MMKVStorage.storage.getBoolean(key)
    );
  }

  clear() {
    MMKVStorage.storage.clearAll();
  }

  removeItem(key: string) {
    MMKVStorage.storage.delete(key);
  }

  containsKey(key: string) {
    return MMKVStorage.storage.contains(key);
  }
}

export const mmkvStorage = new MMKVStorage();
