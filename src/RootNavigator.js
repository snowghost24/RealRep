import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import About from '../routes/screens/About';
import { View, Text} from 'react-native';
import Login from './Login';
import ExampleList from "./ExampleList";
import { examples } from "./ExampleList";
import { APP_NAME } from "./utils/constants";
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
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        header: ({ navigation, scene, previous }) => (
          <Appbar.Header>
            {previous ? (
              <Appbar.BackAction onPress={() => navigation.goBack()} />
            ) : navigation.openDrawer ? (
              <Appbar.Action
                icon="menu"
                onPress={() =>
                  navigation.openDrawer()
                }
              />
            ) : null}
            <Appbar.Content title={scene.descriptor.options.title} />
          </Appbar.Header>
        ),
      }}
    >

        {/*<Stack.Screen*/}
        {/*    name="Home"*/}
        {/*    component={Login}*/}
        {/*    options={{ title: 'Real Rep' }}*/}
        {/*/>*/}
      <Stack.Screen
        name="Home"
        component={ExampleList}
        options={{ title: APP_NAME }}
      />

       {Object.keys(examples).map((id) => (
         <Stack.Screen
           key={id}
           name={id}
           component={examples[id]}
           options={{ title: examples[id].title }}
         />
      ))
    }
    </Stack.Navigator>
  );
}
