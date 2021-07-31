import React,{ Fragment } from 'react';
import { ImageBackground, View, StyleSheet } from 'react-native';
import { withTheme, Button, TextInput,useTheme } from 'react-native-paper';
// import styled from 'styled-components/native';
import { colors } from '../../infrastructure/theme/colors';
import { CustomText as Text } from '../../components/CustomText/CustomText';


// export const AccountBackground = styled(ImageBackground).attrs({
//     source: require('../../../assets/images/splash.png'),
// })`
//   flex: 1;
//   align-items: center;
//   justify-content: center;
// `;
//
// export const AccountCover = styled(View)`
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(255, 255, 255, 0.3);
// `;
//
// export const AccountContainer = styled(View)`
//   background-color: rgba(255, 255, 255, 0.5);
//   // padding: ${(props) => props.theme.space[4]};
//   // margin-top: ${(props) => props.theme.space[2]};
// `;



// export const AuthButton = styled(Button)
//     .attrs({
//     color: colors.brand.primary,
// })`
//   padding: 24px;
// `;
//
// export const MyComponent(props) {
//     const { theme } = props;
//     return <Text style={[styles.authButton, { padding: theme.space[2] }]}>Yo!</Text>;
// }

// export const AuthButton = ()=> withTheme((props)=> {
//     const { theme } = props;
//     return <Button style={[styles.authButton, { padding: theme.space[2] }]}>Yo!</Button>;
// })

// function AuthButton(props) {
//     // const { theme } = props;
//     return <Button style={ styles.authButton }>Yo!</Button>;
// }

export const AuthButton = () => {
    let theme = useTheme();
    console.log(theme.space[2])
    return <Button style={
        [ styles.authButton , { padding: `${theme.space[2]}` } ]
    }>Yo!</Button>;

}


const styles = StyleSheet.create({
    authButton: {
        color: colors.brand.primary,
    },
})


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
