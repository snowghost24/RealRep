export { default } from './Index';
// import { I18nManager, Platform , StyleSheet} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Updates } from 'expo';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { StatusBar } from 'expo-status-bar';
// import { InitialState, NavigationContainer } from '@react-navigation/native';

// import {
//   Provider as PaperProvider,
//   DarkTheme,
//   DefaultTheme,
// } from 'react-native-paper';
// import Navigator from './routes/homeStack';
// import DrawerItems from './routes/screens/DrawerItems';
// import Header from './src/Header';
// import Drawer from './src/Drawer';
// // import App from './RootNavigator';
// import { useKeepAwake } from 'expo-keep-awake';
// // import { InitialState, NavigationContainer } from '@react-navigation/native';



// // press command D on the simulator to reload/debug and view menu


// const theme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     // primary: 'tomato',
//     // accent: 'yellow',
//   },
// };

// const PERSISTENCE_KEY = 'NAVIGATION_STATE';
// const PREFERENCES_KEY = 'APP_PREFERENCES';

// const CustomDarkTheme = {
//   ...DarkTheme,
//   colors: {
//     ...DarkTheme.colors,
//     customColor: '#BADA55',
//   },
//   fonts: {
//     ...DarkTheme.fonts,
//     superLight: { ...DarkTheme.fonts['light'] },
//   },
//   userDefinedThemeProperty: '',
//   animation: {
//     ...DarkTheme.animation,
//     customProperty: 1,
//   },
// };

// const CustomDefaultTheme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     customColor: '#BADA55',
//   },
//   fonts: {
//     ...DefaultTheme.fonts,
//     superLight: { ...DefaultTheme.fonts['light'] },
//   },
//   userDefinedThemeProperty: '',
//   animation: {
//     ...DefaultTheme.animation,
//     customProperty: 1,
//   },
// };

// const PreferencesContext = React.createContext(null);

// const DrawerContent = () => {
//   return (
  
//         <DrawerItems
//           toggleTheme={preferences.toggleTheme}
//           toggleRTL={preferences.toggleRtl}
//           isRTL={preferences.rtl}
//           isDarkTheme={preferences.theme.dark}
//         />

//   );
// };

// const DrawerNav = createDrawerNavigator();

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }


// function PaperExample() {

//   useKeepAwake();

//   const [isReady, setIsReady] = React.useState(false);
//   const [initialState, setInitialState] = React.useState();

//   const [theme, setTheme] = React.useState(
//     CustomDefaultTheme
//   );

//   const [rtl, setRtl] = React.useState(I18nManager.isRTL);

//   React.useEffect(() => {
//     const restoreState = async () => {
//       try {
//         // const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
//         const savedStateString = '';
//         const state = JSON.parse(savedStateString || '');

//         setInitialState(state);
//       } catch (e) {
//         // ignore error
//       } finally {
//         setIsReady(true);
//       }
//     };

//     if (!isReady) {
//       restoreState();
//     }
//   }, [isReady]);

//   React.useEffect(() => {
//     const restorePrefs = async () => {
//       try {
//         // const prefString = await AsyncStorage.getItem(PREFERENCES_KEY);
//         const prefString = '';
//         const preferences = JSON.parse(prefString || '');

//         if (preferences) {
//           // eslint-disable-next-line react/no-did-mount-set-state
//           setTheme(
//             preferences.theme === 'dark' ? CustomDarkTheme : CustomDefaultTheme
//           );

//           if (typeof preferences.rtl === 'boolean') {
//             setRtl(preferences.rtl);
//           }
//         }
//       } catch (e) {
//         // ignore error
//       }
//     };

//     restorePrefs();
//   }, []);


//   React.useEffect(() => {
//     const savePrefs = async () => {
//       try {
//         await AsyncStorage.setItem(
//           PREFERENCES_KEY,
//           JSON.stringify({
//             theme: theme === DarkTheme ? 'dark' : 'light',
//             rtl,
//           })
//         );
//       } catch (e) {
//         // ignore error
//       }

//       if (I18nManager.isRTL !== rtl) {
//         I18nManager.forceRTL(rtl);
//         Updates.reloadFromCache();
//       }
//     };

//     savePrefs();
//   }, [rtl, theme]);

//   const preferences = React.useMemo(
//     () => ({
//       toggleTheme: () =>
//         setTheme((theme) =>
//           theme === CustomDefaultTheme ? CustomDarkTheme : CustomDefaultTheme
//         ),
//       toggleRtl: () => setRtl((rtl) => !rtl),
//       rtl,
//       theme,
//     }),
//     [rtl, theme]
//   );

//   if (!isReady) {
//     return null;
//   }




//   console.log("what do we have here");
// function handlePress (){
//   console.log("i have been pressed")
// }
//   return (
//     <PaperProvider theme={theme}>
//     <SafeAreaProvider>
//       <PreferencesContext.Provider value={preferences}>
//         <React.Fragment>
//           <NavigationContainer
//             initialState={initialState}
//             onStateChange={(state) =>
//               AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
//             }
//           >
//             {Platform.OS === 'web' ? (
//               <HomeScreen />
//             ) : (
//               <Drawer.Navigator drawerContent={() => <DrawerContent />}>
//                 <Drawer.Screen name="Home" component={HomeScreen} />
//               </Drawer.Navigator>
//             )}
//             <StatusBar style="light" />
//           </NavigationContainer>
//         </React.Fragment>
//       </PreferencesContext.Provider>
//     </SafeAreaProvider>
//   </PaperProvider>
//     // <PaperProvider theme={theme}>
//     //    <SafeAreaProvider>
//     //    <Navigator />
//     //    </SafeAreaProvider>
     
//     // {/* <SafeAreaView style={styles.container}> */}
//     //   {/* <Drawer />
//     //   <Header/>
//     //   <Text onPress={handlePress}>Babe check me outt</Text>
//     //   <TouchableOpacity>
//     //   <Image source={{ 
//     //     width:200,
//     //     height:300,
//     //     uri:'https://picsum.photos/200/300'
//     //   }}/>
//     //   </TouchableOpacity>
//     //   <Button 
//     //   title='click me'
//     //   onPress={
//     //     ()=> Alert.alert(
//     //       'What is do', 
//     //       'what does it do', 
//     //       [ 
//     //         { text:'yes' },
//     //         { text:'no' }
//     //       ]
//     //     )
//     //   } />
//     //   <StatusBar style="auto" /> */}
//     // {/* </SafeAreaView> */}
//     // </PaperProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'pink',
//     // alignItems: 'center',
//     // justifyContent: 'center',
//   },
// });

// export default PaperExample;
