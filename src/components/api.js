import axios from 'axios';
import { AUTH_PREFIX, TOKEN_KEY } from '../.env';

const local_host = "http://localhost:8000";

axios.interceptors.request.use(
    (config) => {
        if (!! localStorage.getItem(TOKEN_KEY)) {
            config.headers.Authorization = `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`;
        }
        return config;
    }, (err) => {
        return Promise.reject(err);
    }
)

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

export const getUserProfile = () => {
    return axios.get(`${local_host}/user/1/`)
}