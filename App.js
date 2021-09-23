// export { default } from './src/Index';
import * as React from 'react';
import { I18nManager, Platform , StyleSheet, View, Text, f} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Updates } from 'expo';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Pusher from 'pusher-js/react-native';
import { StatusBar } from 'expo-status-bar';
import { InitialState, NavigationContainer, configureFonts } from '@react-navigation/native';
import AppNavContainer from "./src/infrastructure/navigators";
import { theme } from "./src/infrastructure/theme";
import { PreferencesContext } from "./src/services/PreferencesContext";
import { PERSISTENCE_KEY, PREFERENCES_KEY } from "./src/utils/constants";


// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

const pusher = new Pusher('86f6efe6e6310549081e', {
    cluster: 'us2'
});

const channel = pusher.subscribe('my-channel');
channel.bind('my-event', function(data) {
    alert(JSON.stringify(data));
});

import {
    Provider as PaperProvider,
    DarkTheme,
    DefaultTheme,
} from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';
import { AuthenticationContextProvider } from "./src/services/AuthenticationContext";

const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        customColor: '#BADA55',
        ...theme.colors
    },
    fonts: {
        ...DarkTheme.fonts,
        superLight: { ...DarkTheme.fonts['light'] },
        ...theme.fonts

    },
    userDefinedThemeProperty: '',
    animation: {
        ...DarkTheme.animation,
        customProperty: 1,
    },


};

const CustomDefaultTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        customColor: '#BADA55',
    },
    fonts: {
        ...DefaultTheme.fonts,
        superLight: { ...DefaultTheme.fonts['light'] },
        ...theme.fonts
    },
    userDefinedThemeProperty: '',
    animation: {
        ...DefaultTheme.animation,
        customProperty: 1,
    },
    space: [0,4,8,16,32,64]
};


function App() {
    useKeepAwake();
    const [isReady, setIsReady] = React.useState(false);
    const [initialState, setInitialState] = React.useState();

    const [theme, setTheme] = React.useState(
        CustomDefaultTheme
    );

    const [rtl, setRtl] = React.useState(I18nManager.isRTL);

    React.useEffect(() => {
        const restoreState = async () => {
            try {
                const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
                // const savedStateString = '';
                const state = JSON.parse(savedStateString || '');

                setInitialState(state);
            } catch (e) {
                // ignore error
            } finally {
                setIsReady(true);
            }
        };

        if (!isReady) {
            restoreState();
        }
    }, [isReady]);

    React.useEffect(() => {
        const restorePrefs = async () => {
            try {
                // const prefString = await AsyncStorage.getItem(PREFERENCES_KEY);
                const prefString = '';
                const preferences = JSON.parse(prefString || '');

                if (preferences) {
                    // eslint-disable-next-line react/no-did-mount-set-state
                    setTheme(
                        preferences.theme === 'dark' ? CustomDarkTheme : CustomDefaultTheme
                    );

                    if (typeof preferences.rtl === 'boolean') {
                        setRtl(preferences.rtl);
                    }
                }
            } catch (e) {
                // ignore error
            }
        };

        restorePrefs();
    }, []);


    React.useEffect(() => {
        const savePrefs = async () => {
            try {
                await AsyncStorage.setItem(
                    PREFERENCES_KEY,
                    JSON.stringify({
                        theme: theme === DarkTheme ? 'dark' : 'light',
                        rtl,
                    })
                );
            } catch (e) {
                // ignore error
            }

            if (I18nManager.isRTL !== rtl) {
                I18nManager.forceRTL(rtl);
                Updates.reloadFromCache();
            }
        };

        savePrefs();
    }, [rtl, theme]);

    const preferences = React.useMemo(
        () => ({
            toggleTheme: () =>
                setTheme((theme) =>
                    theme === CustomDefaultTheme ? CustomDarkTheme : CustomDefaultTheme
                ),
            toggleRtl: () => setRtl((rtl) => !rtl),
            rtl,
            theme,
        }),
        [rtl, theme]
    );

    if (!isReady) {
        return null;
    }

    // const isAuthenticated = false;
    return (
        <PaperProvider theme={theme}>
            <SafeAreaProvider>
                <AuthenticationContextProvider>
                    <PreferencesContext.Provider value={preferences}>
                        <React.Fragment>
                            <AppNavContainer initialState={initialState} theme={theme} preferences={preferences} />
                        </React.Fragment>
                    </PreferencesContext.Provider>
                </AuthenticationContextProvider>
            </SafeAreaProvider>
        </PaperProvider>
    );
}

export default App;
