import React from 'react';
import {
    AuthButton,
    ScreenWrapperStyled,
} from '../Account/components/Account.styles';
import { StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';
import { Spacer } from '../components/Spacer/Spacer';
import {APP_NAME} from "../utils/constants";

export const AccountScreen = ({ navigation }) => {
    return (
        <ScreenWrapperStyled>
            <View style={[styles.container, {
                flexDirection: "column"
            }]}>
                <View style={styles.level_one}>
                    <Title>{APP_NAME}</Title>
                </View>
                <View style={styles.level_two}>
                    <AuthButton
                        icon="lock-open-outline"
                        mode="contained"
                        onPress={() => navigation.navigate('Login')}
                    >
                        Log in
                    </AuthButton>
                    <Spacer size="lg">
                        <AuthButton
                            icon="email"
                            onPress={() => navigation.navigate('Register')}
                        >
                            Register
                        </AuthButton>
                    </Spacer>
                </View>
            </View>
        </ScreenWrapperStyled>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    level_one:{
        alignItems:'center',
        justifyContent:'flex-end',
        flex: 1
    },
    level_two:{
        justifyContent:'flex-end',
        flex: 1,
    }
});
