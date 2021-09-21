import {Button, Text, View} from "react-native";
import * as React from "react";

function SettingsScreen({ navigation, route }) {
    const { itemId, otherParam } = route.params
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
            <Text>itemId: {JSON.stringify(itemId)}</Text>
            <Text>otherParam: {JSON.stringify(otherParam)}</Text>
            <Button
                title="Go back to Details"
                onPress={() => navigation.navigate('Profile')}
            />
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}

export default SettingsScreen;
