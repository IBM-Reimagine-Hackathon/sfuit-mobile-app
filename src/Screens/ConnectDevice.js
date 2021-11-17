import React, {useEffect, useState} from 'react';
import {BleManager} from 'react-native-ble-plx';
import WifiManager from 'react-native-wifi-reborn';
import {
  NativeBaseProvider,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Icon,
  IconButton,
  HStack,
  Divider,
  Select,
  CheckIcon,
  View,
  Pressable,
} from 'native-base';
import axios from 'axios';
import {Alert} from 'react-native';
const DeviceConnect = ({navigation}) => {
  const [wifi, setWifi] = useState(null);
  const [wifiList, setWifiList] = useState([]);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(null);
  const Bluetooth = new BleManager();
  const onSubmit = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('ssid', wifi);
    formData.append('password', password);
    axios.post('http://192.168.4.1', formData).then(resp => {
      console.log('resp', resp);
      setLoading(null);
      if (resp.status === 200) {
        navigation.navigate('Home');
      }
    });
  };
  useEffect(() => {
    WifiManager.reScanAndLoadWifiList().then(list => {
      setWifiList(list);
    });
    WifiManager.getCurrentWifiSSID().then(
      ssid => {
        console.log('Your current connected wifi SSID is ' + ssid);
      },
      () => {
        console.log('Cannot get current SSID!');
      },
    );
  }, []);

  //   const scanAndConnect = () => {
  //     Bluetooth.startDeviceScan(null, null, (error, device) => {
  //       console.log('Scanning...');
  //       //   console.log(device);
  //       console.log(device.id, 'Name', device.name);
  //       if (error) {
  //         console.log('ERROR', error.message);
  //         return;
  //       }
  //     });
  //   };
  return (
    <Box safeArea flex={1} p="2" py="8" w="90%" mx="auto">
      <Heading size="lg" fontWeight="600" color="coolGray.800">
        Welcome
      </Heading>
      <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
        Enter Wifi Credentials
      </Heading>

      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label
            _text={{
              color: 'coolGray.800',
              fontSize: 'xs',
              fontWeight: 500,
            }}>
            Wifi SSID
          </FormControl.Label>
          <Select
            selectedValue={wifi}
            minWidth="200"
            accessibilityLabel="Choose Service"
            placeholder="Choose WIFI"
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={itemValue => setWifi(itemValue)}>
            {wifiList.map(wifi => (
              <Select.Item label={wifi.SSID} value={wifi.SSID} />
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormControl.Label
            _text={{
              color: 'coolGray.800',
              fontSize: 'xs',
              fontWeight: 500,
            }}>
            WIFI Password
          </FormControl.Label>
          <Input onChangeText={text => setPassword(text)} type="password" />
        </FormControl>
        <Button
          isLoading={loading}
          isLoadingText={'Connecting...'}
          onPress={() => onSubmit()}
          mt="2"
          colorScheme="indigo"
          _text={{color: 'white'}}>
          Submit
        </Button>
      </VStack>
    </Box>
  );
};

export default DeviceConnect;
