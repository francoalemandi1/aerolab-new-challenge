"use client";

import { useCallback, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

declare global {
  interface WindowEventMap {
    "local-storage": CustomEvent;
  }
}

type UseLocalStorageOptions<T> = {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
};

const IS_SERVER = typeof window === "undefined";

/**
 * Custom hook para manejar localStorage con mejor manejo de errores
 * Basado en las mejores prácticas de usehooks-ts
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T),
  options: UseLocalStorageOptions<T> = {}
): [T, Dispatch<SetStateAction<T>>, () => void, boolean] {
  const serializer = useCallback<(value: T) => string>(
    value => {
      if (options.serializer) {
        return options.serializer(value);
      }
      return JSON.stringify(value);
    },
    [options]
  );

  const deserializer = useCallback<(value: string) => T>(
    value => {
      if (options.deserializer) {
        return options.deserializer(value);
      }

      if (value === "undefined") {
        return undefined as unknown as T;
      }

      const defaultValue =
        initialValue instanceof Function ? initialValue() : initialValue;

      let parsed: unknown;
      try {
        parsed = JSON.parse(value);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return defaultValue;
      }

      return parsed as T;
    },
    [options, initialValue]
  );

  const readValue = useCallback((): T => {
    const initialValueToUse =
      initialValue instanceof Function ? initialValue() : initialValue;

    if (IS_SERVER) {
      return initialValueToUse;
    }

    try {
      const raw = window.localStorage.getItem(key);
      return raw ? deserializer(raw) : initialValueToUse;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValueToUse;
    }
  }, [initialValue, key, deserializer]);

  // Estado para manejar hidratación
  const [isHydrated, setIsHydrated] = useState(false);

  const [storedValue, setStoredValue] = useState(() => {
    // En el servidor o durante la hidratación inicial, usar valor por defecto
    const initialValueToUse =
      initialValue instanceof Function ? initialValue() : initialValue;
    return initialValueToUse;
  });

  // Efecto para hidratar el valor real del localStorage después del mount
  useEffect(() => {
    if (!isHydrated) {
      setStoredValue(readValue());
      setIsHydrated(true);
    }
  }, [isHydrated, readValue]);

  const setValue: Dispatch<SetStateAction<T>> = useCallback(
    value => {
      if (IS_SERVER) {
        console.warn(
          `Tried setting localStorage key "${key}" even though environment is not a client`
        );
        return;
      }

      try {
        const newValue = value instanceof Function ? value(readValue()) : value;
        window.localStorage.setItem(key, serializer(newValue));
        setStoredValue(newValue);

        // Dispatch custom event para sincronización entre pestañas
        window.dispatchEvent(
          new CustomEvent("local-storage", {
            detail: {
              key,
              newValue,
            },
          })
        );
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, serializer, readValue]
  );

  const removeValue = useCallback(() => {
    if (IS_SERVER) {
      console.warn(
        `Tried removing localStorage key "${key}" even though environment is not a client`
      );
      return;
    }

    const defaultValue =
      initialValue instanceof Function ? initialValue() : initialValue;

    window.localStorage.removeItem(key);
    setStoredValue(defaultValue);

    window.dispatchEvent(
      new CustomEvent("local-storage", {
        detail: {
          key,
          newValue: defaultValue,
        },
      })
    );
  }, [key, initialValue]);

  // Sincronizar entre pestañas
  useEffect(() => {
    const handleStorageChange = (e: CustomEvent) => {
      if (e.detail?.key && e.detail.key !== key) {
        return;
      }
      setStoredValue(readValue());
    };

    window.addEventListener("local-storage", handleStorageChange);
    return () =>
      window.removeEventListener("local-storage", handleStorageChange);
  }, [key, readValue]);

  return [storedValue, setValue, removeValue, isHydrated];
}
