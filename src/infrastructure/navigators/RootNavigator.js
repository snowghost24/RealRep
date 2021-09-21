import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import About from '../../../routes/screens/About';
import { View, Text} from 'react-native';
import ExampleList from "../../ExampleList";
import { examples } from "../../ExampleList";
import { APP_NAME } from "../../utils/constants";
import DrawerNavigator from "./DrawerNavigator";
// import ExampleList, { examples } from './Examples';

const Stack = createStackNavigator();
function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

export default function Root() {
  return (
    <DrawerNavigator>
      <Stack.Screen
        name="Home"
        component={ExampleList}
        // options={{ title: APP_NAME }}
      />

       {Object.keys(examples).map((id) => (
         <Stack.Screen
           key={id}
           name={id}
           component={examples[id]}
           options={{ title: examples[id].title }}
         />
      ))}
    </DrawerNavigator>
  );
}
