import React, { useContext } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
// eslint-disable-next-line import/named
import { GoogleStyledButton } from '../../Account/components/Account.styles';
import AxiosInstance from '../../utils/axiosInstance';
import { storeData } from '../../utils/helperFunctions';
import { BEARER_TOKEN } from '../../utils/constants';
import { AuthenticationContext } from '../../services/AuthenticationContext';

const GoogleAuthButton = () => {
    const { setUser, setIsLoading } = useContext( AuthenticationContext );
    const [ request, response, promptAsync ] = Google.useAuthRequest( {
        expoClientId: Constants.manifest.extra.GOOGLE_API_KEY,
    } );

    React.useEffect( () => {
        if ( response?.type === 'success' ) {
            const accessToken = JSON.parse( JSON.stringify( response ) );
            const googleToken = accessToken.authentication.accessToken;
            if ( accessToken ) {
                AxiosInstance.post( '/check_auth', { token: googleToken } ).then( async( userResponse ) => {
                    setUser( userResponse.data.user );
                    await storeData( BEARER_TOKEN, userResponse.data.token );
                } );
            }

            setIsLoading( 'false' );
        }
    }, [ response ] );

    return (
        <GoogleStyledButton
            disabled={ !request }
            title="Login"
            onPress={ () => {
                promptAsync();
            } }
        >
            Sign in with Google
        </GoogleStyledButton>
    );
};

export default GoogleAuthButton;
