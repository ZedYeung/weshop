import axios from 'axios';
import Cookies from 'universal-cookie';

const host = process.env.NODE_ENV === "production" ? "/api" : "http://localhost:8081";

axios.interceptors.request.use(
    (config) => {
        const cookies = new Cookies();
        if (!! cookies.get(process.env.TOKEN_KEY)) {
            config.headers.Authorization = `${process.env.AUTH_PREFIX} ${cookies.get(process.env.TOKEN_KEY)}`;
        }
        return config;
    }, (err) => {
        return Promise.reject(err);
    }
)

export const getProducts = (params) => {
    return axios.get(`${host}/product/`, { params: params });
};

export const getCategories = () => {
    // must add the last /
    // otherwise blocked by cors
    return axios.get(`${host}/category/` );
};

export const login = (params) => {
    return axios.post(`${host}/login/`, params)
}

export const register = (params) => {
    return axios.post(`${host}/user/`, params)
}

export const getProduct = (productID) => {
    return axios.get(`${host}/product/${productID}/`)
}

export const getUserProfile = () => {
    return axios.get(`${host}/user/1/`)
}

export const updateUserProfile = (params) => {
    return axios.put(`${host}/user/1/`, params )
}

export const getAddresses = () => {
    return axios.get(`${host}/address/`)
}

export const deleteAddress = (addressID) => {
    return axios.delete(`${host}/address/${addressID}/`)
}

export const updateAddress = (addressID, params) => {
    return axios.patch(`${host}/address/${addressID}/`, params)
}

export const createAddress = (params) => {
    return axios.post(`${host}/address/`, params)
}

export const getCart = () => {
    return axios.get(`${host}/cart/`)
}

export const addCart = (params) => {
    return axios.post(`${host}/cart/`, params)
}

export const deleteCart = (productID) => {
    return axios.delete(`${host}/cart/${productID}/`)
}

export const updateCart = (productID, params) => {
    return axios.patch(`${host}/cart/${productID}/`, params)
}

export const getOrders = () => {
    return axios.get(`${host}/order/`)
}

export const getOrder = (orderID) => {
    return axios.get(`${host}/order/${orderID}/`)
}

export const deleteOrder = (orderID) => {
    return axios.delete(`${host}/order/${orderID}/`)
}

export const createOrder = (params) => {
    return axios.post(`${host}/order/`, params)
}

export const checkout = (params) => {
    return axios.post(`${host}/checkout/`, params)
}

export const loginAmazon = `${host}/login/amazon/`
export const loginGoogle = `${host}/login/google-oauth2/`
export const loginTwitter = `${host}/login/twitter/`