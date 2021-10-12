import React, { useState, useContext, useEffect } from 'react';
import { Text as PaperText, TextInput } from 'react-native-paper';
import { View } from 'react-native';
import {
    ScreenWrapperStyled,
    AuthButton,
    AuthInput,
} from '../Account/components/Account.styles';
import { Spacer } from '../components/Spacer/Spacer';
import { CustomText as Text } from '../components/CustomText/CustomText';
import { AuthenticationContext } from '../services/AuthenticationContext';
import GoogleAuthButton from '../components/Buttons/GoogleAuthButton';
import { validationRules } from '../utils/helperFunctions';
import { inputReducer } from '../utils';
import TextFieldHelperMessage from '../components/TextFieldHelperMessage/TextFieldHelperMessage';

const initialState = {
    name: 'Jame K',
    nameError: undefined,
    username: 'JameKK',
    usernameError: undefined,
    email: 'jguzman24680@gmail.com',
    emailError: undefined,
    password: 'testing1',
    passwordError: undefined,
    confirmPassword: 'testing1',
    confirmPasswordError: undefined,
    securePassword: false,
    securePasswordConfirm: false,
};

export const RegisterScreen = ( { navigation } ) => {
    const {
        onRegister,
        registrationError,
        setRegistrationError,
        isRegistrationLoading,
    } = useContext( AuthenticationContext );
    const [ state, dispatch ] = React.useReducer( inputReducer, initialState );
    console.log( 'registration error', registrationError );
    const {
        name,
        nameError,
        username,
        usernameError,
        email,
        emailError,
        password,
        passwordError,
        confirmPassword,
        confirmPasswordError,
        securePassword,
        securePasswordConfirm,
    } = state;

    const inputActionHandler = ( type, payload ) => {
        if ( registrationError ) {
            setRegistrationError( null );
        }

        dispatch( { type, payload } );
    };

    const handleConfirmPassword = ( type, payload ) => {
        // if there a validation error set it
        if ( payload ) {
            return inputActionHandler( type, payload );
        }

        // if password is changed remove password to not match error if they eventually do
        if ( type === 'passwordError' && ( password === confirmPassword ) && confirmPasswordError === 'Passwords do not match' ) {
            return dispatch( { type: 'confirmPasswordError', payload: undefined } );
        }

        if ( type === 'confirmPasswordError' && ( password !== confirmPassword ) && password !== '' ) {
            return dispatch( { type: 'confirmPasswordError', payload: 'Passwords do not match' } );
        }
    };

    const [ isSubmitDisabled, togglesSubmitDisabled ] = useState( true );

    useEffect( () => {
        if ( ( email === '' || emailError )
            || ( password === '' || passwordError )
            || ( confirmPassword === '' || confirmPasswordError )
        ) {
            togglesSubmitDisabled( true );
        } else {
            togglesSubmitDisabled( false );
        }
    }, [ email, emailError, password, passwordError, confirmPassword, confirmPasswordError ] );

    const {
        safeVarChars,
        isEmailValid,
        maxLength,
        minLength,
        required,
        composedValidators,
    } = validationRules;

    return (
        <ScreenWrapperStyled>
            <View>
                <GoogleAuthButton />
            </View>
            <Spacer size="md">
                <PaperText variant="caption" style={ { textAlign: 'center' } }>or</PaperText>
            </Spacer>
            <Spacer size="md">
                <AuthInput
                    mode="outlined"
                    label="Name"
                    placeholder="Name"
                    value={ name }
                    error={ nameError }
                    onChangeText={ ( changedName ) => inputActionHandler( 'name', changedName ) }
                    onFocus={ () => inputActionHandler( 'nameError', undefined ) }
                    onBlur={ () => inputActionHandler( 'nameError', composedValidators( required, minLength( 7 ) )( name ) ) }
                />
            </Spacer>
            <TextFieldHelperMessage
                message={ nameError }
                messageType="error"
            />
            <Spacer size="md">
                <AuthInput
                    mode="outlined"
                    label="Username"
                    placeholder="Username"
                    value={ username }
                    error={ usernameError }
                    onChangeText={ ( changedUsername ) => inputActionHandler( 'username', changedUsername ) }
                    onFocus={ () => inputActionHandler( 'usernameError', undefined ) }
                    onBlur={ () => inputActionHandler( 'usernameError', composedValidators( required, minLength( 7 ) )( username ) ) }
                />
            </Spacer>
            <TextFieldHelperMessage
                message={ usernameError }
                messageType="error"
            />
            <Spacer size="md">
                <AuthInput
                    mode="outlined"
                    label="Email"
                    placeholder="Enter email"
                    value={ email }
                    error={ emailError }
                    onChangeText={ ( changedEmail ) => inputActionHandler( 'email', changedEmail ) }
                    onFocus={ () => inputActionHandler( 'emailError', undefined ) }
                    onBlur={ () => inputActionHandler( 'emailError', composedValidators( required, isEmailValid, minLength( 3 ) )( email ) ) }
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
                    onChangeText={ ( changedPassword ) => inputActionHandler( 'password', changedPassword ) }
                    onFocus={ () => inputActionHandler( 'passwordError', undefined ) }
                    onBlur={ () => handleConfirmPassword( 'passwordError', composedValidators( required, safeVarChars, minLength( 7 ), maxLength( 255 ) )( password ) ) }
                    secureTextEntry={ securePassword }
                    right={ (
                        <TextInput.Icon
                            name={ securePassword ? 'eye-off' : 'eye' }
                            onPress={ () => dispatch( {
                                type: 'securePassword',
                                payload: !securePassword,
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
                <AuthInput
                    mode="outlined"
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    value={ confirmPassword }
                    error={ confirmPasswordError }
                    onChangeText={ ( changedPassword ) => inputActionHandler( 'confirmPassword', changedPassword ) }
                    onFocus={ () => inputActionHandler( 'confirmPasswordError', undefined ) }
                    onBlur={ () => handleConfirmPassword( 'confirmPasswordError', composedValidators( required, safeVarChars, minLength( 7 ), maxLength( 255 ) )( confirmPassword ) ) }
                    secureTextEntry={ securePasswordConfirm }
                    right={ (
                        <TextInput.Icon
                            name={ securePasswordConfirm ? 'eye-off' : 'eye' }
                            onPress={ () => dispatch( {
                                type: 'securePasswordConfirm',
                                payload: !securePasswordConfirm,
                            } ) }
                            forceTextInputFocus={ false }
                        />
                    ) }
                />
            </Spacer>
            <TextFieldHelperMessage
                message={ confirmPasswordError }
                messageType="error"
            />
            <Spacer size="md">
                <TextFieldHelperMessage
                    message={ registrationError }
                    messageType="error"
                />
            </Spacer>
            <Spacer size="md">
                <AuthButton
                    loading={ isRegistrationLoading }
                    disabled={ isSubmitDisabled || isRegistrationLoading }
                    icon="email"
                    mode="contained"
                    onPress={ () => onRegister( {
                        name,
                        username,
                        email,
                        password,
                        confirmPassword,
                    } ) }
                >
                    Register
                </AuthButton>
            </Spacer>
        </ScreenWrapperStyled>
    );
};
