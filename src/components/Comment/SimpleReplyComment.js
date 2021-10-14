import React, { useEffect } from 'react';
import { List, Paragraph, Text } from 'react-native-paper';
import {
    Image, StyleSheet, View, Keyboard, TextInput,
} from 'react-native';

const styles = StyleSheet.create( {
    container: {
        flex: 1,
    },
    image: {
        height: 30,
        width: 30,
        margin: 8,
    },
    row: {
        flexDirection: 'row',
    },
    column: {
        flexDirection: 'column',
    },
} );

const SimpleReplyComment = () => {
    console.log( '' );
    return (
        <>
            <List.Item
                style={ { paddingTop: 0, paddingRight: 0, paddingBottom: 0 } }
                left={ () => (
                    <Image
                        source={ require( '../../../assets/images/email-icon.png' ) }
                        style={ styles.image }
                    />
                ) }
                right={ ( props ) => <List.Icon { ...props } icon="heart-outline" /> }
                title={ (
                    <Text numberOfLines={ 6 }>
                        <Text style={ { fontWeight: 'bold' } }>Snowghost24</Text><Paragraph> is a high-quality, standard-compliant
                            Material Design library that has you covered in all major
                            use-cases
                        </Paragraph>
                    </Text>
                ) }
                titleNumberOfLines={ 6 }
                description={ ( {
                    ellipsizeMode,
                    color: descriptionColor,
                    fontSize,
                } ) => (
                    <View>
                        <Text numberOfLines={ 1 } style={ { paddingTop: 4 } }>
                            <Text>2h</Text>    <Text>124 Likes</Text> <Text style={ { marginLeft: 8 } }>  Reply</Text>
                        </Text>

                    </View>
                ) }
            />
        </>
    );
};

export default SimpleReplyComment;
