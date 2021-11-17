import * as React from 'react';
import {
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  IconButton,
  HStack,
  Divider,
  Flex,
  Stack,
  View,
  ScrollView,
  Pressable,
  Popover,
  Center,
  PresenceTransition,
} from 'native-base';
import {COLOR} from '../../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';

import ScanScreen from '../Device';
import RegisterComponent from './RegisterComponent';
import {Styles} from '../../Styles/Register';
import DeviceRegister from './DeviceRegister';
import {connect} from 'react-redux';
import UserVerification from './UserVerification';

function Register({goToLogin, isOtpSent}) {
  const [validDevice, setDeviceValidity] = React.useState({
    valid: null,
    device_id: null,
  });
  const [otpSent, setOtpStatus] = React.useState({
    sent: null,
    userDetails: null,
  });

  return (
    <View>
      {validDevice.valid ? (
        otpSent.sent ? (
          <UserVerification
            goToLogin={() => goToLogin()}
            email={otpSent.userDetails && otpSent.userDetails.email}
          />
        ) : (
          <RegisterComponent
            registerSuccess={userDetails =>
              setOtpStatus({sent: true, userDetails: userDetails})
            }
            device_id={validDevice.device_id}
          />
        )
      ) : (
        <DeviceRegister
          next={device_id =>
            setDeviceValidity({valid: true, device_id: device_id})
          }
        />
      )}
    </View>
  );
}

const mapStateToProps = ({auth}) => ({
  isDeviceVerified: auth.isDeviceVerified,
  isAuthenticated: auth.isAuthenticated,
  isOtpSent: auth.isOtpSent,
});

export default connect(mapStateToProps, null)(Register);
