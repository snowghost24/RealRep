import React, { useState, useContext } from 'react';
import {ActivityIndicator, Colors, HelperText, TextInput, Title, Subheading} from 'react-native-paper';

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
import {APP_NAME} from "../../utils/constants";

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


export const ForgotPasswordScreen = ({ navigation }) => {
    const { onLogin, isLoading, error } = useContext(AuthenticationContext);
    const [state, dispatch] = React.useReducer(inputReducer, initialState);

    const {
        email,
    } = state;

    const isEmailValid = (email: string) => /^[a-zA-Z]*$/.test(email);

    const inputActionHandler = (type, payload) =>
        dispatch({
            type: type,
            payload: payload,
        });

    return (
        <TextInputAvoidingView>
            <ScreenWrapperStyled>
                <Title style={styles.text}>Reset Password</Title>
                <Subheading style={styles.text}>Enter your email below and hit reset password. A link will be sent that will redirect you to a reset password page
                </Subheading>
                <Spacer size={'large'}>
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
                </Spacer>
                <View>
                    {!isLoading ? (
                        <AuthButton
                            icon="email"
                            mode="contained"
                            onPress={() => onLogin(email, password)}
                        >
                          Reset Password
                        </AuthButton>
                    ) : (
                        <ActivityIndicator animating={true} color={Colors.blue300} />
                    )}
                </View>
            </ScreenWrapperStyled>
        </TextInputAvoidingView>

    );
};

// export default  ForgotPasswordScreen

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
