import axios from 'axios';
import { getData } from './helperFunctions';
import { BASE_URL, BEARER_TOKEN } from './constants';

const instance = axios.create( {
    baseURL: BASE_URL,
    // headers: { 'Content-Type': 'application/json;image/*' },
    headers: { 'Content-Type': 'application/json;multipart/form-data' },
    responseType: 'json',
} );

instance.interceptors.request.use( ( config ) => getData( BEARER_TOKEN ).then( ( token ) => {
    if ( token ) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${ token }`;
        return config;
    }
    return config;
} ), ( error ) => Promise.reject( error ) );

export default instance;
