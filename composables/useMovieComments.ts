import type { MovieComment } from '~/types/movieComment'

const STORAGE_KEY = 'movie-comments'

export function useMovieComments(movieId: number) {
    const comments = ref<MovieComment[]>([])

    const syncFromStorage = () => {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as MovieComment[]
        comments.value = stored.filter(c => c.movieId === movieId)
    }

    const add = (data: Omit<MovieComment, 'id' | 'createdAt'>) => {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as MovieComment[]

        const newComment: MovieComment = {
            ...data,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString()
        }

        const updated = [...stored, newComment]
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
        comments.value = updated.filter(c => c.movieId === movieId)
    }

    onMounted(syncFromStorage)

    return {
        comments: computed(() => comments.value.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))),
        add
    }
}
