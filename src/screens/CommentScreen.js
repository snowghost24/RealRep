import React, { useEffect, useState, useContext } from 'react';
import {
    FlatList, Keyboard, TextInput, View, Text, RefreshControl,
} from 'react-native';
import {
    ActivityIndicator, Button, Divider, List,
} from 'react-native-paper';
import AxiosInstance from '../utils/axiosInstance';
import CommentsListBanner from '../components/Banners/CommentsListBanner';
import SimpleComment from '../components/Comment/SimpleComment';
import CommentInputField from '../components/Comment/CommentInputField';
import { LoaderContext } from '../services/LoaderContext';

const fakeComments = [ {
    id: 1,
    commenter: {
        avatar: '',
        username: 'SnowGhost24',
    },
    updated_at: '2h',
    likeTotal: 1304,
    comment: 'This is a comment dont worrry about it owrking ont it',
    liked: true,
}, {
    id: 2,
    commenter: {
        avatar: '',
        username: 'Og1ginobiliy',
    },
    updated_at: '24m',
    likeTotal: 13,
    comment: 'This is a second comment trying to fix the display before i go ahead and set up the back end',
    liked: true,
}, {
    id: 3,
    commenter: {
        avatar: '',
        username: 'jguzman246880',
    },
    updated_at: '4m',
    likeTotal: 14,
    comment: 'This is a comment dont worrry about it owrking ont it- ok so what now',
    liked: true,
}, {
    id: 4,
    commenter: {
        avatar: '',
        username: 'yallcantguardme1',
    },
    updated_at: '24w',
    likeTotal: 34,
    comment: 'This is a comment dont worrry about it owrking ont it - but yeah yall cant guad me',
    liked: true,
}, {
    id: 5,
    commenter: {
        avatar: '',
        username: 'SnowGhost24',
    },
    updated_at: '2h',
    likeTotal: 1304,
    comment: 'This is a comment dont worrry about it owrking ont it',
    liked: true,
}, {
    id: 6,
    commenter: {
        avatar: '',
        username: 'Og1ginobiliy',
    },
    updated_at: '24m',
    likeTotal: 13,
    comment: 'This is a second comment trying to fix the display before i go ahead and set up the back end',
    liked: true,
}, {
    id: 7,
    commenter: {
        avatar: '',
        username: 'jguzman246880',
    },
    updated_at: '4m',
    likeTotal: 14,
    comment: 'This is a comment dont worrry about it owrking ont it- ok so what now',
    liked: true,
}, {
    id: 8,
    commenter: {
        avatar: '',
        username: 'yallcantguardme1',
    },
    updated_at: '24w',
    likeTotal: 34,
    comment: 'This is a comment dont worrry about it owrking ont it - but yeah yall cant guad me',
    liked: true,
}, {
    id: 9,
    commenter: {
        avatar: '',
        username: 'SnowGhost24',
    },
    updated_at: '2h',
    likeTotal: 1304,
    comment: 'This is a comment dont worrry about it owrking ont it',
    liked: true,
}, {
    id: 10,
    commenter: {
        avatar: '',
        username: 'Og1ginobiliy',
    },
    updated_at: '24m',
    likeTotal: 13,
    comment: 'This is a second comment trying to fix the display before i go ahead and set up the back end',
    liked: true,
}, {
    id: 11,
    commenter: {
        avatar: '',
        username: 'jguzman246880',
    },
    updated_at: '4m',
    likeTotal: 14,
    comment: 'This is a comment dont worrry about it owrking ont it- ok so what now',
    liked: true,
}, {
    id: 12,
    commenter: {
        avatar: '',
        username: 'yallcantguardme1',
    },
    updated_at: '24w',
    likeTotal: 34,
    comment: 'This is a comment dont worrry about it owrking ont it - but yeah yall cant guad me',
    liked: true,
} ];

