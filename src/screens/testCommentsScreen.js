import React, { useEffect, useRef, useState } from 'react';
// import axios from 'axios';
import {
    View,
    ActivityIndicator,
    RefreshControl,
    FlatList,
    Text,
} from 'react-native';
import { Divider } from 'react-native-paper';
import _ from 'lodash';
import SimpleComment from '../components/Comment/SimpleComment';
import AxiosInstance from '../utils/axiosInstance';
import CommentInputField from '../components/Comment/CommentInputField';

const TestCommentsScreen = () => {
    const [ page, setPage ] = useState( 1 );
    const [ lastPage, setLastPage ] = useState( 2 );
    const allowLoadMore = useRef( false );
    const keyExtractor = ( item ) => item.id.toString();
    const [ comments, setComments ] = useState( [] );
    const [ isLoading, setIsLoading ] = useState( false );
    const [ isRefreshing, setIsRefreshing ] = useState( false );
    const [ error, setError ] = useState( '' );
    const [ appData, setData ] = useState( {
        loading: false,
        isRefreshing: false,
        data: [],
        error: '',
    } );

    function fetchComments( fetchPage = 1 ) {
        const url = `comments/NewsArticle/1?page=${ fetchPage }`;
        console.log( 'fetching page', fetchPage );

        setIsLoading( true );
        allowLoadMore.current = false;
        // setData( { ...appData, loading: true } );
        AxiosInstance.post( url )
            .then( ( res ) => {
                // const listData = appData.data;
                // const data = listData.concat( res.data.data );
                // console.log( 'data beforee', data.length );
                // setData( { ...appData, loading: false, data: data } );
                setPage( res.data.current_page );
                setLastPage( res.data.last_page );
                const cleanData = res.data.data.map( ( row ) => _.pick( row, [ 'comment', 'id', 'updated_at', 'commenter' ] ) );

                // console.log( 'first comments', cleanData );
                // setComments( [ ...comments, ...res.data.data ] );
                setComments( _.uniqBy( [ ...comments, ...cleanData ], 'id' ) );
                // console.log( 'data after', comments.length );
                setIsLoading( false );
                allowLoadMore.current = true;
            } )
            .catch( ( error ) => {
                setPage( 1 );
                setError( 'Something went wrong' );
                setIsLoading( false );
                allowLoadMore.current = true;
            } );
    }

    useEffect( () => {
        fetchComments( 1 );
    }, [] );

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

            let oldComments = comments.slice();
            setComments( [ ] );
            setComments( ( ) => [ _.pick( response.data.comment, [ 'comment', 'id', 'updated_at', 'commenter' ] ), ...oldComments ] );
            oldComments = [];
            return response;
        } catch ( e ) {
            console.log( 'error adding comment', e );
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
    const renderSeparator = () => ( <Divider /> );

    const handleLoadMore = () => {
        console.log( 'load more is clickedd', allowLoadMore.current );
        // console.log( 'is refreshing', appData.isRefreshing );
        // console.log( 'is loading', appData.loading );
        // console.log( 'is combined', ( !appData.loading || !appData.isRefreshing ) );

        if ( allowLoadMore.current && ( lastPage >= page ) ) {
            // do nothing
            console.log( 'loading more' );
            fetchComments( page + 1 );
        }
    };

    function onRefresh() {
        console.log( 'im refreshing' );
        // setPage( 1 );
        allowLoadMore.current = false;
        setIsRefreshing( true );
        // setData( { ...appData, isRefreshing: true, data: [] } );
        // true isRefreshing flag for enable pull to refresh indicator
        const url = 'comments/NewsArticle/1?page=1';
        AxiosInstance.post( url )
            .then( ( res ) => {
                const reFreshData = res.data.data;
                console.log( 'my new data', reFreshData.length );
                setPage( 1 );
                setIsRefreshing( false );
                setComments( reFreshData );
                // setData( { ...appData, isRefreshing: false, data: reFreshData } );
                allowLoadMore.current = true;// false isRefreshing flag for disable pull to refresh indicator, and clear all data and store only first page data
            } )
            .catch( ( error ) => {
                allowLoadMore.current = true;
                setIsRefreshing( false );
                setError( 'Something just went wrong' );
            } );
    }

    const renderFooter = () => {
        // it will show indicator at the bottom of the list when data is loading otherwise it returns null
        if ( !isLoading ) return ( <Text style={ { marginTop: 30 } } /> );
        return (
            <ActivityIndicator
                style={ { color: '#000' } }
            />
        );
    };

    // console.log( ')) app data(( ', appData.data.length );

    const renderItem = ( { item } ) => (
        <SimpleComment
            item={ item }
            handleCommentReply={ () => console.log( test ) }
            handleViewReplies={ () => console.log( test ) }
            // handleViewMore={ handleViewMore }
        />
    );
    console.log( 'appdata', comments.length );
    console.log( 'load', isRefreshing );

    return ( isLoading && page === 1 ) ? (
        <View style={ {
            width: '100%',
            height: '100%',
        } }
        ><ActivityIndicator style={ { color: '#000' } } />
        </View>
    ) : (
        <View style={ { width: '100%', height: '100%' } }>
            <FlatList
                style={ { height: '100%' } }
                initialNumToRender={ 20 }
                data={ comments }
                maintainVisibleContentPosition={ {
                    minIndexForVisible: 0,
                } }
                extraData={ isLoading || isRefreshing }
                refreshControl={ (
                    <RefreshControl
                        refreshing={ isRefreshing }
                        onRefresh={ () => onRefresh() }
                    />
                ) }
                renderItem={ renderItem }
                keyExtractor={ keyExtractor }
                ItemSeparatorComponent={ () => renderSeparator() }
                ListFooterComponent={ () => renderFooter( ) }
                onEndReachedThreshold={ 0.1 }
                onEndReached={ () => handleLoadMore( ) }

            />
            <CommentInputField postComment={ ( message ) => postComment( message ) } />
        </View>
    );
};

export default TestCommentsScreen;
