import React, { useState, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import AxiosInstance from '../utils/axiosInstance';
import { BEARER_TOKEN } from '../utils/constants';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ( { children } ) => {
    const [ isLoading, setIsLoading ] = useState( false );
    const [ user, setUser ] = useState( null );
    const [ error, setError ] = useState( null );

    const onLogin = ( email, password ) => {
        setIsLoading( true );
        AxiosInstance.post( '/login', {
            email,
            password,
            device_name: 'something',
        } ).then( ( response ) => {
            if ( _.get( response.data.token ) ) {
                AsyncStorage.setItem( BEARER_TOKEN, response.data.token );
            }
            return response;
        } ).then( ( response ) => {
            setUser( response.data.user );
            setIsLoading( false );
        } ).catch( ( err ) => {
            if ( _.get( err.response.status ) === 422 ) {
                if ( _.get( err.response.data.errors.email[ 0 ] ) ) {
                    setError( _.get( err.response.data.errors.email[ 0 ] ).toString() );
                } else if ( _.get( err.response.data.errors.password[ 0 ] ) ) {
                    setError( _.get( err.response.data.errors.password[ 0 ] ).toString() );
                }
                setIsLoading( false );
            } else {
                setError( 'Unable to authenticate, please check username and password' );
                setIsLoading( false );
            }
        } );
    };

    const onRegister = ( email, password, repeatedPassword ) => {
        // setIsLoading(true);
        // if (password !== repeatedPassword) {
        //     setError('Error: Passwords do not match');
        //     return;
        // }
        //
        // firebase
        //     .auth()
        //     .createUserWithEmailAndPassword(email, password)
        //     .then((u) => {
        //         setUser(u);
        //         setIsLoading(false);
        //     })
        //     .catch((err) => {
        //         setIsLoading(false);
        //         setError(err.toString());
        //     });
    };

    const onLogout = () => {
        setIsLoading( true );
        AxiosInstance.post( '/logout' ).then( ( ) => {
            setUser( null );
            setIsLoading( false );
            AsyncStorage.setItem( BEARER_TOKEN, null );
        } ).catch( ( ) => {
            setUser( null );
            setIsLoading( false );
            AsyncStorage.setItem( BEARER_TOKEN, null );
        } );
    };

    return (
        <AuthenticationContext.Provider
            value={ {
                isAuthenticated: !!user,
                isLoading,
                user,
                error,
                setError,
                onLogin,
                onRegister,
                onLogout,
            } }
        >
            {children}
        </AuthenticationContext.Provider>
    );
};
