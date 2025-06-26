"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook para implementar debounce en inputs
 * Útil para evitar demasiadas llamadas a la API mientras el usuario escribe
 *
 * @param value - El valor a hacer debounce
 * @param delay - El tiempo de delay en milisegundos (por defecto 500ms)
 * @returns El valor con debounce aplicado
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Crear un timer que actualice el valor después del delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpiar el timer si el valor cambia antes de que se complete el delay
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook alternativo que retorna tanto el valor original como el debounced
 * Útil cuando necesitas mostrar el valor inmediatamente pero hacer la búsqueda con delay
 *
 * @param initialValue - Valor inicial
 * @param delay - El tiempo de delay en milisegundos
 * @returns [value, debouncedValue, setValue]
 */
export function useDebouncedState<T>(
  initialValue: T,
  delay: number = 500
): [T, T, (value: T) => void] {
  const [value, setValue] = useState<T>(initialValue);
  const debouncedValue = useDebounce(value, delay);

  return [value, debouncedValue, setValue];
}

/**
 * Hook para debounce de funciones
 * Útil para operaciones que no necesitan el valor sino ejecutar una función
 *
 * @param callback - Función a ejecutar
 * @param delay - El tiempo de delay en milisegundos
 * @returns Función debounced
 */
export function useDebouncedCallback<T extends (...args: never[]) => unknown>(
  callback: T,
  delay: number = 500
): T {
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      // Limpiar el timer anterior si existe
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      // Crear nuevo timer
      const newTimer = setTimeout(() => {
        callback(...args);
      }, delay);

      setDebounceTimer(newTimer);
    },
    [callback, delay, debounceTimer]
  ) as T;

  // Limpiar timer al desmontar el componente
  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  return debouncedCallback;
}
