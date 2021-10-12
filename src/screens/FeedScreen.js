import * as React from 'react';
import {
    Alert, FlatList, ScrollView, StyleSheet, View,
} from 'react-native';
import {
    Avatar,
    Paragraph,
    Card,
    Button,
    IconButton,
    useTheme,
    Text,
    Switch,
    Divider,
    Subheading,
} from 'react-native-paper';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenWrapper from '../components/ScreenWrappers/ScreenWrapper';
import AxiosInstance from '../utils/axiosInstance';
import { BEARER_TOKEN } from '../utils/constants';
import { getData } from '../utils/helperFunctions';

const FeedScreen = ( { navigation } ) => {
    const { colors: { background } } = useTheme();
    const [ articles, setArticles ] = React.useState( [] );
    const [ isOutlined, setIsOutlined ] = React.useState( false );
    const mode = isOutlined ? 'outlined' : 'elevated';

    useEffect( () => {
        getData( BEARER_TOKEN ).then( ( token ) => {
            console.log( 'token does exist', token );
        } );
        AxiosInstance.get( '/news_articles' ).then( ( response ) => {
            // console.log("my response",response.data);
            setArticles( response.data );
            // return AsyncStorage.setItem(BEARER_TOKEN, response.data.token).then(()=>{
            //     return response
            // });
        } ).catch( ( e ) => { console.log( 'an error occurred getting news', e.response ); } );
    }, [] );

    // console.log("fetched articles",articles)

    const renderItem = ( { item } ) => (
        <Card
            style={ styles.card }
            onLongPress={ () => {
                Alert.alert( 'The City is Long Pressed' );
            } }
            mode={ mode }
        >
            <Card.Title
                title={ item.title }
                subtitle={ item.issuer }
                titleNumberOfLines={ 4 }
                // left={(props) => <Avatar.Icon {...props} icon="city" />}
            />
            <Card.Cover source={ { uri: item.media_link } } />
            <Card.Content>
                <Paragraph>
                    {item.to_question}
                </Paragraph>
            </Card.Content>
            <Card.Actions>
                <Button onPress={ () => navigation.push( 'Tackle', { item } ) }>Tackle</Button>
                <Button icon="comment-outline" onPress={ () => navigation.push( 'Comment', { item } ) } />
            </Card.Actions>
        </Card>
    );

    const keyExtractor = ( item ) => item.id.toString();

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

FeedScreen.title = 'Card';

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

export default FeedScreen;
