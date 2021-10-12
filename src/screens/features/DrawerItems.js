import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import {
    Badge,
    Drawer,
    Switch,
    TouchableRipple,
    Text,
    Colors,
    useTheme,
    Avatar,
} from 'react-native-paper';
import * as Updates from 'expo-updates';
import DrawerTitle from './DrawerTitle';

const DrawerItemsData = [
    { label: 'Inbox', icon: 'inbox', key: 0 },
    {
        label: 'Starred',
        icon: 'star',
        key: 1,
        right: ( { color } ) => (
            <Badge
                visible
                size={ 8 }
                style={ [ styles.badge, { backgroundColor: color } ] }
            />
        ),
    },
    { label: 'Sent mail', icon: 'send', key: 2 },
    { label: 'Colored label', icon: 'palette', key: 3 },
    { label: 'A very long title that will be truncated', icon: 'delete', key: 4 },
    { label: 'Logout', icon: 'lock', key: 5 },
];

const DrawerItems = ( {
    navigation,
    toggleTheme,
    toggleRTL,
    isRTL,
    isDarkTheme,
    onLogout,
} ) => {
    const [ drawerItemIndex, setDrawerItemIndex ] = React.useState( 0 );

    const _setDrawerItem = ( index ) => {
        console.log( 'index' );
        setDrawerItemIndex( index );
        // here we set index were to navigate to
        navigation.navigate( 'Home2' );
    };

    const { colors } = useTheme();

    const _handleToggleRTL = () => {
        toggleRTL();
        Updates.reloadAsync();
    };

    return (
        <DrawerContentScrollView
            alwaysBounceVertical={ false }
            style={ [ styles.drawerContent, { backgroundColor: colors.surface } ] }
        >
            <Drawer.Section title={
                // <Text>Title</Text>
                <DrawerTitle />
            }
            >
                {DrawerItemsData.map( ( props, index ) => (
                    <Drawer.Item
                        style={ { marginTop: props.key === 0 ? 20 : 0 } }
                        { ...props }
                        key={ props.key }
                        theme={
                            props.key === 3
                                ? { colors: { primary: Colors.tealA200 } }
                                : undefined
                        }
                        active={ drawerItemIndex === index }
                        onPress={ props.key === 5 ? () => onLogout() : () => _setDrawerItem( index ) }
                    />
                ) )}
            </Drawer.Section>

            <Drawer.Section title="Preferences">
                <TouchableRipple onPress={ toggleTheme }>
                    <View style={ styles.preference }>
                        <Text>Dark Theme</Text>
                        <View pointerEvents="none">
                            <Switch value={ isDarkTheme } />
                        </View>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={ _handleToggleRTL }>
                    <View style={ styles.preference }>
                        <Text>RTL</Text>
                        <View pointerEvents="none">
                            <Switch value={ isRTL } />
                        </View>
                    </View>
                </TouchableRipple>
            </Drawer.Section>
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create( {
    drawerContent: {
        flex: 1,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    badge: {
        alignSelf: 'center',
    },
} );

export default DrawerItems;
