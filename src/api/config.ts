export const API_CONFIG = {
    BASE_URL: 'https://api.openweathermap.org/data/3.0',
    GEO: 'http://api.openweathermap.org/geo/1.0',
    API_KEY: import.meta.env.VITE_API_KEY,
    DEFAULT_PARAMS: {
        units: 'metric',
        lang: 'en',
        appid: import.meta.env.VITE_API_KEY,
    },
}