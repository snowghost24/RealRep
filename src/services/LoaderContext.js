import React, { createContext } from 'react';
import {
    Modal,
    Portal,
    Provider,
    ActivityIndicator,
} from 'react-native-paper';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create( {
    modal: {
        backgroundColor: 'transparent',
    },
} );

export const LoaderContext = createContext();

export const LoaderContextProvider = ( { children } ) => {
    const [ isLoading, setIsLoading ] = React.useState( false );
    const showModal = () => setIsLoading( true );
    const hideModal = () => setIsLoading( false );

    return (
        <LoaderContext.Provider
            value={ {
                isLoading,
                showModal,
                hideModal,
                setIsLoading,
            } }
        >
            <Portal>
                <Modal
                    dismissable={ false }
                    visible={ isLoading }
                    onDismiss={ hideModal }
                    contentContainerStyle={ styles.modal }
                >
                    <ActivityIndicator animating />
                </Modal>
            </Portal>
            { children}
        </LoaderContext.Provider>
    );
};
