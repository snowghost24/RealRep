import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FeedScreen from "../../screens/FeedScreen";
import SettingsScreen from "../../screens/SettingsScreen";

const Tab = createMaterialTopTabNavigator();

const FeedTopNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="FeedScreen"
                component={FeedScreen}
                options={{
                    tabBarLabel: "US News"
                }}
            />
            <Tab.Screen
                name="LocalNews"
                component={SettingsScreen}
                options={{
                    tabBarLabel: "Local News"
                }}
            />
            <Tab.Screen
                name="Federal"
                component={SettingsScreen}
                options={{
                    tabBarLabel: "World News"
                }}

            />
        </Tab.Navigator>
    );
};

export default FeedTopNavigator;
