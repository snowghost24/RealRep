import DrawerNavigator from "./DrawerNavigator";
import ProfileScreen from "../../screens/ProfileScreen";
import * as React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import SettingsScreen from "../../screens/SettingsScreen";
const ProfileStack = createStackNavigator();

function ProfileNavigator() {
    return(
        // <DrawerNavigator>
        <ProfileStack.Navigator
            initialRouteName="ProfileDetail"
        >

            <ProfileStack.Screen
                name="ProfileDetail"
                component={ProfileScreen}

            />
            <ProfileStack.Screen
                name="settings"
                component={SettingsScreen}

            />
        </ProfileStack.Navigator>
         // </DrawerNavigator>
    )

}

export default  ProfileNavigator
