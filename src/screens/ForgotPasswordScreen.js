import React, { useContext } from 'react';
import {
    ActivityIndicator,
    Colors,
    Title,
    Subheading,
} from 'react-native-paper';

import {
    AuthButton,
    ScreenWrapperStyled,
    AuthInput,
} from '../Account/components/Account.styles';
import { Spacer } from '../components/Spacer/Spacer';
import { AuthenticationContext } from '../services/AuthenticationContext';
import { inputReducer } from '../utils';
import { validationRules } from '../utils/helperFunctions';

// const TextInputAvoidingView = ({ children }) => {
//     return Platform.OS === 'ios' ? (
//         <KeyboardAvoidingView
//             style={styles.wrapper}
//             behavior="padding"
//             keyboardVerticalOffset={80}
//         >
//             {children}
//         </KeyboardAvoidingView>
//     ) : (
//         <>{children}</>
//     );
// };

// const styles = StyleSheet.create( {
//     container: {
//         // padding: 8,
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     helpersWrapper: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//     },
//     wrapper: {
//         flex: 1,
//     },
//     helper: {
//         marginTop: 0,
//         marginBottom: 0,
//         paddingVertical: 0,
//         marginVertical: 0,
//     },
//     counterHelper: {
//         textAlign: 'right',
//     },
//     authInput: {
//         width: 300,
//     },
// } );

const initialState = {
    email: 'jguzman24680@gmail.com',
    emailError: undefined,
};

export const ForgotPasswordScreen = ( { navigation } ) => {
    const { onForgotPassword, isLoading, error } = useContext( AuthenticationContext );
    const [ state, dispatch ] = React.useReducer( inputReducer, initialState );

    const {
        email,
        emailError,
    } = state;

    const {
        safeVarChars,
        isEmailValid,
        maxLength,
        minLength,
        required,
        composedValidators,
    } = validationRules;

    const inputActionHandler = ( type, payload ) => dispatch( {
        type: type,
        payload: payload,
    } );

    return (
        // <TextInputAvoidingView>
        <ScreenWrapperStyled>
            <Spacer position="bottom" size="md">
                <Title style={ { textAlign: 'center' } }>
                    Reset Password
                </Title>
            </Spacer>
            <Subheading>
                Enter your email below and hit reset password. A link will be sent that will redirect you to a reset password page
            </Subheading>
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
            <Spacer size="md">
                {!isLoading ? (
                    <AuthButton
                        icon="email"
                        mode="contained"
                        onPress={ () => onForgotPassword( { email } ) }
                    >
                        Reset Password
                    </AuthButton>
                ) : (
                    <ActivityIndicator animating color={ Colors.blue300 } />
                )}
            </Spacer>
        </ScreenWrapperStyled>
        // </TextInputAvoidingView>

    );
};

// export default  ForgotPasswordScreen

// Login.title = 'TextInput';
//
