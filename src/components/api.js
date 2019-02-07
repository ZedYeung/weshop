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

export const login = (params) => {
    return axios.post(`${local_host}/login/`, params)
}

export const register = (params) => {
    return axios.post(`${local_host}/user/`, params)
}

export const getProduct = (productID) => {
    return axios.get(`${local_host}/product/${productID}/`)
}