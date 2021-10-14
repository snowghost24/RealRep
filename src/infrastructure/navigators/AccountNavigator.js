import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AccountScreen } from '../../screens/AccountScreen';
import LoginScreen from '../../screens/LoginScreen';
import { RegisterScreen } from '../../screens/RegisterScreen';
import { ForgotPasswordScreen } from '../../screens/ForgotPasswordScreen';
import MainPageHeader from '../../components/Headers/MainPageHeader';
import TestScreen from '../../screens/TestScreen';

const Stack = createStackNavigator();

export const AccountNavigator = () => (
    <Stack.Navigator
        screenOptions={ {
            headerMode: 'screen',
            header: ( props ) => <MainPageHeader { ...props } />,
        } }
    >
        {/* <Stack.Screen name="TestScreen" component={ TestScreen } /> */}
        <Stack.Screen name="Main" component={ AccountScreen } />
        <Stack.Screen name="Login" component={ LoginScreen } />
        <Stack.Screen name="Register" component={ RegisterScreen } />
        <Stack.Screen name="ForgotPassword" component={ ForgotPasswordScreen } />
    </Stack.Navigator>
);
