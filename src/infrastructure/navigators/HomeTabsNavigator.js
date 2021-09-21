import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import RootNavigator from "./RootNavigator";
import * as React from "react";
import ProfileNavigator from "./ProfileNavigator";
import SettingsScreen from "../../screens/SettingsScreen";

const Tab = createBottomTabNavigator();


export default function HomeTabsNavigator (){
    return (
        <Tab.Navigator>
            <Tab.Screen name="Root" component={RootNavigator} />
            <Tab.Screen name="Profile" component={ProfileNavigator} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    )
}
