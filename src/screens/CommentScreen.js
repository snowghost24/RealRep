import React, { useEffect, useState } from 'react';
import {
    FlatList, Keyboard, TextInput, View, Text,
} from 'react-native';
import { Button, List } from 'react-native-paper';
import AxiosInstance from '../utils/axiosInstance';
import CommentsListBanner from '../components/Banners/CommentsListBanner';
import SimpleComment from '../components/Comment/SimpleComment';
import CommentInputField from '../components/Comment/CommentInputField';

const fakeComments = [ {
    commentId: 1,
    creator: 'SnowGhost24',
    when: '2h',
    likeTotal: 1304,
    message: 'This is a comment dont worrry about it owrking ont it',
    liked: true,
}, {
    commentId: 2,
    creator: 'Og1ginobiliy',
    when: '24m',
    likeTotal: 13,
    message: 'This is a second comment trying to fix the display before i go ahead and set up the back end',
    liked: true,
}, {
    commentId: 3,
    creator: 'jguzman246880',
    when: '4m',
    likeTotal: 14,
    message: 'This is a comment dont worrry about it owrking ont it- ok so what now',
    liked: true,
}, {
    commentId: 4,
    creator: 'yallcantguardme1',
    when: '24w',
    likeTotal: 34,
    message: 'This is a comment dont worrry about it owrking ont it - but yeah yall cant guad me',
    liked: true,
} ];

const CommentScreen = ( props ) => {
    // const _keyboardDidShow = () => {
    //     alert( 'Keyboard Shown' );
    // };
    //
    // const _keyboardDidHide = () => {
    //     alert( 'Keyboard Hidden' );
    // };

    // useEffect( () => {
    //     Keyboard.addListener( 'keyboardDidShow', _keyboardDidShow );
    //     Keyboard.addListener( 'keyboardDidHide', _keyboardDidHide );
    //
    //     // cleanup function
    //     return () => {
    //         Keyboard.removeListener( 'keyboardDidShow', _keyboardDidShow );
    //         Keyboard.removeListener( 'keyboardDidHide', _keyboardDidHide );
    //     };
    // }, [] );

    const [ commentsList, setCommentsList ] = useState( fakeComments );
    const keyExtractor = ( item ) => item.commentId.toString();
    const handleCommentReply = () => {
        console.log( '---replying to comment---' );
    };
    const handleViewReplies = () => {
        console.log( '---replying to handleViewReplies---' );
    };

    const renderItem = ( { item } ) => (
        <SimpleComment
            item={ item }
            handleCommentReply={ handleCommentReply }
            handleViewReplies={ handleViewReplies }
            // handleViewMore={ handleViewMore }
        />
    );

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

    async function onSubmit( results ) {
        console.log( 'this is on submit', results );
        return 'done';
    }

    return (
        <View style={ { flex: 1 } }>
            <CommentsListBanner { ...props } style={ { flex: 1 } } />
            <FlatList
                // contentContainerStyle={{
                //     backgroundColor: colors.background,
                //     paddingBottom: safeArea.bottom,
                //     paddingLeft: safeArea.left,
                //     paddingRight: safeArea.right,
                // }}
                // style={{ backgroundColor: colors.background }}
                renderItem={ renderItem }
                keyExtractor={ keyExtractor }
                data={ commentsList }
                // you can remove this when you fix the list
                // if you remove this you will not be able to view the last column
                ListFooterComponent={ <Text style={ { marginTop: 30 } } /> }
            />

            <CommentInputField
                onSubmit={ () => onSubmit() }
            />
        </View>
    );
};

export default CommentScreen;
