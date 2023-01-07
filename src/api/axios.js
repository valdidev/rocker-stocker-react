import axios from 'axios';

const baseURL = 'http://localhost:3000';

export const apiCall = (url, data, headers, method) => axios({
    method,
    url: baseURL + url,
    data,
    headers
})

axios.interceptors.response.use(
    (response) => {
    console.log('response', response)
    return response
},
    (error) => {
        console.log("error", error)
        return Promise.reject(error)
    }
)