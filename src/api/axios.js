import axios from 'axios';

const baseURL = 'http://localhost:3000';

export const apiCall = (url, data, headers, method) => axios({
    method,
    url: baseURL + url,
    data,
    headers
})
