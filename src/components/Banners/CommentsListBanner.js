import * as React from 'react';
import { Divider, List, Banner } from 'react-native-paper';

import { Image, StyleSheet } from 'react-native';

const CommentsListBanner = ( { route } ) => {
    const { item } = route.params;
    const [ visible, setVisible ] = React.useState( true );

    return (
        <>
            <List.Item
                title={ item.title }
                titleNumberOfLines={ 4 }
                description={ item.issuer }
                left={ ( props ) => (
                    <Image
                        source={ {
                            uri: 'https://media.npr.org/images/stations/nprone_logos/wmfe_fm.png',
                        } }
                        style={ styles.image }
                    />
                ) }
            />
            <Divider />
        </>
    );
};

export default CommentsListBanner;

const styles = StyleSheet.create( {
    image: {
        height: 40,
        width: 40,
        margin: 8,
    },
} );
