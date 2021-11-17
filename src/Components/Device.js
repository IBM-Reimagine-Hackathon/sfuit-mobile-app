import React, {Component, useEffect} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {
  Flex,
  Center,
  Heading,
  ScrollView,
  VStack,
  Divider,
  NativeBaseProvider,
  View,
  ZStack,
  Box,
} from 'native-base';
import {Styles} from '../Styles/Register';
import {COLOR} from '../constants';
import AxiosInstance from '../Axios';
import {verifyDevice} from '../actions/Auth';
import {connect} from 'react-redux';

const ScanScreen = ({setvalidDevice}) => {
  const onSuccess = e => {
    console.log('da', e.data);
    AxiosInstance.post('/verifyDevice', {
      device_id: e.data,
    })
      .then(resp => {
        if (resp && resp.status === 200) {
          setvalidDevice(e.data);
        }
        console.log('resp', resp);
      })
      .catch(err => console.error(err));
  };

  return (
    <Flex
      direction="column"
      top="20"
      _text={{
        color: 'coolGray.800',
      }}>
      <ZStack alignItems="center" justifyContent="center">
        <QRCodeScanner
          cameraStyle={{width: 350, height: 100}}
          onRead={onSuccess}
          topContent={
            <Text style={styles.centerText}>
              Scanning <Text style={styles.textBold}>Device ID</Text>
            </Text>
          }
        />
        <Box
          bg="primary.500"
          bottom="24"
          size="40"
          opacity="0.5"
          rounded="lg"
        />
      </ZStack>
    </Flex>
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  qrCode: {
    position: 'absolute',
    backgroundColor: COLOR,
    width: 100,
    height: 100,
    top: 10,
  },
});

export default connect(null, {verifyDevice})(ScanScreen);
