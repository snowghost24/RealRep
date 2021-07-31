import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AccountScreen } from './Account/screens/AccountScreen';
import  LoginScreen  from './Account/screens/LoginScreen';
 import { RegisterScreen } from './Account/screens/RegisterScreen';

const Stack = createStackNavigator();

export const AccountNavigator = () => (
    <Stack.Navigator headerMode="none">
        <Stack.Screen name="Main" component={AccountScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
);
