import * as React from 'react';
import { StyleSheet, View,Text, KeyboardAvoidingView, Platform,  } from 'react-native';
import { TextInput, HelperText, useTheme } from 'react-native-paper';
// import { Container, Content, Form, Input, Label, Item } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { inputReducer, State } from './utils/index';
import ScreenWrapper from './ScreenWrapper';

const MAX_LENGTH = 20;

const initialState: State = {
    name: '',
    flatTextPassword: '',
    flatTextSecureEntry: true,
};



const TextInputAvoidingView = ({ children }) => {
    return Platform.OS === 'ios' ? (
        <KeyboardAvoidingView
            style={styles.wrapper}
            behavior="padding"
            keyboardVerticalOffset={80}
        >
            {children}
        </KeyboardAvoidingView>
    ) : (
        <>{children}</>
    );
};

const Login = () => {
    const [state, dispatch] = React.useReducer(inputReducer, initialState);
    const {
        name,
        flatTextPassword,
        flatTextSecureEntry,

        // iconsColor: {
        //     flatLeftIcon,
        //     flatRightIcon,
        //     outlineLeftIcon,
        //     outlineRightIcon,
        //     customIcon,
        // },
    } = state;

    const _isUsernameValid = (name: string) => /^[a-zA-Z]*$/.test(name);
    const _isPasswordValid = (flatTextPassword: string) => /^[a-zA-Z]*$/.test(flatTextPassword);

    // const {
    //     colors: { accent, primary },
    // } = useTheme();

    const inputActionHandler = (type, payload) =>
        dispatch({
            type: type,
            payload: payload,
        });

    // const changeIconColor = (name ) => {
    //     const color = state.iconsColor[name];
    //
    //     const colors = {
    //         ...state.iconsColor,
    //         [name]: !color ? accent : undefined,
    //     };
    //
    //     dispatch({
    //         type: 'iconsColor',
    //         payload: colors,
    //     });
    // };

    return (
        <TextInputAvoidingView>
            <ScreenWrapper
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps={'always'}
                removeClippedSubviews={false}
            >
                    <View style={styles.inputContainerStyle}>
                    <TextInput
                        label="Username"
                        placeholder="Enter username, only letters"
                        value={name}
                        error={!_isUsernameValid(name)}
                        onChangeText={(name) => inputActionHandler('name', name)}
                    />
                    <HelperText type="error" visible={!_isUsernameValid(name)}>
                        Error: Only letters are allowed
                    </HelperText>
                </View>
                <View style={styles.inputContainerStyle}>
                <TextInput
                    label="Password"
                    placeholder="Enter Password"
                    value={flatTextPassword}
                    error={!_isPasswordValid(flatTextPassword)}
                    onChangeText={(flatTextPassword) =>
                        inputActionHandler('flatTextPassword', flatTextPassword)
                    }
                    secureTextEntry={flatTextSecureEntry}
                    right={
                        <TextInput.Icon
                            name={flatTextSecureEntry ? 'eye' : 'eye-off'}
                            onPress={() =>
                                dispatch({
                                    type: 'flatTextSecureEntry',
                                    payload: !flatTextSecureEntry,
                                })
                            }
                            forceTextInputFocus={false}
                        />
                    }
                />
                    <HelperText type="error" visible={!_isPasswordValid(flatTextPassword)}>
                        Error: Only letters are allowed
                    </HelperText>
                </View>
         </ScreenWrapper>
        </TextInputAvoidingView>
    );
};

Login.title = 'TextInput';

const styles = StyleSheet.create({
    container: {
        padding: 8,
        flex:1,
        justifyContent: 'center',
    },
    helpersWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    wrapper: {
        flex: 1,
    },
    helper: {
        flexShrink: 1,
    },
    counterHelper: {
        textAlign: 'right',
    },
    inputContainerStyle: {
        // margin: 8,
        // height: 50,
    },
    fontSize: {
        fontSize: 32,
    },
    textArea: {
        height: 80,
    },
});

export default Login;
