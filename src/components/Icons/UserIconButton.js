import React, { useContext } from 'react';
import { isEmpty, get } from 'lodash';
import { Avatar, IconButton } from 'react-native-paper';
import { Image } from 'react-native';
import { AuthenticationContext } from '../../services/AuthenticationContext';
// import {Button} from "react-native";

export const UserIcon = ( { size, ...rest } ) => {
    const { user } = useContext( AuthenticationContext );
    return get( user, 'avatar' )
        ? (
            <Avatar.Image
                size={ size }
                source={ { uri: user.avatar } }
                { ...rest }
            />
        ) : (
            <Avatar.Text
                size={ size }
                label="XD"
                { ...rest }
            />
        );
};

const UserIconButton = ( { size, handleClick } ) => {
    const { user } = useContext( AuthenticationContext );
    console.log( 'esrs', handleClick );
    // console.log( 'userimage', user.avatar );
    return get( user, 'avatar' )
        ? (
            <IconButton
                size={ size }
                onPress={ handleClick }
                icon={ ( { color } ) => (
                    <UserIcon size={ size } />
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

export default UserIconButton;

UserIconButton.defaultProps = {
    size: 50,
};

UserIcon.defaultProps = {
    size: 30,
};
