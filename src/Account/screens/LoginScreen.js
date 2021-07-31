import React, { useState, useContext } from 'react';
import { ActivityIndicator, Colors } from 'react-native-paper';

import {
    AccountBackground,
    // AccountCover,
    AccountContainer,
    AuthButton,
    AuthInput,
    // Title,
    // ErrorContainer,
} from '../components/Account.styles';
import { Spacer } from '../components/Spacer/Spacer';
import { CustomText as Text } from '../../components/CustomText/CustomText';

import { AuthenticationContext } from '../../services/AuthenticationContext';

 const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { onLogin, isLoading, error } = useContext(AuthenticationContext);

    return (
        <AccountBackground>
        <AccountContainer>
        <AuthInput
            label="E-mail"
            value={email}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
        />
        </AccountContainer>
        <AuthButton mode="contained" onPress={() => navigation.goBack()}>
            Back
        </AuthButton>
        </AccountBackground>
    );
};

 export default  LoginScreen
