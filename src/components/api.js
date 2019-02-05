import axios from 'axios';

const local_host = "http://localhost:8000";

export const getProducts = (params) => {
    return axios.get(`${local_host}/product/`, { params: params });
};

export const getCategories = () => {
    // must add the last /
    // otherwise blocked by cors
    return axios.get(`${local_host}/category/` );
};