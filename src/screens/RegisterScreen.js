import React, { useState, useContext } from 'react';
import { ActivityIndicator, Colors, Button } from 'react-native-paper';
import {KeyboardAvoidingView, Platform, View} from "react-native";
import {
    AccountBackground,
    AccountCover,
    ScreenWrapperStyled,
    AccountContainer,
    AuthButton,
    AuthInput,
    GoogleAuthButton,
    FacebookAuthButton,
    Title,
    TextInputAvoidingView,
    ErrorContainer,
} from '../Account/components/Account.styles';
import { Spacer } from '../components/Spacer/Spacer';
import { CustomText as Text } from '../components/CustomText/CustomText';

import { AuthenticationContext } from '../services/AuthenticationContext';

export const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const { onRegister, isLoading, error } = useContext(AuthenticationContext);

    return (
        <ScreenWrapperStyled>
            <View>
            <GoogleAuthButton
                onPress={()=> null}
                icon="google"
                mode="outlined"
                // mode={'outlined'}
            >Sign in with Google</GoogleAuthButton>
            </View>
            <Spacer size="md">
            <FacebookAuthButton mode={'outlined'}>Sign in with Facebook</FacebookAuthButton>
            </Spacer>
            <Spacer size="md">
            <View style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                <Title variant="caption">OR</Title>
            </View>
            </Spacer>
                <Spacer size="md">
                <AuthInput
                    label="E-mail"
                    value={email}
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={(userEmail) => setEmail(userEmail)}
                />
                </Spacer>
                <Spacer size="md">
                    <AuthInput
                        label="Password"
                        value={password}
                        textContentType="password"
                        secureTextEntry
                        autoCapitalize="none"
                        onChangeText={(userPass) => setPassword(userPass)}
                    />
                </Spacer>
                <Spacer size="md">
                    <AuthInput
                        label="Repeat Password"
                        value={repeatedPassword}
                        textContentType="password"
                        secureTextEntry
                        autoCapitalize="none"
                        onChangeText={(userPass) => setRepeatedPassword(userPass)}
                    />
                </Spacer>
                {error && (
                    <ErrorContainer size="md">
                        <Text variant="error">{error}</Text>
                    </ErrorContainer>
                )}
                <Spacer size="md">
                    {!isLoading ? (
                        <AuthButton
                            icon="email"
                            mode="contained"
                            onPress={() => onRegister(email, password, repeatedPassword)}
                        >
                            Register
                        </AuthButton>
                    ) : (
                        <ActivityIndicator animating={true} color={Colors.blue300} />
                    )}
                </Spacer>
        </ScreenWrapperStyled>
    );
};
