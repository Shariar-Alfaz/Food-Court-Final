import axios from 'axios';
const instance = axios.create({
    baseURL:'http://localhost:8000/api'
});

instance.interceptors.request.use((config)=>{
    config.headers.common["Authorization"] = localStorage.getItem('_authToken');
    return config;
},(error)=>{
    
});
instance.interceptors.response.use((rsp)=>{
    return rsp;
},(err)=>{
    if(err.response.status == 401){
        window.location.href="/";
    }
    return err;
});

export default instance;