const CommentScreen = ( props ) => {
    // const { showModal, hideModal, isLoading } = useContext( LoaderContext );
    const [ isRefreshing, setRefreshing ] = useState( false );
    const [ isLoading, setIsLoading ] = useState( false );
    const refreshing = false;
    const [ page, setPage ] = useState( 1 );
    const [ data, setData ] = useState( [] );

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
    const keyExtractor = ( item ) => item.id.toString();
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

    function getComments() {
        setIsLoading( true );
        AxiosInstance.post( 'comments/NewsArticle/1' ).then( ( res ) => {
            console.log( res.data );
            setCommentsList( [ ...data, ...res.data.comments ] );
            setIsLoading( false );
        } ).catch( ( e ) => {
            setIsLoading( false );
            console.log( 'an error occurred', e.response );
        } );
    }

    async function getReplies() {
        try {
            setIsLoading( true );
            const response = await AxiosInstance.post( 'comments/replies/1' );
            await setCommentsList( response.data );
            setIsLoading( false );
        } catch ( e ) {
            setIsLoading( false );
            console.log( 'an error occurred', e.response );
        }
    }

    // const postComment = () => {
    //     console.log( 'attempting to post' );
    //     AxiosInstance.post( '/news_articles/1/comment', { comment: 'hello world we made it' } ).then( ( response ) => {
    //         // console.log( 'to a post', response );
    //         // setCommentsList(response.data);
    //         // return AsyncStorage.setItem(BEARER_TOKEN, response.data.token).then(()=>{
    //         //     return response
    //         // });
    //     } ).catch( ( e ) => { console.log( 'an error occurred', e ); } );
    // };

    async function postComment( message ) {
        try {
            const model = 'NewsArticle';
            const response = await AxiosInstance.post(
                '/comments',
                {
                    message,
                    commentable_type: model,
                    commentable_id: '1',
                },
            );

            console.log( 'how about now', response.data );
            return response;
        } catch ( e ) {
            console.log( 'error', e.response );
            return '';
        }

        // return 'done';
        // console.log( 'attempting to post' );
        // AxiosInstance.post( '/news_articles/1/comment', { comment: 'hello world we made it' } ).then( ( response ) => {
        //     // console.log( 'to a post', response );
        //     // setCommentsList(response.data);
        //     // return AsyncStorage.setItem(BEARER_TOKEN, response.data.token).then(()=>{
        //     //     return response
        //     // });
        // } ).catch( ( e ) => { console.log( 'an error occurred', e ); } );
    }

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

    async function refreshComments() {
        console.log( 'im refreshing the component' );
        setRefreshing( true );
    }

    useEffect( () => {
        getComments();
    }, [] );

    async function onSubmit( results ) {
        console.log( 'this is on submit', results );
        return 'done';
    }

    async function loadMoreParents() {
        if ( !isLoading ) {
            setIsLoading( true );
            // setPage( page + 1 );
            // getComments( page ); // method for API call
        }
    }
    // console.log( 'refreeshing', refreshing );

    const testButton = () => {
        console.log( 'Testing Refresh' );
    };

    const renderSeparator = () => (
        <Divider />
    );

    const renderFooter = () => {
        if ( !isLoading ) return <Text style={ { marginTop: 30 } } />;
        return (
            <ActivityIndicator
                style={ { color: '#000', marginTop: 30 } }
            />
        );
    };
    return isLoading && ( page !== 1 ) ? (
        <View style={ {
            width: '100%',
            height: '100%',
        } }
        ><ActivityIndicator style={ { color: '#000' } } />
        </View>
    ) : (
        <View style={ {
            width: '100%',
            height: '100%',
        } }
        >

            {/* <CommentsListBanner { ...props } style={ { flex: 1 } } /> */}
            <FlatList
                initialNumToRender={ 10 }
                // contentContainerStyle={{
                //     backgroundColor: colors.background,
                //     paddingBottom: safeArea.bottom,
                //     paddingLeft: safeArea.left,
                //     paddingRight: safeArea.right,
                // }}
                renderItem={ renderItem }
                keyExtractor={ keyExtractor }
                data={ commentsList }
                refreshControl={ (
                    <RefreshControl
                        refreshing={ refreshing }
                        onRefresh={ () => refreshComments }
                    />
                ) }
                ItemSeparatorComponent={ () => renderSeparator() }
                onEndReached={ () => loadMoreParents() }
                renderFooter={ renderFooter }
                ListFooterComponent={ () => renderFooter() }
                onEndReachedThreshold={ 0.1 }
                // ListFooterComponent={ <Text style={ { marginTop: 30 } } /> }
            />

            {/* <CommentInputField postComment={ ( message ) => postComment( message ) } /> */}
        </View>
    );
};

export default CommentScreen;
