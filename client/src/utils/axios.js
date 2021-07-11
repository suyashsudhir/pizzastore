import axios from 'axios';

const token = window.localStorage.getItem('token');

axios.interceptors.request.use(config => {
    
    if(config.url.includes('login')){
        return config;
    }
    else{
        
        if(token){

            config.headers['authorization'] = `Bearer ${token}`;
        }
        return config;
    }

}, err => {
    return Promise.reject(err);
})

export default axios