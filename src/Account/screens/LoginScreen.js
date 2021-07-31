import React, { useState, useContext } from 'react';
import { ActivityIndicator, Colors } from 'react-native-paper';

import {
    // AccountBackground,
    // AccountCover,
    // AccountContainer,
    AuthButton,
    // AuthInput,
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
        <AuthButton mode="contained" onPress={() => navigation.goBack()}>
            Back
        </AuthButton>
    );
};

 export default  LoginScreen
