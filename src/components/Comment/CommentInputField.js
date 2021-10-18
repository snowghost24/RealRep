import React, { Component, PropTypes, useState } from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    Text,
    View, TouchableOpacity,
} from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import { ScreenWrapperStyled } from '../../Account/components/Account.styles';
import UserIconButton, { UserIcon } from '../Icons/UserIconButton';

const styles = StyleSheet.create( {
    container: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#EEE',
        alignItems: 'flex-end',
        paddingLeft: 15,
    },
    input: {
        flex: 1,
        marginLeft: 4,
        paddingBottom: 10,
        paddingTop: 16,
        minHeight: 50,
        fontSize: 16,
    },
    button: {
        height: 40,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inactive: {
        color: '#CCC',
    },
    text: {
        // color: '#3F51B5',
        // fontWeight: 'bold',
        // fontFamily: 'Avenir',
        textAlign: 'center',
        fontSize: 17,
    },
    icon: {
        paddingRight: 6,
        marginRight: 8,
        marginBottom: 8,
        marginTop: 8,
    },
} );

const CommentInputField = ( { postComment } ) => {
    const {
        colors: { primary },
    } = useTheme();
    const [ text, onChangeText ] = React.useState( '' );
    const submit = () => {
        postComment( text ).then( () => {
            onChangeText( '' );
        } );
        console.log( 'its been submited', postComment );
    };

    const handleClick = () => {

    };
    return (
        <KeyboardAvoidingView
            behavior="position"
            style={ {
                position: 'absolute', left: 0, right: 0, bottom: 0,
            } }
            // style={{   flex: 1, alignContent: 'flex-end'}}
        >
            <View style={ styles.container }>
                {/* Comment input field */}
                <UserIcon
                    style={ styles.icon }

                />

                <TextInput
                    placeholder="Add a comment..."
                    keyboardType="twitter" // keyboard with no return button
                    autoFocus // focus and show the keyboard
                    style={ styles.input }
                    value={ text }
                    onChangeText={ onChangeText }
                    multiline
                    // onSubmitEditing={this.onSubmitEditing} // handle submit event
                />
                {/* Post button */}
                <IconButton
                    style={ { margin: 0 } }
                    icon="arrow-up-bold-circle"
                    color={ primary }
                    disabled={ !text }
                    // color={Colors.red500}
                    size={ 34 }
                    onPress={ () => submit() }
                />
                {/* <TouchableOpacity */}
                {/*    style={ styles.button } */}
                {/*    onPress={ submit } */}
                {/* > */}
                {/*    /!* Apply inactive style if no input *!/ */}
                {/*    <Text style={ [ styles.text, !text ? styles.inactive : [] ] }>Post</Text> */}
                {/* </TouchableOpacity> */}
            </View>
        </KeyboardAvoidingView>
    );
};

export default CommentInputField;

// export default class CommentInputField extends Component {
//
//     // static propTypes = {
//     //     onSubmit: PropTypes.func.isRequired,
//     // };
//
//     state = {
//         text: undefined, // user's input
//     };
//
//     // Update state when input changes
//     onChangeText = (text) => this.setState({ text });
//
//     // Handle return press on the keyboard
//     // NOTE: You don't really need it for this example, because
//     // we're using a keyboard without return button, but I left it here
//     // in case you'd want to switch to a different keyboard
//     onSubmitEditing = ({ nativeEvent: { text } }) => this.setState({ text }, this.submit);
//
//     // Call this.props.onSubmit handler and pass the comment
//     submit = () => {
//         const { text } = this.state;
//         if (text) {
//             this.setState({ text: undefined }, () => this.props.onSubmit(text));
//         } else {
//             alert('Please enter your comment first');
//         }
//     };
//
//     render() {
//         return (
//
//
//             <KeyboardAvoidingView
//                 behavior='position'
//                 style={{position: 'absolute', left: 0, right: 0, bottom: 0}}
//                 // style={{   flex: 1, alignContent: 'flex-end'}}
//             >
//                 <View style={styles.container}>
//                     {/* Comment input field */}
//                     <TextInput
//                         placeholder="Add a comment..."
//                         keyboardType="twitter" // keyboard with no return button
//                         autoFocus={true} // focus and show the keyboard
//                         style={styles.input}
//                         value={this.state.text}
//                         onChangeText={this.onChangeText} // handle input changes
//                         onSubmitEditing={this.onSubmitEditing} // handle submit event
//                     />
//                     {/* Post button */}
//                     <TouchableOpacity
//                         style={styles.button}
//                         onPress={this.submit}
//                     >
//                         {/* Apply inactive style if no input */}
//                         <Text style={[styles.text, !this.state.text ? styles.inactive : []]}>Post</Text>
//                     </TouchableOpacity>
//                 </View>
//             </KeyboardAvoidingView>
//         );
//     }
//
// }
