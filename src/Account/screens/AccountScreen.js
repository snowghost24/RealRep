import React from 'react';
// import LottieView from 'lottie-react-native';

import {
    AccountBackground,
    AccountCover,
    AccountContainer,
    AuthButton,
} from '../components/Account.styles';
import { Title } from 'react-native-paper';
import { Spacer } from '../components/Spacer/Spacer';
import ScreenWrapper from "../../ScreenWrapper";
// import { LottieAnimationWrapper } from '../../../components/LottieAnimationWrapper/LottieAnimationWrapper';

export const AccountScreen = ({ navigation }) => {
    return (
        <AccountBackground>
            {/*<AccountCover />*/}
            <Title>Real Rep</Title>
            <AccountContainer>
                <AuthButton
                    icon="lock-open-outline"
                    mode="contained"
                    onPress={() => navigation.navigate('Login')}
                >
                    Login
                </AuthButton>
                <Spacer size="large">
                <AuthButton
                    icon="email"
                    mode="contained"
                    onPress={() => navigation.navigate('Register')}
                >
                    Register
                </AuthButton>
                </Spacer>
            </AccountContainer>
        </AccountBackground>
    );
};
