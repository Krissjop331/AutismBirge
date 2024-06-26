import axios from "axios";

const baseURL = "http://94.247.128.204:5000/api";

const $host = axios.create({
    baseURL: baseURL
})

const $authHost = axios.create({
    baseURL: baseURL

})
    
const authInterceptor = config => {
    // config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    config.headers.authorization = localStorage.getItem('token')
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}


