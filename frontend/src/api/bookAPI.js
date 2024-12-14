import axios from "axios";


export const API_SERVER_HOST = "http://localhost:8080"

const prefix = `${API_SERVER_HOST}/api/books`


export const getList = async (pageParam) => {
    const {page, size} = pageParam
    const res = await axios.get(`${prefix}/`, {params: {page: page, size: size}})
    return res
}

export const getOne = async (bno) => {
    const res = await axios.get(`${prefix}/${bno}`)
    return res
}

export const putOne = async (bno, bookDTO) => {
    const header = {headers: {"Content-Type": "multipart/form-data"}}
    const res = await axios.put(`${prefix}/${bno}`, bookDTO, header)
    return res
}

export const addOne = async (bookDTO) => {
    const header = {headers: {"Content-Type": "multipart/form-data"}}
    const res = await axios.post(`${prefix}/`, bookDTO, header)
    return res
}

export const deleteOne = async (bno) => {
    const res = await axios.delete(`${prefix}/${bno}`)
    return res
}

export const viewFile = async (fileName) => {
    const res = await axios.get(`${prefix}/view/${fileName}`)
    return res
}