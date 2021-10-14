import * as React from 'react';
import {
    FlatList,
    StyleSheet,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { useEffect } from 'react';
// import RNUrlPreview from 'react-native-url-preview';
// TODO:might have to use the RNU preview later on
import AxiosInstance from '../utils/axiosInstance';
import NewsArticleCard from '../components/Cards/NewsArticleCard';

const CommentList = ( { navigation } ) => {
    const { colors: { background } } = useTheme();
    const [ articles, setArticles ] = React.useState( [] );
    const keyExtractor = ( item ) => item.id.toString();

    const renderItem = ( { item } ) => (
        <NewsArticleCard
            item={ item }
            navigation={ navigation }
        />
    );

    // useEffect( () => {
    //     AxiosInstance.get( '/news_articles' ).then( ( response ) => {
    //         setArticles( response.data );
    //     } ).catch( ( e ) => { console.log( 'an error occurred getting news', e.response ); } );
    // }, [] );

    return (
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
            data={ articles }
        />

    );
};

CommentList.title = 'Card';

const styles = StyleSheet.create( {
    container: {
        flex: 1,
    },
    content: {
        padding: 4,
    },
    card: {
        margin: 4,
    },
    preference: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 8,
    },
    title: {

    },
} );

export default CommentList;
