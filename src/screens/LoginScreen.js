import React, { useContext } from 'react';
import {
    TextInput,
    Title,
    Text,
} from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { validationRules } from '../utils/helperFunctions';
import {
    AuthButton,
    ScreenWrapperStyled,
    AuthInput,
    LinkButton,
} from '../Account/components/Account.styles';
import { Spacer } from '../components/Spacer/Spacer';
import { AuthenticationContext } from '../services/AuthenticationContext';
import { inputReducer } from '../utils';
import { APP_NAME } from '../utils/constants';
import TextFieldHelperMessage from '../components/TextFieldHelperMessage/TextFieldHelperMessage';
import GoogleAuthButton from '../components/Buttons/GoogleAuthButton';

const styles = StyleSheet.create( {
    linkButtonSpacing: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    formError: {
        justifyContent: 'center',
    },
} );

const initialState = {
    email: 'jguzman24680@gmail.com',
    emailError: undefined,
    password: 'testing1',
    passwordError: undefined,
    flatTextSecureEntry: true,
};

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ( { navigation } ) => {
    const [ state, dispatch ] = React.useReducer( inputReducer, initialState );
    const {
        onLogin,
        isLoading,
        error,
        setError,
    } = useContext( AuthenticationContext );

    const {
        email,
        emailError,
        password,
        passwordError,
        flatTextSecureEntry,
    } = state;

    const inputActionHandler = ( type, payload ) => {
        if ( error ) {
            setError( null );
        }

        return dispatch( { type, payload } );
    };

    return (
        <ScreenWrapperStyled>
            <Title style={ styles.text }>
                Log in to
                {' '}
                {APP_NAME}
            </Title>
            <Spacer size="md">
                {/* <GoogleAuthButton /> */}
            </Spacer>
            <Spacer size="md">
                <Text variant="caption" style={ { textAlign: 'center' } }>or</Text>
            </Spacer>
            <Spacer size="md">
                <AuthInput
                    mode="outlined"
                    label="Email"
                    placeholder="Enter email"
                    value={ email }
                    error={ emailError }
                    onChangeText={ ( email ) => inputActionHandler( 'email', email ) }
                    onFocus={ () => inputActionHandler( 'emailError', '' ) }
                    onBlur={ () => inputActionHandler( 'emailError', validationRules.isEmailValid( email ) ) }
                />
            </Spacer>
            <TextFieldHelperMessage
                message={ emailError }
                messageType="error"
            />
            <Spacer size="md">
                <AuthInput
                    mode="outlined"
                    label="Password"
                    placeholder="Enter Password"
                    value={ password }
                    error={ passwordError }
                    onChangeText={ ( password ) => inputActionHandler( 'password', password ) }
                    onFocus={ () => inputActionHandler( 'passwordError', '' ) }
                    onBlur={ () => inputActionHandler( 'passwordError', validationRules.safeVarChars( password ) ) }
                    secureTextEntry={ flatTextSecureEntry }
                    right={ (
                        <TextInput.Icon
                            name={ flatTextSecureEntry ? 'eye-off' : 'eye' }
                            onPress={ () => dispatch( {
                                type: 'flatTextSecureEntry',
                                payload: !flatTextSecureEntry,
                            } ) }
                            forceTextInputFocus={ false }
                        />
                    ) }
                />
            </Spacer>
            <TextFieldHelperMessage
                message={ passwordError }
                messageType="error"
            />
            <Spacer size="md">
                <View style={ styles.linkButtonSpacing }>
                    <LinkButton onPress={ () => navigation.navigate( 'ForgotPassword' ) }>Forgot Password</LinkButton>
                    <LinkButton>Private Policy</LinkButton>
                </View>
            </Spacer>
            <Spacer size="md">
                <View>
                    <AuthButton
                        icon="lock-open-outline"
                        mode="contained"
                        onPress={ () => onLogin( email, password ) }
                        loading={ isLoading }
                    >
                        Log in
                    </AuthButton>
                </View>
            </Spacer>
            <Spacer size="md">
                <TextFieldHelperMessage
                    message={ error }
                    messageType="error"
                    style={ styles.formError }
                />
            </Spacer>
        </ScreenWrapperStyled>
    );
};

export default LoginScreen;
