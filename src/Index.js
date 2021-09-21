import * as React from 'react';
import { I18nManager, Platform , StyleSheet, View, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Updates } from 'expo';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import { PreferencesContext } from "./services/PreferencesContext";
import DrawerItems from '../routes/screens/DrawerItems';
import Header from './Header';
import RootNavigator from './RootNavigator';
import { AuthenticationContext } from "./services/AuthenticationContext";
import { AccountNavigator } from "./AccountNavigator";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator } from "@react-navigation/stack";
import DrawerNavigator from "./DrawerNavigator";
import ExampleList from "./ExampleList";
import {APP_NAME} from "./utils/constants";


const DrawerContent = (props) => {
  return (
   <PreferencesContext.Consumer>
   {(preferences) => (
        <DrawerItems
            {...props}
          toggleTheme={preferences.toggleTheme}
          toggleRTL={preferences.toggleRtl}
          isRTL={preferences.rtl}
          isDarkTheme={preferences.theme.dark}
        />

  )}
  </PreferencesContext.Consumer>)
};

const Drawer = createDrawerNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

function ProfileScreen({ navigation }) {
    return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Profile!</Text>
            <Button
                title="Go to Settings"
                onPress={() => navigation.navigate('Settings', {itemId : 123, otherParam: "Jose" })}
            />

        </View>

    );
}

function ProfileScreenNavigator() {
    return(
        <DrawerNavigator>
        <Stack.Screen
            name="Home"
            component={ProfileScreen}

        />
        </DrawerNavigator>
    )

}

function SettingsScreen({ navigation, route }) {
    const { itemId, otherParam } = route.params
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
            <Text>itemId: {JSON.stringify(itemId)}</Text>
            <Text>otherParam: {JSON.stringify(otherParam)}</Text>
            <Button
                title="Go back to Details"
                onPress={() => navigation.navigate('Profile')}
            />
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}

const Tab = createBottomTabNavigator();

function TabNavs (){
    return (
        <Tab.Navigator>
            <Tab.Screen name="Root" component={RootNavigator} />
            <Tab.Screen name="Profile" component={ProfileScreenNavigator} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    )
}

function StackNavs (){
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name='Profile' component={ProfileScreen}   options={{
                title: 'My home',
                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}/>
            <AuthStack.Screen name='Settings' component={SettingsScreen}/>
        </AuthStack.Navigator>
    )
}


const AuthStack = createStackNavigator();


function SettingsScreen2({ route, navigation }) {
    const { user } = route.params;
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Settings Screen</Text>
            <Text>userParam: {JSON.stringify(user)}</Text>
            <Button
                title="Go to Profile"
                onPress={() => navigation.navigate('Profile')}
            />
        </View>
    );
}

function ProfileScreen2({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Profile Screen</Text>
            <Button
                title="Go to Settings"
                onPress={() => navigation.navigate('Settings', {itemId : 123, otherParam: "Jose" })}
            />

        </View>
    );
}

function HomeScreen2({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Settings"
                onPress={() =>
                    navigation.navigate('Root', {
                        screen: 'Settings',
                        params: { user: 'jane' },
                    })
                }
            />
        </View>
    );
}


const Stack = createStackNavigator();

function Root() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileScreen2} />
            <Stack.Screen name="Settings" component={SettingsScreen2} />
        </Stack.Navigator>
    );
}

function DrawerNavs(){
    return(
        <Drawer.Navigator
            initialRouteName="Root"
            screenOptions={{ headerShown: false }}
        >
            <Drawer.Screen name="Root" component={Root} />
            <Drawer.Screen name="Home" component={HomeScreen} />
        </Drawer.Navigator>
    )
}

function PaperExample() {
  const { isAuthenticated } = React.useContext(AuthenticationContext);
console.log("im here")

  return (
      <React.Fragment>
            { isAuthenticated ? ( <React.Fragment>
              { Platform.OS === 'web' ? (
                  <View>
                      <Text>
                          hello
                      </Text>
                  </View>
              ) : (
                  // <DrawerNavs />
                  // <StackNavs />
                  // <TabNavs />
                  <Drawer.Navigator
                      drawerContent={(props) => <DrawerContent {...props} />}

                  >
                      <Drawer.Screen name="Home" component={TabNavs} />
                      <Drawer.Screen name="Home2" component={HomeScreen2} />
                  </Drawer.Navigator>
              ) }
              <StatusBar style="light" />
            </React.Fragment> ) : <AccountNavigator /> }
        </React.Fragment>
  );
}

export default PaperExample;
