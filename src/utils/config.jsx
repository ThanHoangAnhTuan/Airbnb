import axios from 'axios';


const api = axios.create({
    baseURL: 'https://airbnbnew.cybersoft.edu.vn/api',
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accesstoken');
        // console.log(token);
        if (token) {
            config.headers.tokenCybersoft = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
export default api;