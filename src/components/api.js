import axios from 'axios';
import Cookies from 'universal-cookie';
import { AUTH_PREFIX, TOKEN_KEY } from '../.env';

const local_host = "http://localhost:8000";

axios.interceptors.request.use(
    (config) => {
        const cookies = new Cookies();
        if (!! cookies.get(TOKEN_KEY)) {
            config.headers.Authorization = `${AUTH_PREFIX} ${cookies.get(TOKEN_KEY)}`;
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

export const updateUserProfile = (params) => {
    return axios.put(`${local_host}/user/1/`, params )
}

export const getAddresses = () => {
    return axios.get(`${local_host}/address/`)
}

export const deleteAddress = (addressID) => {
    return axios.delete(`${local_host}/address/${addressID}/`)
}

export const updateAddress = (addressID, params) => {
    return axios.patch(`${local_host}/address/${addressID}/`, params)
}

export const createAddress = (params) => {
    return axios.post(`${local_host}/address/`, params)
}

export const getCart = () => {
    return axios.get(`${local_host}/cart/`)
}

export const addCart = (params) => {
    return axios.post(`${local_host}/cart/`, params)
}

export const deleteCart = (productID) => {
    return axios.delete(`${local_host}/cart/${productID}/`)
}

export const updateCart = (productID, params) => {
    return axios.patch(`${local_host}/cart/${productID}/`, params)
}

export const getOrders = () => {
    return axios.get(`${local_host}/order/`)
}

export const getOrder = (orderID) => {
    return axios.get(`${local_host}/order/${orderID}/`)
}

export const deleteOrder = (orderID) => {
    return axios.delete(`${local_host}/order/${orderID}/`)
}

export const createOrder = (params) => {
    return axios.post(`${local_host}/order/`, params)
}

export const checkout = (params) => {
    return axios.post(`${local_host}/checkout/`, params)
}

export const loginGoogle = `${local_host}/login/google-oauth2`