import React, { useState, useContext } from 'react';
import { ActivityIndicator, Colors, HelperText, TextInput, Title } from 'react-native-paper';
import { validationRules } from "../../utils/helperFunctions";
import {
    AccountBackground,
    // AccountCover,
    AccountContainer,
    AuthButton,
    ScreenWrapperStyled,
    AuthInput,
    LinkButton,
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

const initialState: State = {
    email:'',
    emailError:undefined,
    password:'',
    passwordError: undefined,

    flatTextSecureEntry: true,
};


 const LoginScreen = ({ navigation }) => {
    const { onLogin, isLoading, error } = useContext(AuthenticationContext);
    const [ state, dispatch ] = React.useReducer(inputReducer, initialState);

     const {
         email,
         emailError,
         password,
         passwordError,
         flatTextSecureEntry,
     } = state;

     const _isPasswordValid = (password: string) => /^[a-zA-Z]*$/.test(password);

     const inputActionHandler = (type, payload) => dispatch({
             type: type,
             payload: payload,
         });

    return (
                <ScreenWrapperStyled>
                    {/*<AccountContainer>*/}
                    <Title style={styles.text}>Log in to {APP_NAME}</Title>
                    <Spacer size={'large'}>
                        <AuthInput
                            mode="outlined"
                            label="Email"
                            placeholder="Enter email"
                            value={email}
                            error={emailError}
                            onChangeText={(email) => inputActionHandler('email', email)}
                            onFocus={() => inputActionHandler('emailError', '')}
                            onBlur={() => inputActionHandler('emailError', validationRules.isEmailValid(email))}
                        />
                    </Spacer>
                    <Spacer size={'large'}>
                        <AuthInput
                            mode="outlined"
                            label="Password"
                            placeholder="Enter Password"
                            value={password}
                            error={passwordError}
                            onChangeText={(password) => inputActionHandler('password', password)}
                            onFocus={() => inputActionHandler('passwordError', '')}
                            onBlur={() => inputActionHandler('passwordError', validationRules.safeVarChars(password))}
                            secureTextEntry={flatTextSecureEntry}
                            right={
                                <TextInput.Icon
                                    name={flatTextSecureEntry ? 'eye-off' : 'eye' }
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
                    </Spacer>
                    <HelperText
                        type="error"
                        // visible={!_isPasswordValid(password)}
                        visible={ true }
                        padding='none'
                        style={styles.helper}>
                        Error: Only letters are allowed
                    </HelperText>
                    <Spacer size={'large'}>
                    <View style={{ flexDirection: 'row', justifyContent:'space-between'}}>
                    <LinkButton onPress={()=>navigation.navigate('ForgotPassword')}>Forgot Password</LinkButton>
                    <LinkButton>Private Policy</LinkButton>
                    </View>
                    </Spacer>
                    <Spacer size={'xl'}>
                    <View>
                        {!isLoading ? (
                            <AuthButton
                                icon="lock-open-outline"
                                mode="contained"
                                onPress={() => onLogin(email, password)}
                                loading={true}
                            >
                               Log in
                            </AuthButton>
                        ) : (
                            <ActivityIndicator animating={true} color={Colors.blue300} />
                        )}
                    </View>
                        </Spacer>
                        {/*</AccountContainer>*/}
                </ScreenWrapperStyled>

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
