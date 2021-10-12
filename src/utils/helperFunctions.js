import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { BASE_URL, BEARER_TOKEN } from './constants';

export const validationRules = {
    composedValidators: ( ...validators ) => ( value ) => validators.reduce( ( acc, cur ) => acc || cur( value ), undefined ),
    address: ( value ) => ( value && /[^A-Za-z0-9'\.\-\s\,\#]/i.test( value ) ? 'Only alphanumeric characters, commas, dash & #' : undefined ),
    alpha: ( value ) => ( value && /[^a-zA-Z\-]/i.test( value ) ? 'Only alphanumeric characters' : undefined ),
    alphaNumeric: ( value ) => ( value && /[^a-zA-Z0-9 -]/i.test( value ) ? 'Only alphanumeric characters' : undefined ),
    alphaNumericPlus: ( value ) => ( value && /[^a-zA-Z0-9-]/i.test( value ) ? 'Only alphanumeric characters, hyphens, no spaces' : undefined ),
    array: ( value ) => ( value && Array.isArray( value ) && value.length ? undefined : 'Required' ),
    boolean: ( value ) => ( value !== 'undefined' ? undefined : 'Required' ),
    isEmailValid: ( value ) => ( value && !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test( value ) ? 'Invalid email address' : undefined ),
    maxLength: ( max ) => ( value ) => ( value && value.length > max ? `Must be ${ max } characters or less` : undefined ),
    maxValue: ( max ) => ( value ) => ( value && value > max ? `Must be at most ${ max }` : undefined ),
    minLength: ( min ) => ( value ) => ( value && value.length < min ? `Must be ${ min } characters or more` : undefined ),
    minValue: ( min ) => ( value ) => ( value && value < min ? `Must be at least ${ min }` : undefined ),
    number: ( value ) => ( value && isNaN( Number( value ) ) ? 'Must be a number' : undefined ),
    phoneNumberUS: ( value ) => ( value && !/^(0|[1-9][0-9]{9})$/i.test( value ) ? 'Invalid phone number' : undefined ),
    phoneNumber: ( value ) => ( value && !/^[0-9\-\(\)\/\+\s]*$/i.test( value ) ? 'Invalid phone number' : undefined ),
    required: ( value ) => ( value && ( value.length || value !== 'undefined' ) ? undefined : 'Required' ),
    safeVarChars: ( value ) => ( value && /[^A-Za-z0-9'\.\-\_\s\,\#\@\!]/gmi.test( value ) ? 'Only alphanumeric characters, underscore, commas, dash & #' : undefined ),
    validURL: ( value ) => ( value && !/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi.test( value ) ? 'invalid URL' : undefined ),
};

export const getData = async( key ) => {
    try {
        const value = await AsyncStorage.getItem( key );
        return JSON.parse( value );
    } catch ( e ) {
        return null;
    }
};

export const storeData = async( key, value ) => {
    try {
        const jsonValue = JSON.stringify( value );
        await AsyncStorage.setItem( key, jsonValue );
    } catch ( e ) {
        return null;
        // saving error
    }
};

export const getMimeType = ( ext ) => {
    // mime type mapping for few of the sample file types
    switch ( ext ) {
        case 'pdf': return 'application/pdf';
        case 'jpg': return 'image/jpeg';
        case 'jpeg': return 'image/jpeg';
        case 'png': return 'image/png';
    }
};

export const uploadFile = async( fileUri ) => {
    const YOUR_SERVER_URL = BASE_URL + '/avatar';
    if ( fileUri ) {
        try {
            const filename = fileUri.split( '/' ).pop();
            const extArr = /\.(\w+)$/.exec( filename );
            const type = getMimeType( extArr[ 1 ] );
            const formData = new FormData();

            formData.append( 'filetoupload', { uri: fileUri, name: filename, type } );

            const token = await getData( BEARER_TOKEN );

            const response = await fetch( YOUR_SERVER_URL, {
                method: 'POST',
                body: formData,
                headers: {
                    'content-type': 'multipart/form-data',
                    Authorization: 'Bearer ' + token,
                },
            } );
            // startUploading( false );
            // const responseAgain = await response.text();
            // console.log( 'jsonn response', responseAgain );
            // console.log( 'POST RESPONSE: ' + JSON.stringify( response ) );
            // return JSON.parse( JSON.stringify( response ) );
            return response.json();
        } catch ( e ) {
            console.log( 'jsonn error', e );
        }
    }
};

const pickFile = async() => {
    const result = await DocumentPicker.getDocumentAsync( {
        type: '*/*',
    } );

    // console.log( result );

    if ( !result.cancelled ) {
        return result.uri;
        // setFile( result.uri );
    }
};

export const pickImage = async() => {
    const result = await ImagePicker.launchCameraAsync( {
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [ 4, 3 ],
        quality: 1,
    } );
    // const result = await ImagePicker.launchImageLibraryAsync( {
    //     mediaTypes: ImagePicker.MediaTypeOptions.All,
    //     allowsEditing: true,
    //     aspect: [ 4, 3 ],
    //     quality: 1,
    // } );

    // console.log( result );

    if ( !result.cancelled ) {
        return result.uri;
    }
    return null;
};
