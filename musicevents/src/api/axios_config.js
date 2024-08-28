import axios from 'axios'

export const axios_configuration = axios.create({
    baseURL: 'http://localhost:2000',
    withCredentials: true
})