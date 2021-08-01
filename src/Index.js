import * as React from 'react';
import { I18nManager, Platform , StyleSheet, View, Text} from 'react-native';
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


  return (
      <React.Fragment>
            { isAuthenticated ? ( <React.Fragment>
              { Platform.OS === 'web' ? (
                  <HomeScreen />
              ) : (
                  <Drawer.Navigator drawerContent={() => <DrawerContent />}>
                    <Drawer.Screen name="Home" component={RootNavigator} />
                  </Drawer.Navigator>
              ) }
              <StatusBar style="light" />
            </React.Fragment> ) : <AccountNavigator /> }
        </React.Fragment>
  );
}

export default PaperExample;
