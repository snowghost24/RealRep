import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import {
    List, Button, Text, Paragraph, Divider,
} from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import ProfileScreen from '../../screens/ProfileScreen';
import MainPageHeader from '../../components/Headers/MainPageHeader';
import FeedScreen from '../../screens/FeedScreen';
import NewsTopNavigator from './NewsTopNavigator';
import CommentsListBanner from '../../components/Banners/CommentsListBanner';
import AxiosInstance from '../../utils/axiosInstance';
import CommentScreen from '../../screens/CommentScreen';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function Tackle( { navigation } ) {
    return (
        <View style={ { flex: 1, alignItems: 'center', justifyContent: 'center' } }>
            <Text>Actions Screen</Text>
            <Button
                title="Message Screen can go to profile"
                onPress={ () => navigation.navigate( 'Home2' ) }
            />
        </View>
    );
}

function Messages( { navigation } ) {
    return (
        <View style={ { flex: 1, alignItems: 'center', justifyContent: 'center' } }>
            <Text>Messages Screen</Text>
            <Button
                title="Go to Actions"
                onPress={ () => navigation.push( 'Actions' ) }
            />
        </View>
    );
}

function News( { navigation } ) {
    return (
        <View style={ { flex: 1, alignItems: 'center', justifyContent: 'center' } }>
            <Text>News Screen</Text>
            <Button
                title="Go to Messages"
                onPress={ () => navigation.navigate( 'Feed' ) }
            />
        </View>
    );
}

function FeedStack( props ) {
    return (
        <Stack.Navigator
            screenOptions={ {
                headerMode: 'screen',
                header: ( props ) => <MainPageHeader { ...props } />,
            } }
        >
            <Stack.Screen name="NewsDetails" component={ News } />
            {/* <Stack.Screen name="Actions" component={Actions} /> */}
            {/* <Stack.Screen name="Settings" component={Settings} /> */}
        </Stack.Navigator>
    );
}

function NewsStack( props ) {
    return (
        <Stack.Navigator
            screenOptions={ {
                headerMode: 'screen',
                header: ( props ) => <MainPageHeader { ...props } />,
            } }
        >
            <Stack.Screen name="News" component={ NewsTopNavigator } />
            <Stack.Screen name="Tackle" component={ Tackle } />
            <Stack.Screen name="Comment" component={ CommentScreen } />
            {/* <Stack.Screen name="Settings" component={Settings} /> */}
        </Stack.Navigator>
    );
}

const NewHome = () => (
    <Tab.Navigator
        // headerMode="screen"
        initialRouteName="News"
    >
        <Tab.Screen
            name="NewsStack"
            component={ NewsStack }
            options={ {
                tabBarIcon: 'note-text',
                headerShown: false,
                tabBarLabel: 'News',
            } }
        />
        <Tab.Screen
            name="Feed"
            component={ FeedStack }
            options={ {
                tabBarIcon: 'note-text',
                headerShown: false,
            } }
        />

    </Tab.Navigator>
);

NewHome.title = 'List.Section';

const styles = StyleSheet.create( {
    container: {
        flex: 1,
    },
    image: {
        height: 30,
        width: 30,
        margin: 8,
    },
    row: {
        flexDirection: 'row',
    },
    column: {
        flexDirection: 'column',
    },
} );

export default NewHome;
