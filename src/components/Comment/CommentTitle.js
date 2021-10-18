import React from 'react';
import { Paragraph, Text } from 'react-native-paper';
import { get } from 'lodash';

const CommentTitle = ( { item } ) => (
    <Text numberOfLines={ 6 }>
        <Text style={ { fontWeight: 'bold' } }>
            {/* { item.display_name} */}
            { get( item, 'commenter.username' ) ?? 'GuestUser' }
        </Text>
        <Paragraph>
            {' '}{ item.comment }
        </Paragraph>
    </Text>
);

export default CommentTitle;
