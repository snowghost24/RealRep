import * as React from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthenticationContext } from '../../services/AuthenticationContext';
import { AccountNavigator } from './AccountNavigator';
import HomeTabsNavigator from './HomeTabsNavigator';
import HomeScreen2 from '../../screens/HomeScreen2';
import DrawerContentFeature from '../../screens/features/DrawerContentFeature';
import { PERSISTENCE_KEY } from '../../utils/constants';
import WebScreen from '../../screens/WebScreen';
import NewHome from './NewHome';
import ProfileScreen from '../../screens/ProfileScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function NewHomeNavigation( props ) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                initialRouteName="feed"
                name="NewHome"
                component={ NewHome }
                options={ {
                    headerShown: false,
                } }
            />
            <Stack.Screen name="Profile" component={ ProfileScreen } />
            {/* <Stack.Screen name="Settings" component={Settings} /> */}
        </Stack.Navigator>
    );
}

function AppNavContainer( { initialState, theme } ) {
    const { isAuthenticated, onLogout } = React.useContext( AuthenticationContext );
    return (
        <NavigationContainer
            theme={ theme }
            initialState={ initialState }
            onStateChange={ ( state ) => AsyncStorage.setItem( PERSISTENCE_KEY, JSON.stringify( state ) ) }
        >
            { isAuthenticated ? (
                <>
                    { Platform.OS === 'web' ? (
                        <WebScreen />
                    ) : (

                    // <HomeTabsNavigator />
                        <Drawer.Navigator
                            drawerContent={ ( props ) => (
                                <DrawerContentFeature
                                    onLogout={ onLogout }
                                    { ...props }
                                />
                            ) }
                        >
                            <Drawer.Screen
                                name="NewHome"
                                component={ NewHome }
                                options={ { headerShown: false } }
                            />
                            <Drawer.Screen name="Home2" component={ HomeScreen2 } />
                        </Drawer.Navigator>
                    ) }
                    {/* TODO :change the style back to auto */}
                    <ExpoStatusBar style="light" />
                </>
            ) : <AccountNavigator /> }
        </NavigationContainer>
    );
}

export default AppNavContainer;
