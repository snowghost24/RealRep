import React from 'react';
import { HelperText } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create( {
    helper: {
        marginTop: 0,
        marginBottom: 0,
        paddingVertical: 0,
        marginVertical: 0,
    },
} );

const TextFieldHelperMessage = ( { message, messageType, ...rest } ) => ( message !== ''
    ? (
        <HelperText
            type={ messageType }
            visible
            padding="none"
            style={ styles.helper }
            { ...rest }
        >
            { message }
        </HelperText>
    ) : null );

export default TextFieldHelperMessage;

TextFieldHelperMessage.defaultProps = {
    errorType: 'error',
    message: '',
};
