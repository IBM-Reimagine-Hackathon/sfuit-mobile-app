import Heart from './Assets/heart.png';
import Ecg from './Assets/ecg.png';
import Steps from './Assets/steps.png';
import Temperature from './Assets/temp.png';
import Oxygen from './Assets/oxygen.png';
import WifiManager from 'react-native-wifi-reborn';
import {DEVICE_NAME} from './constants';
import * as Mqtt from 'react-native-native-mqtt';
import Paho from 'paho-mqtt';
import io from 'socket.io-client';
const IOT = new Mqtt.Client(
  'tcp://dt9z6d.messaging.internetofthings.ibmcloud.com:8883',
);

const connectOptions = {
  port: 8883,
  host: 'dt9z6d.messaging.internetofthings.ibmcloud.com',
  rejectUnauthorized: false,
  protocol: 'mqtts',
  username: 'a-dt9z6d-rapiisy2hw',
  password: '@Ogv9GCKyBWmVYyBga',
  clientId: 'a:dt9z6d:frontend',
  ca: 'messaging.pem',
};

export class Util {
  static getSensorIcon = name => {
    switch (name) {
      case 'heart':
        return Heart;
      case 'ecg':
        return Ecg;
      case 'steps':
        return Steps;
      case 'temperature':
        return Temperature;
      case 'spo2':
        return Oxygen;
    }
  };
  static isDeviceNotConnectedToInternet = () => {
    return WifiManager.reScanAndLoadWifiList();
  };
  static ConnectIBMIot = () => {
    const socket = io('https://sfuit-data.herokuapp.com');
    return socket;
  };
}
