import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    Badge,
    Colors,
    Text,
} from 'react-native-paper';
import { AuthenticationContext } from '../../services/AuthenticationContext';
import { Spacer } from '../../components/Spacer/Spacer';
import UserIconWithUpload from '../UserIconWithUpload';

const styles = StyleSheet.create( {
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        opacity: 0.6,
    },
    badge: {
        position: 'absolute',
        top: 50,
        left: 50,
    },
    label: {
        flex: 1,
    },
} );

const DrawerTitle = () => {
    const { user } = useContext( AuthenticationContext );

    return (
        <View style={ styles.row }>
            <View style={ styles.item }>
                <UserIconWithUpload />
                <Badge
                    visible
                    style={ [ styles.badge, { backgroundColor: Colors.blue500 } ] }
                >
                    +
                </Badge>
            </View>
            <Spacer left="lg">
                <Text>
                    {user.name}
                </Text>
            </Spacer>
        </View>
    );
};

DrawerTitle.title = 'Badge';

export default DrawerTitle;
