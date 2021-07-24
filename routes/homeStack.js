import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './screens/Home';
import About from './screens/About';
import Review  from './screens/Review';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function StackNav() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Review" component={Review} />
        <Stack.Screen name="About" component={About} />
      </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <StackNav />
      {/* <Drawer.Navigator drawerContent={() => <DrawerContent />}>
                  <Drawer.Screen name="Home" component={App} />
                </Drawer.Navigator> */}
    </NavigationContainer>
  );
}

export default App;