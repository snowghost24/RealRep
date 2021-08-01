import React, { useState, useContext } from 'react';
import {ActivityIndicator, Colors, HelperText, TextInput} from 'react-native-paper';

import {
    AccountBackground,
    // AccountCover,
    AccountContainer,
    AuthButton,
    ScreenWrapperStyled,
    AuthInput,
    // Title,
    // ErrorContainer,
} from '../components/Account.styles';
import { Spacer } from '../components/Spacer/Spacer';
import { CustomText as Text } from '../../components/CustomText/CustomText';

import { AuthenticationContext } from '../../services/AuthenticationContext';
import {inputReducer, State} from "../../utils";
import {KeyboardAvoidingView, Platform, StyleSheet, View,} from "react-native";
import ScreenWrapper from "../../ScreenWrapper";
import Login from "../../Login";

const MAX_LENGTH = 20;

const initialState: State = {
    name: '',
    flatTextPassword: '',
    flatTextSecureEntry: true,
};

const TextInputAvoidingView = ({ children }) => {
    return Platform.OS === 'ios' ? (
        <KeyboardAvoidingView
            style={styles.wrapper}
            behavior="padding"
            keyboardVerticalOffset={80}
        >
            {children}
        </KeyboardAvoidingView>
    ) : (
        <>{children}</>
    );
};


 const LoginScreen = ({ navigation }) => {
    const { onLogin, isLoading, error } = useContext(AuthenticationContext);
    const [state, dispatch] = React.useReducer(inputReducer, initialState);

     const {
         email,
         password,
         flatTextSecureEntry,
     } = state;

     const isEmailValid = (email: string) => /^[a-zA-Z]*$/.test(email);
     const _isPasswordValid = (password: string) => /^[a-zA-Z]*$/.test(password);

     const inputActionHandler = (type, payload) =>
         dispatch({
             type: type,
             payload: payload,
         });

    return (
            <TextInputAvoidingView>
                <ScreenWrapperStyled>
                    {/*<AccountContainer>*/}
                        <AuthInput
                            // mode="outlined"
                            label="Email"
                            placeholder="Enter email"
                            value={email}
                            // error={!isEmailValid(email)}
                            onChangeText={(email) => inputActionHandler('email', email)}
                            // style={styles.authInput}
                        />
                        <HelperText type="error" visible={!isEmailValid(email)} padding='none' style={styles.helper}>
                            Error: Only letters are allowed
                        </HelperText>

                    <View>
                        <AuthInput
                            // mode="outlined"
                            // style={styles.authInput}
                            label="Password"
                            placeholder="Enter Password"
                            value={password}
                            // error={!_isPasswordValid(password)}
                            onChangeText={(password) =>
                                inputActionHandler('password', password)
                            }
                            secureTextEntry={flatTextSecureEntry}
                            right={
                                <TextInput.Icon
                                    name={flatTextSecureEntry ? 'eye' : 'eye-off'}
                                    onPress={() =>
                                        dispatch({
                                            type: 'flatTextSecureEntry',
                                            payload: !flatTextSecureEntry,
                                        })
                                    }
                                    forceTextInputFocus={false}
                                />
                            }
                        />
                        <HelperText type="error" visible={!_isPasswordValid(password)} padding='none' style={styles.helper}>
                            Error: Only letters are allowed
                        </HelperText>
                    </View>
                    <View>
                        {!isLoading ? (
                            <AuthButton
                                icon="email"
                                mode="contained"
                                onPress={() => onLogin(email, password)}
                            >
                               Login
                            </AuthButton>
                        ) : (
                            <ActivityIndicator animating={true} color={Colors.blue300} />
                        )}
                    </View>
                        {/*</AccountContainer>*/}
                </ScreenWrapperStyled>
            </TextInputAvoidingView>

    );
};

 export default  LoginScreen

// Login.title = 'TextInput';
//
const styles = StyleSheet.create({
    container: {
        // padding: 8,
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
    },
    helpersWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    wrapper: {
        flex: 1,
    },
    helper: {
        marginTop:0,
        marginBottom:0 ,
        paddingVertical:0,
        marginVertical:0
    },
    counterHelper: {
        textAlign: 'right',
    },
    authInput:{
        width: 300,
    },
});
