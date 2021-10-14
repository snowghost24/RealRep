import React from 'react';
import { Paragraph, Text } from 'react-native-paper';

const CommentTitle = ( { item } ) => (
    <Text numberOfLines={ 6 }>
        <Text style={ { fontWeight: 'bold' } }>
            { item.creator }
        </Text>
        <Paragraph>
            {' '}{ item.message }
        </Paragraph>
    </Text>
);

export default CommentTitle;
