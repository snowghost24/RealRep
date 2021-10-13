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

function Comment( props ) {
    const [ commentsList, setCommentsList ] = useState( [] );

    const getComments = () => {
        AxiosInstance.get( '/news_articles/1/comments' ).then( ( response ) => {
            // console.log( 'my response', response.data );
            // setCommentsList(response.data);
            // return AsyncStorage.setItem(BEARER_TOKEN, response.data.token).then(()=>{
            //     return response
            // });
        } ).catch( ( e ) => { console.log( 'an error occurred', e ); } );
    };

    const postComment = () => {
        console.log( 'attempting to post' );
        AxiosInstance.post( '/news_articles/1/comment', { comment: 'hello world we made it' } ).then( ( response ) => {
            // console.log( 'to a post', response );
            // setCommentsList(response.data);
            // return AsyncStorage.setItem(BEARER_TOKEN, response.data.token).then(()=>{
            //     return response
            // });
        } ).catch( ( e ) => { console.log( 'an error occurred', e ); } );
    };

    const replyToComment = () => {
        // console.log( 'attempting to post' );
        AxiosInstance.post( '/comments/1', {
            commentable_type: 1,
            commentable_id: 1,
            message: 'did it work now',

        } ).then( ( response ) => {
            // console.log( 'replaying to post', response );
            // setCommentsList(response.data);
            // return AsyncStorage.setItem(BEARER_TOKEN, response.data.token).then(()=>{
            //     return response
            // });
        } ).catch( ( e ) => { console.log( 'an error occurred', e ); } );
    };

    useEffect( () => {
        getComments();
    }, [] );

    const SingleReplyComment = ( ) => (
        <>
            <List.Item
                left={ () => (
                    <Image
                        source={ require( '../../../assets/images/email-icon.png' ) }
                        style={ styles.image }
                    />
                ) }
                right={ ( props ) => <List.Icon { ...props } icon="heart-outline" /> }
                title={ (
                    <Text numberOfLines={ 6 }>
                        <Text style={ { fontWeight: 'bold' } }>Snowghost24</Text><Paragraph> is a high-quality, standard-compliant
                            Material Design library that has you covered in all major
                            use-cases
                                                                                 </Paragraph>
                    </Text>
                ) }
                titleNumberOfLines={ 6 }
                description={ ( {
                    ellipsizeMode,
                    color: descriptionColor,
                    fontSize,
                } ) => (
                    <View>
                        <Text numberOfLines={ 1 }>
                            <Text>2h</Text>    <Text>124 Likes</Text> <Text style={ { marginLeft: 8 } }>  Reply</Text>
                        </Text>

                    </View>
                ) }
            />
        </>

    );

    const SingleReplyContainer = ( ) =>
        // console.log( 'af' );
        (
            <>
                <List.Item
                    style={ { marginTop: 0, paddingTop: 0 } }
                    left={ () => <Text style={ { height: 0 } }>hello</Text> }
                    title="  --View Replies"
                    description={ () => (
                        <>
                            <SingleReplyComment />
                            <SingleReplyComment />
                        </>
                    ) }
                />
            </>

        );
    const SingleComment = ( ) =>
        // console.log( 'af' );
        (
            <>
                <List.Item
                    left={ () => (
                        <Image
                            source={ require( '../../../assets/images/email-icon.png' ) }
                            style={ styles.image }
                        />
                    ) }
                    right={ ( props ) => <List.Icon { ...props } icon="heart-outline" /> }
                    title={ (
                        <Text numberOfLines={ 6 }>
                            <Text style={ { fontWeight: 'bold' } }>Snowghost24</Text><Paragraph> is a high-quality, standard-compliant
                                Material Design library that has you covered in all major
                                use-cases
                                                                                     </Paragraph>
                        </Text>
                    ) }
                    titleNumberOfLines={ 6 }
                    description={ ( {
                        ellipsizeMode,
                        color: descriptionColor,
                        fontSize,
                    } ) => (
                        <View>
                            <Text numberOfLines={ 1 }>
                                <Text>2h</Text>    <Text>124 Likes</Text> <Text style={ { marginLeft: 8 } }>  Reply</Text>
                            </Text>

                        </View>
                    ) }
                />
                <SingleReplyContainer />
                <Divider />
            </>

        );
    return (
        <View>
            <CommentsListBanner { ...props } />
            <List.Section>
                <SingleComment />
                <SingleComment />
                <SingleComment />
                <SingleComment />
            </List.Section>
            {/* <Text>Comment Screen</Text> */}
            <Button
                title="Post a comment"
                onPress={ postComment }
            />
            <Button
                title="Reply to comment"
                onPress={ replyToComment }
            />
            <Button
                title="Message Screen can go to profile"
                onPress={ () => props.navigation.navigate( 'Home2' ) }
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
            <Stack.Screen name="Comment" component={ Comment } />
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
