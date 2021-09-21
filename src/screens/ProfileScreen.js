import React from 'react';
import {Button, Text, View} from "react-native";

const ProfileScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Profile Screen</Text>
            <Button
                title="Go to Settings"
                onPress={() => navigation.navigate('Settings', {itemId : 123, otherParam: "Jose" })}
            />

        </View>
    );
}

export default ProfileScreen;
