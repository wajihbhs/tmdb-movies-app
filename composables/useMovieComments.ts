import type {MovieComment} from "~/types/movieComment";

const STORAGE_KEY = 'movie-comments'

// TODO Composable is not reactive , comment list are not updated on add

export function useMovieComments(movieId: number) {
    const all = ref<MovieComment[]>([])

    const load = () => {
        const stored = localStorage.getItem(STORAGE_KEY)
        all.value = stored ? JSON.parse(stored).filter((c: MovieComment) => c.movieId === movieId) : []
    }

    const add = (comment: Omit<MovieComment, 'id' | 'createdAt'>) => {
        const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
        const fullComment = {
            ...comment,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString()
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...current, fullComment]))
        load()
    }

    onMounted(load)

    return {
        comments: computed(() => [...all.value].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))),
        add
    }
}
