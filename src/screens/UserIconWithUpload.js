import React, { useEffect, useContext } from 'react';
import {
    Platform,
    Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { get } from 'lodash';
import { pickImage, uploadFile } from '../utils/helperFunctions';
import UserIconButton from '../components/Icons/UserIconButton';
import { LoaderContext } from '../services/LoaderContext';
import { AuthenticationContext } from '../services/AuthenticationContext';

export default function UserIconWithUpload() {
    const { hideModal, showModal } = useContext( LoaderContext );
    const { setUser } = React.useContext( AuthenticationContext );

    useEffect( () => {
        ( async() => {
            if ( Platform.OS !== 'web' ) {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if ( status !== 'granted' ) {
                    alert( 'Sorry, we need camera roll permissions to make this work!' );
                }
            }
        } )();
    }, [] );

    const handleUploadFile = async( img ) => {
        showModal();
        const response = await uploadFile( img );
        if ( get( response, 'user.avatar' ) ) {
            setUser( response.user );
        }
        hideModal();
    };

    const handlePickImage = async() => {
        const newImage = await pickImage();
        if ( newImage ) {
            await handleUploadFile( newImage );
        }
    };

    const createThreeButtonAlert = () => Alert.alert(
        'Photo Options',
        null,
        [
            {
                text: 'Take Photo',
                onPress: () => console.log( 'Ask me later pressed' ),
            },
            { text: 'Upload Photo', onPress: () => handlePickImage() },
            {
                text: 'Cancel',
                onPress: () => console.log( 'Cancel Pressed' ),
                style: 'cancel',
            },

        ],
    );

    return (
        <>
            <UserIconButton handleClick={ createThreeButtonAlert } />
        </>

    );
}
