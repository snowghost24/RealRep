import * as React from 'react';
import { I18nManager, Platform , StyleSheet, View, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Updates } from 'expo';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import { PreferencesContext } from "../../services/PreferencesContext";
import DrawerItems from '../../screens/features/DrawerItems';
import { AuthenticationContext } from "../../services/AuthenticationContext";
import { AccountNavigator } from "./AccountNavigator";
import {NavigationContainer} from "@react-navigation/native";
import HomeTabsNavigator from "./HomeTabsNavigator";
import HomeScreen2 from "../../screens/HomeScreen2";
import DrawerContentFeature from "../../screens/features/DrawerContentFeature";
import { PERSISTENCE_KEY } from "../../utils/constants";


const Drawer = createDrawerNavigator();


function HomeScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
        </View>
    );
}

function PaperExample({initialState, theme }) {
  const { isAuthenticated } = React.useContext(AuthenticationContext);

  return (
      <NavigationContainer
          theme={theme}
          initialState={initialState}
          onStateChange={(state) => AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))}
      >
            { isAuthenticated ? ( <React.Fragment>
              { Platform.OS === 'web' ? (
                  <HomeScreen />
              ) : (
                  <Drawer.Navigator drawerContent={(props) => <DrawerContentFeature {...props} />}>
                      <Drawer.Screen name="Home" component={HomeTabsNavigator} />
                      <Drawer.Screen name="Home2" component={HomeScreen2} />
                  </Drawer.Navigator>
              ) }
              <StatusBar style="light" />
            </React.Fragment> ) : <AccountNavigator /> }
      </NavigationContainer>
  );
}

export default PaperExample;
