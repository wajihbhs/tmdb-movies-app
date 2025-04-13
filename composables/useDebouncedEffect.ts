import { watch, type WatchSource } from 'vue'
import { useDebounceFn } from '@vueuse/core'

/**
 * Watch a source with debounce and trigger a callback
 *
 * @param source - A reactive source (ref, computed, etc.)
 * @param callback - Function to run after debounce
 * @param delay - Debounce delay in ms (default: 300ms)
 */
export function useDebouncedWatch<T>(
    source: WatchSource<T>,
    callback: (value: T) => void,
    delay = 300
): void {
    const debounced = useDebounceFn(callback, delay)
    watch(source, (value) => debounced(value), { deep: true })
}
