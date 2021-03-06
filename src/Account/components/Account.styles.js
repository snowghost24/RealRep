import React, { Fragment } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import {
    Button, TextInput, useTheme, Text,
} from 'react-native-paper';
import { colors } from '../../infrastructure/theme/colors';
import ScreenWrapper from '../../components/ScreenWrappers/ScreenWrapper';

export const ScreenWrapperStyled = ( { children, ...rest } ) => {
    const { space } = useTheme();
    return (
        <ScreenWrapper
            contentContainerStyle={ [
                styles.accountBackground,
                {
                    paddingLeft: space.md,
                    paddingRight: space.md,
                },
            ] }
            { ...rest }
        >{children}
        </ScreenWrapper>
    );
};

export const ErrorContainer = ( { children, ...rest } ) => {
    const { space } = useTheme();
    return <View style={ [ styles.errorContainer, { marginTop: space[ 2 ], marginBottom: space[ 2 ] } ] } { ...rest }>{children}</View>;
};

export const Title = ( { children, ...rest } ) => <Text { ...rest }>{children}</Text>;

export const AuthButton = ( { children, ...rest } ) => {
    const { space } = useTheme();
    return (
        <Button
            labelStyle={ {
                lineHeight: 35,
            } }
            style={ [ styles.authButton ] }
            { ...rest }
        >{children}
        </Button>
    );
};

export const GoogleStyledButton = ( { children, ...rest } ) => (
    <Button
        labelStyle={ {
            lineHeight: 35,
            fontWeight: 'bold',
            fontSize: 18,
        } }
        icon="google"
        mode="outlined"
        v
        uppercase={ false }
        color="#4285f4"
        style={ [ styles.googleButton ] }
        { ...rest }
    >{children}
    </Button>
);

export const FacebookAuthButton = ( { children, ...rest } ) => {
    const { space } = useTheme();
    return (
        <Button
            labelStyle={ {
                lineHeight: 35,
                fontWeight: 'bold',
                fontSize: 18,

            } }
            uppercase={ false }
            icon={ { source: 'facebook', direction: 'ltr' } }
            // icon={"facebook"}
            color="#416BC1"
            style={ [ styles.facebookButton ] }
            { ...rest }
        >{children}
        </Button>
    );
};

export const LinkButton = ( { children, ...rest } ) => {
    const { space } = useTheme();
    return (
        <Text
            labelStyle={ {
                lineHeight: 35,
            } }
            style={ [ styles.authButton ] }
            { ...rest }
        >{children}
        </Text>
    );
};

export const AuthInput = ( { children, ...rest } ) => (
    <TextInput
        // mode="outlined"
        style={ styles.authInput }
        { ...rest }
    >{children}
    </TextInput>
);

const styles = StyleSheet.create( {
    authButton: {
        color: colors.brand.primary,
    },
    googleButton: {
        // color: '#757575'
    },
    facebookButton: {
        // color: '#F5F5F5'
    },
    errorContainer: {
        maxWidth: 300,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 8,
        marginBottom: 8,
    },
    authInput: {
        // width: 300
    },
    accountContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        // padding: 16,
        // marginTop: 8
    },
    accountCover: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    accountBackground: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: StatusBar.currentHeight,

    },
    wrapper: {
        // flex: 1,
        height: '100%',
        backgroundColor: 'green',
    },
} );

// export const AuthButton = styled(Button)

//     .attrs({
//     color: colors.brand.primary,
// });
// `padding: ${(props) => props.theme.space[2]}`;

// export const AuthButton = () => {
//     let theme = useTheme();
//     return styled(Button).attrs({
//         color: colors.brand.primary,
//     })`
//   padding: ${theme.space[2]};
// `
// }

//
// export const AuthInput = styled(TextInput)`
//   width: 300px;
// `;
//
// export const Title = styled(Text)`
//   font-size: 30px;
// `;
//
// export const ErrorContainer = styled(View)`
//   max-width: 300px;
//   align-items: center;
//   align-self: center;
//   margin-top: ${(props) => props.theme.space[2]};
//   margin-bottom: ${(props) => props.theme.space[2]};
// `;
