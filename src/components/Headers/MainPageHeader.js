import React from 'react';
import {Appbar} from "react-native-paper";

function MainPageHeader({ navigation, scene, previous }) {
    return (
        <Appbar.Header>
            {previous ? (
                <Appbar.BackAction onPress={() => navigation.goBack()} />
            ) : navigation.openDrawer ? (
                <Appbar.Action
                    icon="menu"
                    onPress={() =>
                        navigation.openDrawer()
                    }
                />
            ) : null}
            <Appbar.Content title={scene.descriptor.options.title} />
        </Appbar.Header>
    );
}

export default MainPageHeader;
