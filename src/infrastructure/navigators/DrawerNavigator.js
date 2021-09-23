import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainPageHeader from "../../components/Headers/MainPageHeader";

const Stack = createStackNavigator();

export default function DrawerNavigator({children}) {
    return (
        <Stack.Navigator
            headerMode="screen"
            screenOptions={{
                headerMode:"screen",
                // header: (props) => <MainPageHeader {...props}/>,
            }}
        >
            {children}
        </Stack.Navigator>
    );
}
