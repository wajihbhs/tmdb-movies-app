import { ref } from 'vue'
import { useMovieStore } from '~/stores/movieStore'
import { useIntersectionObserver } from '@vueuse/core'

export function useInfiniteMoviesObserver() {
    const target = ref<HTMLElement | null>(null)
    const movieStore = useMovieStore()

    useIntersectionObserver(target, async ([{ isIntersecting }]) => {
        if (
            isIntersecting &&
            !movieStore.isLoading &&
            movieStore.hasMorePages
        ) {
            await movieStore.loadNextPage()
        }
    })

    return { target }
}
