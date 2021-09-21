import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AccountScreen } from '../../screens/AccountScreen';
import  LoginScreen  from '../../screens/LoginScreen';
 import { RegisterScreen } from '../../screens/RegisterScreen';
 import { ForgotPasswordScreen } from "../../screens/ForgotPasswordScreen";

import {Appbar, useTheme} from "react-native-paper";

const Stack = createStackNavigator();

export const AccountNavigator = () => {
    const { colors } = useTheme();
    return (
    <Stack.Navigator
        headerMode="screen"
        screenOptions={{
            header: ({ navigation, scene, previous }) => (
                <Appbar.Header>
                    {previous && (
                        <Appbar.BackAction onPress={() => navigation.goBack()} />
                    )}
                </Appbar.Header>
            ),
        }}
    >
        <Stack.Screen name="Main" component={AccountScreen}/>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
)};