import React from 'react';
import {Appbar} from "react-native-paper";

function MainPageHeader({ navigation, scene, progress, route }) {
    return (
        <Appbar.Header>
            { progress.previous ? (
                <Appbar.BackAction onPress={() => navigation.goBack()} />
            ) : navigation.openDrawer ? (
                <Appbar.Action
                    icon="menu"
                    onPress={() =>
                        navigation.openDrawer()
                    }
                />
            ) : null}
            <Appbar.Content title={route.name} />
        </Appbar.Header>
    );
}

export default MainPageHeader;
