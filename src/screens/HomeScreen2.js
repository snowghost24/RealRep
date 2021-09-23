import {Button, Text, View} from "react-native";
import * as React from "react";

const HomeScreen2 = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Settings"
                onPress={() =>
                    navigation.navigate('Feed')
                }
            />
        </View>
    );
}

export default HomeScreen2;
