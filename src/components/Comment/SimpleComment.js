import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';
import CommentReplyContainer from './CommentReplyContainer';
import LikeIconButton from '../Icons/LikeIconButton';
import CommentTitle from './CommentTitle';

const {
    List,
    Text,
    Paragraph,
    Divider,
} = require( 'react-native-paper' );

const { Image, View } = require( 'react-native' );

const styles = StyleSheet.create( {
    container: {
        paddingBottom: 0,
        marginVertical: 0,
        marginBottom: 0,
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

const SimpleComment = ( {
    item,
    handleCommentReply,
    // handleHideReplies,
    // handleViewReplies,
    // handleViewMore,
} ) => {
    const [ viewMore, setViewMore ] = useState( false );
    // thee two beelow are temporary
    const [ temporary, setTemporary ] = useState( 1 );
    const commentLength = Math.floor( Math.random() * 3 );
    const [ liked, setLiked ] = useState( false );

    const thereIsMore = temporary < 3;

    const handleViewReplies = () => {
        setViewMore( true );
        console.log( '---replying to handleViewMore---' );
    };

    const handleHideReplies = () => {
        setViewMore( false );
        console.log( '---replying to handleViewMore---' );
    };

    const handleViewMore = () => {
        setViewMore( true );
        setTemporary( temporary + 1 );
        console.log( '---replying to handleViewMore---' );
    };

    const toggleLiked = () => {
        setLiked( !liked );
        console.log( '---Tagled like---' );
    };

    return (
        <>
            <List.Item
                style={ styles.container }
                left={ () => (
                    <Avatar.Image
                        size={ 35 }
                        style={ styles.image }
                        // source={ { uri: user.avatar } }
                    />
                ) }
                right={ ( props ) => (
                    <LikeIconButton
                        liked={ liked }
                        toggleLiked={ toggleLiked }
                        { ...props }
                    />
                ) }
                title={ ( <CommentTitle item={ item } /> ) }
                titleNumberOfLines={ 6 }
                description={ ( {
                    color: descriptionColor,
                    fontSize,
                } ) => (
                    <View>
                        <Text numberOfLines={ 1 } style={ { color: descriptionColor, paddingTop: 4, paddingBottom: 4 } }>
                            <Text>2h</Text>    <Text>124 Likes</Text> <Text onPress={ () => handleCommentReply() } style={ { marginLeft: 8 } }>  Reply</Text>
                        </Text>
                        { ( !viewMore && ( commentLength > 0 ) ) && <Text style={ { paddingBottom: 6 } } onPress={ () => handleViewReplies() }> - View Repliees</Text> }
                    </View>
                ) }
            />
            { ( viewMore && ( commentLength > 0 ) ) && (
                <CommentReplyContainer
                    thereIsMore={ thereIsMore }
                    handleViewMore={ () => handleViewMore() }
                    handleHideReplies={ () => handleHideReplies() }
                />
            ) }

            <Divider />
        </>
    );
};

export default SimpleComment;
