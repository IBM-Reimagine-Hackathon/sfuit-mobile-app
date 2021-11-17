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
import AxiosInstance from '../../Axios';
import {verifyUser} from '../../actions/Auth';
import {connect} from 'react-redux';

function UserVerification({goToLogin, user, email}) {
  const [loading, setLoading] = React.useState(null);
  const [otp, setOtp] = React.useState(null);

  const Submit = () => {
    console.log('user', user.email);
    AxiosInstance.post('/verification', {email: email, otp: otp}).then(resp => {
      if (resp.status === 200) {
        goToLogin();
      }
    });
  };

  return (
    <PresenceTransition
      visible={true}
      initial={{
        opacity: 1,
        scale: 0,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: {
          duration: 500,
        },
      }}>
      <Heading mt="5" size="2xl" color={COLOR}>
        User Verification
      </Heading>
      <Heading mt="5" style={{color: COLOR}} fontWeight="medium" size="lg">
        Enter OTP to Join
      </Heading>

      <VStack space={3} mt="15">
        <FormControl>
          <Stack space="2" alignItems="center">
            <HStack
              borderColor="#9A9191"
              shadow="1"
              borderRadius="xs"
              space="2"
              alignItems="center">
              <Input
                placeholder="OTP"
                style={Styles.email}
                width="100%"
                isRequired
                height="60"
                type="text"
                onChangeText={text => setOtp(text)}
                InputLeftElement={
                  <Icon
                    style={Styles.emailIcon}
                    name="code"
                    size={20}
                    color="#CACACA"
                  />
                }
              />
            </HStack>
          </Stack>
        </FormControl>
        <Button
          style={Styles.LoginBtn}
          mt="2"
          color={'emerald.500'}
          isLoading={loading}
          isLoadingText="Please Wait"
          onPress={() => Submit()}
          _text={{color: 'white'}}>
          Verify
        </Button>
      </VStack>
    </PresenceTransition>
  );
}
const mapStateToProps = ({auth}) => ({
  user: auth.user,
});
export default connect(mapStateToProps, {verifyUser})(UserVerification);
