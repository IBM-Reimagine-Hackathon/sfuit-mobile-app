import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Main from './src/Screens';
import PushNotification from 'react-native-push-notification';
import Login from './src/Screens/Login';
import {View} from 'react-native';
import RemotePushController from './src/services/RemotePushController';
import {extendTheme, NativeBaseProvider} from 'native-base';
import CustomDrawerContent from './src/Components/CustomDrawer';
import Notifications from './src/Screens/Notifications';
import DeviceConnect from './src/Screens/ConnectDevice';
import {Util} from './src/Util';
import {DEVICE_NAME} from './src/constants';
import {Provider} from 'react-redux';
import storeConfig from './src/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUser} from './src/actions/Auth';

// 2. Extend the theme to include custom colors, fonts, etc
const newColorTheme = {
  brand: {
    900: '#8287af',
    800: '#7c83db',
    700: '#b3bef6',
  },
};
const theme = extendTheme({colors: newColorTheme});

const Drawer = createDrawerNavigator();
function App() {
  const [token, setToken] = useState(null);
  const [goToLogin, setLogin] = useState(null);
  const [redirect, setRedirect] = useState(null);
  const [showConnectDevice, setConnectDevice] = useState(null);
  const store = storeConfig();
  useEffect(async () => {
    const _user = JSON.parse(await AsyncStorage.getItem('user'));
    _user && setToken(_user.token);
    Util.isDeviceNotConnectedToInternet().then(List => {
      List.map(Wifi => {
        if (Wifi.SSID.includes(DEVICE_NAME)) {
          setConnectDevice(true);
        }
      });
    });
    store.subscribe(() => {
      const _redirect = store.getState().auth.redirect;
      const _token = store.getState().auth.token;
      console.log('SUBS', _token);
      setLogin(_redirect);
      setToken(_token);
    });
  }, []);
  return (
    <NativeBaseProvider theme={theme}>
      <Provider store={store}>
        {token ? (
          <NavigationContainer>
            <Drawer.Navigator
              drawerContent={props => (
                <CustomDrawerContent
                  logOut={async () => {
                    await AsyncStorage.removeItem('user');
                    setToken(null);
                  }}
                  {...props}
                />
              )}
              initialRouteName="Home">
              <Drawer.Screen name="Home" component={Main} />
              <Drawer.Screen name="Notifications" component={Notifications} />
              {showConnectDevice && (
                <Drawer.Screen name="Device SetUp" component={DeviceConnect} />
              )}
            </Drawer.Navigator>
          </NavigationContainer>
        ) : (
          <Login setLogin={Token => setToken(Token)} />
        )}
        <RemotePushController />
      </Provider>
    </NativeBaseProvider>
  );
}

export default App;
