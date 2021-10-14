import React from 'react';
import { List, Text } from 'react-native-paper';
import SimpleReplyComment from './SimpleReplyComment';

const CommentReplyContainer = ( { handleViewMore, handleHideReplies, thereIsMore } ) => {
    console.log( '' );
    return (
        <>
            <List.Item
                style={ {
                    marginTop: 0, paddingTop: 0, paddingBottom: 0, marginVertical: 0,
                } }
                left={ () => <Text style={ { height: 0 } }>hello</Text> }
                title="  --View Replies"
                titleStyle={ { height: 0 } }
                description={ () => (
                    <>
                        <SimpleReplyComment />
                        <SimpleReplyComment />
                        { thereIsMore ? <Text onPress={ () => handleViewMore() } style={ { paddingLeft: 18, paddingBottom: 6 } }> - Show more</Text>
                            : <Text onPress={ () => handleHideReplies() } style={ { paddingLeft: 18, paddingBottom: 6 } }> - Hide replies</Text>}

                    </>
                ) }
            />

        </>
    );
};

export default CommentReplyContainer;
