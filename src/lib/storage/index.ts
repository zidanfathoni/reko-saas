import { getCookie, setCookie } from 'cookies-next';

type TstorageType = 'local' | 'session' | 'cookie';

const isBrowser = typeof window !== 'undefined';

const Storage = {
  get<T>(typ: TstorageType, key: string, fallback?: T): T | null {
    if (!isBrowser) return fallback ?? null;

    let data = null;
    if (typ == 'local') data = window.localStorage.getItem(key);
    // if (typ == 'session') data = window.sessionStorage.getItem(key);
    if (typ == 'cookie') data = getCookie(key);

    if (data) {
      try {
        data = JSON.parse(data);
      } catch {
        return null;
      }
    }
    return data ? (data as T) : fallback ?? null;
  },

  set<T>(typ: TstorageType, key: string, data: T): T | null {
    if (!isBrowser) return null;

    try {
      if (typ == 'local') window.localStorage.setItem(key, JSON.stringify(data));
      // if (typ == 'session') window.sessionStorage.setItem(key, JSON.stringify(data));
      if (typ == 'cookie') setCookie(key, JSON.stringify(data));
      return data;
    } catch {
      return null;
    }
  },

  remove<T>(typ: TstorageType, key: string): void {
    if (!isBrowser) return;

    if (typ == 'local') window.localStorage.removeItem(key);
    // if (typ == 'session') window.sessionStorage.removeItem(key);
    if (typ == 'cookie') setCookie(key, null);
  },

  clearAll<T>(typ: TstorageType): void {
    if (!isBrowser) return;

    if (typ == 'local') window.localStorage.clear();
    // if (typ == 'session') window.sessionStorage.clear();
    if (typ == 'cookie') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
      }
    }
  }
};

export { Storage };
