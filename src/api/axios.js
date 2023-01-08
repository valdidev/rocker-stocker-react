import axios from 'axios';

const baseURL = 'http://localhost:3000';


export const apiCall = (url, data, headers, method) => axios({
    method,
    url: baseURL + url,
    data,
    headers
})

export const axiosGet = async (target, param, userJwt) => {
    try {
        let res = await axios.get(`${baseURL}/${target}/${param}`, {
            headers: { Authorization: "Bearer " + userJwt },
        });
        return res.data
    } catch (error) {
        console.error(error);
    }
};

/* export const axiosPost = async () => {
    try {
        let res = await axios.post(`${baseURL}/${target}`, {
            headers: { Authorization: "Bearer " + userJwt },
        });
        console.log(res);
    } catch (error) {
        console.error(error);
    }
} */

axios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)