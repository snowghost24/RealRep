import DrawerNavigator from "./DrawerNavigator";
import ProfileScreen from "../../screens/ProfileScreen";
import * as React from "react";
import {createStackNavigator} from "@react-navigation/stack";
const ProfileStack = createStackNavigator();

function ProfileNavigator() {
    return(
        <DrawerNavigator>
            <ProfileStack.Screen
                name="Home"
                component={ProfileScreen}

            />
        </DrawerNavigator>
    )

}

export default  ProfileNavigator
