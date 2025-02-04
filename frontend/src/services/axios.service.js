import axios from "axios";

export const axiosClient = axios.create({
    baseURL: import.meta.env.PROD ? "/api" : "http://localhost:3030/api",
    withCredentials: 'include'
})