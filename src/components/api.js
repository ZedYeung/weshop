import axios from 'axios';

const local_host = "http://localhost:8000";

export const getProducts = (params) => {
    return axios.get(`${local_host}/product`, { params: params })
};