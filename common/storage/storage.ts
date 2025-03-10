import AS from "@react-native-async-storage/async-storage";

export interface Storage {
  setItem: (key: string, value: string, callback: () => void) => void;
  getItem: (
    key: string,
  ) => string | number | boolean | undefined | Promise<string | null>;
  clear: () => void;
  removeItem: (key: string) => void;
  containsKey: (key: string) => boolean;
}

class AsyncStorage implements Storage {
  private static storage: typeof AS;
  private static instance: AsyncStorage;
  constructor() {
    if (AsyncStorage.instance) {
      return AsyncStorage.instance;
    }
    AsyncStorage.storage = AS;
    AsyncStorage.instance = this;
  }

  setItem(key: string, value: string, callback?: () => void): void {
    AsyncStorage.storage.setItem(key, value, callback);
  }

  getItem(key: string) {
    return AsyncStorage.storage.getItem(key);
  }

  clear() {
    AsyncStorage.storage.clear();
  }

  removeItem(key: string) {
    AsyncStorage.storage.removeItem(key);
  }

  containsKey(key: string) {
    return !!this.getItem(key);
  }
}

export const asyncStorage = new AsyncStorage();
