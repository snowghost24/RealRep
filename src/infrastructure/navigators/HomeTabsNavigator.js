// import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import RootNavigator from "./RootNavigator";
import * as React from "react";
import ProfileNavigator from "./ProfileNavigator";
import SettingsScreen from "../../screens/SettingsScreen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from "../../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function HomeTabsNavigator (){
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Root"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="bell" color={color} size={size} />
                    ),
                    // tabBarBadge: 3,
                }}
            />
            <Tab.Screen name="Profile" component={ProfileNavigator} />
            {/*<Tab.Screen name="Settings" component={SettingsScreen} />*/}
        </Tab.Navigator>
    )
}
