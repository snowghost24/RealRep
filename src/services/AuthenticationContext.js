import React, { useState, createContext } from 'react';
import _ from 'lodash';
import AxiosInstance from '../utils/axiosInstance';
import { BEARER_TOKEN } from '../utils/constants';
import { storeData, getData } from '../utils/helperFunctions';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ( { children } ) => {
    const [ isLoading, setIsLoading ] = useState( false );
    const [ isRegistrationLoading, setRegistrationLoading ] = useState( false );
    const [ isLoadingPwdReset, setIsLoadingPwdReset ] = useState( false );
    const [ error, setError ] = useState( null );

    const [ registrationError, setRegistrationError ] = useState( null );
    const [ user, setUser ] = useState( null );

    const onForgotPassword = async( email ) => {
        setIsLoadingPwdReset( true );
        try {
            const response = await AxiosInstance.post( '/forgot-password', {
                email,
                device_name: 'something',
            } );
            // TODO display flash message
            setIsLoadingPwdReset( false );
        } catch ( err ) {
            setIsLoadingPwdReset( false );
        }
    };

    const onLogin = async( email, password ) => {
        setIsLoading( true );
        try {
            const response = await AxiosInstance.post( '/login', {
                email,
                password,
                device_name: 'something',
            } );

            if ( _.get( response, 'data.token' ) ) {
                await storeData( BEARER_TOKEN, _.get( response, 'data.token' ) );
            }

            setUser( _.get( response, 'data.user' ) );
            setIsLoading( false );
        } catch ( err ) {
            const status = _.get( err, 'response.status' );
            const errors = _.get( err, 'response.data.errors' );
            setIsLoading( false );
            if ( status === 422 && !_.isEmpty( errors ) ) {
                const key = Object.keys( errors )[ 0 ];
                setError( errors[ key ][ 0 ] );
            } else {
                setError( 'Unable to authenticate, please check username and password' );
                setIsLoading( false );
            }
        }
    };

    const onRegister = async( {
        name,
        username,
        email,
        password,
        confirmPassword,
    } ) => {
        try {
            setRegistrationLoading( true );
            const response = await AxiosInstance.post( '/register', {
                name,
                username,
                email,
                password,
                password_confirmation: confirmPassword,
                device_name: 'something',
            } );

            if ( _.get( response, 'data.success' ) ) {
                await storeData( BEARER_TOKEN, response.data.token );
            }
            console.log( 'use data', response.data.user );
            setUser( response.data.user );
            setRegistrationLoading( false );
        } catch ( err ) {
            const status = _.get( err, 'response.status' );
            const errors = _.get( err, 'response.data.errors' );
            setRegistrationLoading( false );
            if ( status === 422 && !_.isEmpty( errors ) ) {
                const key = Object.keys( errors )[ 0 ];
                setRegistrationError( errors[ key ][ 0 ] );
            } else {
                setRegistrationError( 'Unable to register, please check submitted fields' );
            }
        }
    };

    const onLogout = async() => {
        setIsLoading( true );
        try {
            await AxiosInstance.post( '/logout' );
        } catch ( e ) {

        }
        setUser( null );
        setIsLoading( false );
        await storeData( BEARER_TOKEN, null );
    };

    // React.useEffect( () => {
    //     // console.log( 'fetch token was called' );
    //     // Fetch the token from storage then navigate to our appropriate place
    //     const bootstrapAsync = async() => {
    //         let userToken;
    //
    //         try {
    //             userToken = await getData( BEARER_TOKEN );
    //             if ( userToken ) {
    //                 const response = await AxiosInstance.post( '/check_auth', { token: userToken } );
    //                 // console.log( 'checkauth response', response );
    //                 if ( _.get( response.data.token ) ) {
    //                     await storeData( BEARER_TOKEN, response.data.token );
    //                 }
    //
    //                 setUser( response.data.user );
    //                 setIsLoading( false );
    //             }
    //             // console.log( 'user token', userToken );
    //         } catch ( e ) {
    //             // this means the token is bad and we just delete it
    //             await storeData( BEARER_TOKEN, null );
    //         }
    //
    //         // After restoring token, we may need to validate it in production apps
    //
    //         // This will switch to the App screen or Auth screen and this loading
    //         // screen will be unmounted and thrown away.
    //         // dispatch( { type: 'RESTORE_TOKEN', token: userToken } );
    //     };
    //
    //     bootstrapAsync();
    // }, [] );

    return (
        <AuthenticationContext.Provider
            value={ {
                isAuthenticated: !!user,
                isLoading,
                user,
                setUser,
                error,
                setError,
                setIsLoading,
                registrationError,
                setRegistrationError,
                isRegistrationLoading,
                setRegistrationLoading,
                isLoadingPwdReset,
                setIsLoadingPwdReset,
                onLogin,
                onRegister,
                onLogout,
                onForgotPassword,
            } }
        >
            {children}
        </AuthenticationContext.Provider>
    );
};
