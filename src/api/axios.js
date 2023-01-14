import axios from 'axios';

const baseURL = 'http://localhost:3000';

const userLogged = JSON.parse(localStorage.getItem("RS_USER"));
const userJwt = userLogged.jwt;


export const apiCall = (url, data, headers, method) => axios({
    method,
    url: baseURL + url,
    data,
    headers
})

export const axiosGet = async (target, param) => {
    try {
        let res = await axios.get(`${baseURL}/${target}/${param}`, {
            headers: { Authorization: "Bearer " + userJwt },
        });
        return res.data
    } catch (error) {
        console.error(error);
    }
};

export const axiosPost = async (target, param, body) => {
    try {
        let res = await axios.post(`${baseURL}/${target}/${param}`, body, {
            headers: { Authorization: "Bearer " + userJwt },
        });
        return res.data
    } catch (error) {
        console.error(error);
    }
};

export const axiosPatch = async (target, param, body) => {
    try {
        let res = await axios.patch(`${baseURL}/${target}/${param}`, body, {
            headers: { Authorization: "Bearer " + userJwt },
        });
        return res.data
    } catch (error) {
        console.error(error);
    }
};

export const axiosDelete = async (target, param) => {
    try {
        let res = await axios.delete(`${baseURL}/${target}/${param}`, {
            headers: { Authorization: "Bearer " + userJwt },
        });
        return res.data
    } catch (error) {
        console.error(error);
    }
};

axios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)