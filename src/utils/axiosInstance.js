import axios from "axios";

const instance = axios.create({
    baseURL: 'http://real_rep.test/api',
    headers: {'Content-Type': 'application/json'},
    responseType: 'json',
});

instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    // const csrf = sessionStorage.getItem( 'csrf' ) || '';

    // if ( config.url !== 'auth/login' ) {
    //     config.headers.Authorization = `Bearer ${ getTokenCookie() }`;
    // }
    return config;
}, function (error) {
    console.log("error not passing", error)
    // Do something with request error
    return Promise.reject(error);
});

export default instance;

