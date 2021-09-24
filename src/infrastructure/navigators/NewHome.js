import React from 'react';
import {Button, Text, View} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from "../../screens/ProfileScreen";
import {createStackNavigator} from "@react-navigation/stack";
import MainPageHeader from "../../components/Headers/MainPageHeader";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FeedScreen from "../../screens/FeedScreen";
import FeedTopNavigator from "./FeedTopNavigator";
import CommentsListBanner from "../../components/Banners/CommentsListBanner";


const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function Tackle({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Actions Screen</Text>
            <Button
                title="Message Screen can go to profile"
                onPress={() =>
                    navigation.navigate('Home2')
                }
            />
        </View>
    );
}

function Comment(props) {
    return (
        <View>
            <CommentsListBanner {...props}/>
            <Text>Actions Screen</Text>
            <Button
                title="Message Screen can go to profile"
                onPress={() =>
                   props.navigation.navigate('Home2')
                }
            />
        </View>
    );
}




function Messages({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Messages Screen</Text>
            <Button
                title="Go to Actions"
                onPress={() =>
                    navigation.push('Actions')
                }
            />
        </View>
    );
}

function News({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>News Screen</Text>
            <Button
                title="Go to Messages"
                onPress={() =>
                    navigation.navigate('Feed')
                }
            />
        </View>
    );
}

function FeedStack(props) {
    return (
        <Stack.Navigator
            screenOptions={{
                headerMode:"screen",
                header: (props) => <MainPageHeader {...props}/>,
            }}
        >
            <Stack.Screen name="NewsDetails" component={News}/>
            {/*<Stack.Screen name="Actions" component={Actions} />*/}
            {/*<Stack.Screen name="Settings" component={Settings} />*/}
        </Stack.Navigator>
    );
}

function NewsStack(props) {
    return (
        <Stack.Navigator
            screenOptions={{
                headerMode:"screen",
                header: (props) => <MainPageHeader {...props}/>,
            }}
        >
            <Stack.Screen name="News" component={FeedTopNavigator}/>
            <Stack.Screen name="Tackle" component={Tackle} />
            <Stack.Screen name="Comment" component={Comment} />
            {/*<Stack.Screen name="Settings" component={Settings} />*/}
        </Stack.Navigator>
    );
}


const NewHome = () => {
    return (
        <Tab.Navigator
            // headerMode="screen"
            initialRouteName="News"
        >
            <Tab.Screen
                name="NewsStack"
                component={NewsStack}
                options={{
                    tabBarIcon:'note-text',
                    headerShown: false,
                    tabBarLabel:"News"
                }}
            />
            <Tab.Screen
                name="Feed"
                component={FeedStack}
                options={{
                    tabBarIcon:'note-text',
                    headerShown: false,
                }}
            />

        </Tab.Navigator>
    );
};

export default NewHome;

