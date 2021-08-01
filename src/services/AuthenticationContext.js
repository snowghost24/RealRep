import React, { useState, createContext } from 'react';
import AxiosInstance from '../utils/axiosInstance';
import {Platform} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BEARER_TOKEN } from "../utils/constants";
import {DarkTheme} from "react-native-paper";
// import * as firebase from 'firebase';

// import { loginRequest } from './authentication.service';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const onLogin = (email, password) => {
        setIsLoading(true);
        AxiosInstance.post('/login',{
            email,
            password,
            device_name: "something"
        }).then((response) => {
             return AsyncStorage.setItem(BEARER_TOKEN, response.data.token).then(()=>{
                 return response
             });
            }).then((response) => {
            setUser(response.data.user);
            setIsLoading(false);
        }).catch((err) => {
                console.log("whats the error",err);
                setIsLoading(false);
                // setError(err.toString());
            });
    };

    const onRegister = (email, password, repeatedPassword) => {
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
        // setUser(null);
        // firebase.auth().signOut();
    };
console.log("the user", user)
    return (
        <AuthenticationContext.Provider
            value={{
                isAuthenticated: !!user,
                // isAuthenticated: true,
                isLoading,
                user,
                error,
                onLogin,
                onRegister,
                onLogout,
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};
