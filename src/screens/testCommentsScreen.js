import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    View, Image, ActivityIndicator, RefreshControl, FlatList, Text,
} from 'react-native';
import { Divider } from 'react-native-paper';
import SimpleComment from '../components/Comment/SimpleComment';

const TestCommentsScreen = () => {
    const [ page, setPage ] = useState( 1 );
    const [ appData, setData ] = useState( {
        loading: false,
        isRefreshing: false,
        data: [],
        error: '',
    } );

    function fetchComments( page ) {
        // stackexchange User API url
        const url = `https://api.stackexchange.com/2.2/users?page=${ page }&order=desc&sort=reputation&site=stackoverflow`;
        // this.setState({ loading: true })
        setData( { ...appData, loading: true } );
        axios.get( url )
            .then( ( res ) => {
                console.log( res );
                const listData = appData.data;
                const data = listData.concat( res.data.items );
                console.log( 'concat data', data );
                // concate list with response
                setData( { ...appData, loading: false, data: data } );
            } )
            .catch( ( error ) => {
                console.log( error );
                setData( { ...appData, loading: false, error: 'Something just went wrong' } );
            } );
    }

    useEffect( () => {
        console.log( 'called fetchComments from useeffect' );
        fetchComments( page );
    }, [] );
    const renderSeparator = () => (
        <Divider />
        // <View
        //     style={ {
        //         height: 1,
        //         width: '100%',
        //         backgroundColor: '#CED0CE',
        //     } }
        // />
    );

    const handleLoadMore = () => {
        if ( !appData.loading ) {
            setPage( page + 1 ); // increase page by 1
            fetchComments( page ); // method for API call
        }
    };

    function onRefresh() {
        setData( { ...appData, isRefreshing: true } ); // true isRefreshing flag for enable pull to refresh indicator
        const url = 'https://api.stackexchange.com/2.2/users?page=1&order=desc&sort=reputation&site=stackoverflow';
        axios.get( url )
            .then( ( res ) => {
                const data = res.data.items;
                setData( { ...appData, isRefreshing: false, data: data } ); // false isRefreshing flag for disable pull to refresh indicator, and clear all data and store only first page data
            } )
            .catch( ( error ) => {
                setData( { ...appData, isRefreshing: false, error: 'Something just went wrong' } ); // false isRefreshing flag for disable pull to refresh
            } );
    }

    const renderFooter = () => {
        // it will show indicator at the bottom of the list when data is loading otherwise it returns null
        if ( !appData.loading ) return null;
        return (
            <ActivityIndicator
                style={ { color: '#000' } }
            />
        );
    };

    console.log( appData );

    const renderItem = ( { item } ) => (
        <SimpleComment
            item={ item }
            handleCommentReply={ () => console.log( test ) }
            handleViewReplies={ () => console.log( test ) }
            // handleViewMore={ handleViewMore }
        />
    );

    return ( appData.loading && page === 1 ) ? (
        <View style={ {
            width: '100%',
            height: '100%',
        } }
        ><ActivityIndicator style={ { color: '#000' } } />
        </View>
    ) : (
        <View style={ { width: '100%', height: '100%' } }>
            <FlatList
                data={ appData.data }
                maintainVisibleContentPosition={ {
                    minIndexForVisible: 0,
                } }
                extraData={ appData.loading }
                refreshControl={ (
                    <RefreshControl
                        refreshing={ appData.isRefreshing }
                        onRefresh={ () => onRefresh() }
                    />
                ) }
                renderItem={ renderItem }
                // <View style={ {
                //     flexDirection: 'row',
                //     padding: 15,
                //     alignItems: 'center',
                // } }
                // >
                //     <Image
                //         source={ { uri: item.profile_image } }
                //         style={ {
                //             height: 50,
                //             width: 50,
                //             marginRight: 10,
                //         } }
                //     />
                //     <Text style={ {
                //         fontSize: 18,
                //         alignItems: 'center',
                //         color: '#65A7C5',
                //     } }
                //     >{item.display_name}
                //     </Text>
                // </View>

                keyExtractor={ ( item, index ) => index.toString() }
                ItemSeparatorComponent={ () => renderSeparator() }
                ListFooterComponent={ () => renderFooter( ) }
                onEndReachedThreshold={ 0.6 }
                onEndReached={ () => handleLoadMore( ) }
            />
        </View>
    );
};

export default TestCommentsScreen;
