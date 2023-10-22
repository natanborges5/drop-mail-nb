import axios, { AxiosError } from 'axios'
export const api = axios.create({
    baseURL: `http://localhost:8080`,
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.data) {
            return Promise.reject(new AxiosError(error.response.data.error))
        } else {
            return Promise.reject(error)
        }
    },
)
