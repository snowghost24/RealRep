import React from 'react';
import { View } from 'react-native';
import { useTheme } from "react-native-paper";

const positionVariant = {
    top: 'marginTop',
    left: 'marginLeft',
    right: 'marginRight',
    bottom: 'marginBottom',
};

export const Spacer = (props) => {
    const property = positionVariant[props.position];
    const theme = useTheme();
    return (<View style={{ [property] : theme.space[props.size] }}>{props.children}</View>);
}

Spacer.defaultProps = {
    position: 'top',
    size: 'xs',
};
