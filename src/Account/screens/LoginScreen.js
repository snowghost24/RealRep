import React, { useState, useContext } from 'react';
import {ActivityIndicator, Colors, HelperText, TextInput, Title} from 'react-native-paper';

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

const MAX_LENGTH = 20;

const initialState: State = {
    name: '',
    flatTextPassword: '',
    flatTextSecureEntry: true,
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
                <ScreenWrapperStyled>
                    {/*<AccountContainer>*/}
                    <Title style={styles.text}>Log in to {APP_NAME}</Title>
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