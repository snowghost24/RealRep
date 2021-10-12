import React, { useContext } from 'react';
import { isEmpty, get } from 'lodash';
import { Avatar, IconButton } from 'react-native-paper';
import { Image } from 'react-native';
import { AuthenticationContext } from '../../services/AuthenticationContext';
// import {Button} from "react-native";

const UserIcon = ( { size, handleClick } ) => {
    const { user } = useContext( AuthenticationContext );
    console.log( 'esrs', handleClick );
    // console.log( 'userimage', user.avatar );
    return get( user, 'avatar' )
        ? (
            <IconButton
                size={ size }
                onPress={ handleClick }
                icon={ ( { color } ) => (
                    <Avatar.Image
                        size={ size }
                        source={ { uri: user.avatar } }
                    />
                ) }
            />
        )
        : (
            <IconButton
                size={ size }
                onPress={ handleClick }
                icon={ ( { color } ) => (
                    <Avatar.Text onPress={ handleClick } size={ size } label="XD" />
                ) }
            />
        );
};

export default UserIcon;

UserIcon.defaultProps = {
    size: 50,
};
