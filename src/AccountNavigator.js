import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AccountScreen } from './Account/screens/AccountScreen';
import  LoginScreen  from './Account/screens/LoginScreen';
 import { RegisterScreen } from './Account/screens/RegisterScreen';
import {Appbar, useTheme} from "react-native-paper";

const Stack = createStackNavigator();

export const AccountNavigator = () => {
    const { colors } = useTheme();
    console.log("colors",colors);
    return (
    <Stack.Navigator
        // headerMode="screen"
        screenOptions={{
            header: ({ navigation, scene, previous }) => (
                <Appbar.Header>
                    {previous && (
                        <Appbar.BackAction onPress={() => navigation.goBack()} />
                    )}
                </Appbar.Header>
            ),
        }}>
        <Stack.Screen
            name="Main"
            component={AccountScreen}

        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
)};
