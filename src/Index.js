import * as React from 'react';
import { I18nManager, Platform , StyleSheet, View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Updates } from 'expo';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { PreferencesContext } from "./services/PreferencesContext";
import { theme } from "./infrastructure/theme";
import { InitialState, NavigationContainer } from '@react-navigation/native';

import {
  Provider as PaperProvider,
  DarkTheme,
  DefaultTheme,
} from 'react-native-paper';
import Navigator from '../routes/homeStack';
import DrawerItems from '../routes/screens/DrawerItems';
import Header from './Header';
import RootNavigator from './RootNavigator';
// import Drawer from './src/Drawer';
// import App from './RootNavigator';
import { useKeepAwake } from 'expo-keep-awake';
import { AuthenticationContext } from "./services/AuthenticationContext";
import { AccountNavigator } from "./AccountNavigator";
// import { InitialState, NavigationContainer } from '@react-navigation/native';



// press command D on the simulator to reload/debug and view menu


// const theme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     // primary: 'tomato',
//     // accent: 'yellow',
//   },
// };




const DrawerContent = () => {
  return (
   <PreferencesContext.Consumer>
   {(preferences) => (
        <DrawerItems
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


function PaperExample() {
  const { isAuthenticated } = React.useContext(AuthenticationContext);

  // const isAuthenticated = false;
  return (
      <React.Fragment>
            { isAuthenticated ? <AccountNavigator /> :( <React.Fragment>
              { Platform.OS === 'web' ? (
                  <HomeScreen />
              ) : (
                  <Drawer.Navigator drawerContent={() => <DrawerContent />}>
                    <Drawer.Screen name="Home" component={RootNavigator} />
                  </Drawer.Navigator>
              ) }
              <StatusBar style="light" />
            </React.Fragment>)}
        </React.Fragment>
  );
}

export default PaperExample;
