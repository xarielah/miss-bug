
import { axiosClient } from './axios.service.js'

const STORAGE_KEY = 'bugDB'

export const bugService = {
    query,
    getById,
    save,
    remove,
}


function query() {
    return axiosClient.get('/bugs').then(({ data }) => data)
}
function getById(bugId) {
    return axiosClient.get(`/bugs/${bugId}`).then(({ data }) => data)
}
function remove(bugId) {
    return axiosClient.get(`/bugs/${bugId}/remove`).then(({ data }) => data)
}
function save(bug) {
    const queryParams = new URLSearchParams(bug)
    return axiosClient.get(`/bugs/save?${queryParams.toString()}`).then(({ data }) => data)
}