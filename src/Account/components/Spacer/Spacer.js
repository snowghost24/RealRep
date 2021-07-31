import React from 'react';
import { View } from 'react-native';
import {useTheme} from "react-native-paper";

const sizeVariant = {
    small: 1,
    medium: 2,
    large: 3,
    xl: 4,
    xxl: 5,
};

const positionVariant = {
    top: 'marginTop',
    left: 'marginLeft',
    right: 'marginRight',
    bottom: 'marginBottom',
};

export const Spacer = (props) => {
    const sizeIndex = sizeVariant[props.size];
    const property = positionVariant[props.position];
    const theme = useTheme();

    return (<View style={{ [property] : theme.space[sizeIndex] }}>{props.children}</View>);
}

Spacer.defaultProps = {
    position: 'top',
    size: 'small',
};
