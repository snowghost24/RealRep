import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SettingsScreen from '../../screens/SettingsScreen';
import UsNewsScreen from '../../screens/UsNewsScreen';

const Tab = createMaterialTopTabNavigator();

const NewsTopNavigator = () => (
    <Tab.Navigator>
        <Tab.Screen
            name="usNewsScreen"
            component={ UsNewsScreen }
            options={ {
                tabBarLabel: 'US News',
            } }
        />
        <Tab.Screen
            name="localNewsScreen"
            component={ SettingsScreen }
            options={ {
                tabBarLabel: 'Local News',
            } }
        />
        <Tab.Screen
            name="worldNewsScreen"
            component={ SettingsScreen }
            options={ {
                tabBarLabel: 'World News',
            } }
        />
    </Tab.Navigator>
);

export default NewsTopNavigator;
