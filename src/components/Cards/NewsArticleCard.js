import React from 'react';
import {
    Button,
    Card,
    Paragraph,
    useTheme,
} from 'react-native-paper';
import { Alert, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

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

const NewsArticleCard = ( { item, navigation } ) => {
    const _handlePressButtonAsync = async( url ) => {
        const result = await WebBrowser.openBrowserAsync( url );
        // setResult( result );
    };

    const { colors: { background } } = useTheme();
    return (
        <Card
            style={ styles.card }
            onLongPress={ () => {
                Alert.alert( 'The City is Long Pressed' );
            } }
            mode="elevated"
            onPress={ () => _handlePressButtonAsync( item.article_link ) }
        >
            <Card.Title
                title={ item.title }
                subtitle={ item.issuer }
                titleNumberOfLines={ 4 }
                // left={(props) => <Avatar.Icon {...props} icon="city" />}
            />
            <Card.Cover

                source={ { uri: item.media_link } }
            />
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
};

export default NewsArticleCard;

NewsArticleCard.title = 'Card';
