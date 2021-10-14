import React from 'react';
import { IconButton } from 'react-native-paper';

const LikeIconButton = ( { liked, toggleLiked, ...rest } ) => (
    <IconButton
        // style={ { margin: 0 } }
        icon={ liked ? 'cards-heart' : 'heart-outline' }
        size={ 20 }
        onPress={ () => toggleLiked() }
        { ...rest }
        color={ liked ? 'red' : 'gray' }

    />
);

export default LikeIconButton;
