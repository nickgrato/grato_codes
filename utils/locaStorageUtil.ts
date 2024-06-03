type LocalStorageUtilT = {
  setItem: (key: string, value: any) => void
  getItem: (key: string) => any | null
  removeItem: (key: string) => void
  clear: () => void
}

export const localStorageUtil: LocalStorageUtilT = {
  setItem(key: string, value: any): void {
    if (typeof window !== 'undefined') {
      try {
        const serializedValue = JSON.stringify(value)
        window.localStorage.setItem(key, serializedValue)
      } catch (error) {
        console.error('Error saving to localStorage', error)
      }
    }
  },

  getItem(key: string): any | null {
    if (typeof window !== 'undefined') {
      try {
        const value = window.localStorage.getItem(key)
        try {
          // Attempt to parse the value as JSON
          return JSON.parse(value!) // Using the non-null assertion operator because we know it's not null from the outer try block
        } catch {
          // If JSON.parse fails, return the original string
          return value
        }
      } catch (error) {
        console.error('Error retrieving from localStorage', error)
        return null
      }
    }
    return null
  },

  removeItem(key: string): void {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(key)
      } catch (error) {
        console.error('Error removing from localStorage', error)
      }
    }
  },

  clear(): void {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.clear()
      } catch (error) {
        console.error('Error clearing localStorage', error)
      }
    }
  },
}

export default localStorageUtil
