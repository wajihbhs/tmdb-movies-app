export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();
    const baseUrl = config.public.TMDB_IMAGE_BASE;
    const posterUrl = (path?: string): string | undefined => {
        if (!path) return undefined;

        return `${baseUrl}${path}`;
    };

    return {
        provide: {
            posterUrl
        }
    };
});
