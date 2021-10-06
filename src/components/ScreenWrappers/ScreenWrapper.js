import * as React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function ScreenWrapper({ children, withScrollView = true, style, contentContainerStyle, ...rest}) {
    const {
        colors: { background },
    } = useTheme();
    const insets = useSafeAreaInsets();

    const containerStyle = [
        styles.container,
        {
            backgroundColor: background,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.left,
        },
    ];

    return (
        <>
            {withScrollView ? (
                <KeyboardAwareScrollView
                    contentContainerStyle={ contentContainerStyle }
                    alwaysBounceVertical={ false }
                    showsVerticalScrollIndicator={ false }
                    keyboardShouldPersistTaps={ 'always' }
                    removeClippedSubviews={ false }
                    style={[ containerStyle, style ]}
                    {...rest}
                >
                    {children}
                </KeyboardAwareScrollView>
            ) : (
                <View style={[containerStyle, style]}>{children}</View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
