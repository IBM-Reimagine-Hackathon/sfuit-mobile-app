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
  View,
  Flex,
  Stack,
} from 'native-base';
import {COLOR} from '../constants';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import {login, setAuthState} from '../actions/Auth';
import {connect} from 'react-redux';
import AxiosInstance from '../Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginComponent({login, setAuthState, LoginSuccess}) {
  const [loading, setLoading] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  const Submit = async () => {
    setLoading(true);
    AxiosInstance.post('/login', {
      email: email,
      password: password,
    }).then(async resp => {
      if (resp && resp.status === 200) {
        await AsyncStorage.setItem('user', JSON.stringify(resp.data));
        LoginSuccess(resp.data.token);
      }
    });
  };
  React.useEffect(() => {
    // setAuthState({
    //   error: '',
    //   device_id: null,
    //   isDeviceVerified: null,
    //   isAuthenticated: null,
    //   token: null,
    //   user: null,
    //   isOtpSent: null,
    // });
  }, []);
  return (
    <View>
      <Heading mt="5" size="2xl" color={COLOR}>
        Enter
      </Heading>
      <Heading mt="5" style={{color: COLOR}} fontWeight="medium" size="lg">
        Login and start monitoring
      </Heading>

      <VStack space={3} mt="20">
        <FormControl>
          <Stack space="2" alignItems="center">
            <HStack
              borderColor="#9A9191"
              shadow="1"
              borderRadius="xs"
              space="2"
              alignItems="center">
              <Input
                placeholder="Email"
                style={Styles.email}
                width="100%"
                height="60"
                isRequired
                onChangeText={text => setEmail(text)}
                InputLeftElement={
                  <Icon
                    style={Styles.emailIcon}
                    name="envelope"
                    size={20}
                    color="#CACACA"
                  />
                }
              />
            </HStack>
            <HStack
              borderColor="#9A9191"
              shadow="1"
              borderRadius="xs"
              space="2"
              alignItems="center">
              <Input
                placeholder="Password"
                style={Styles.email}
                width="100%"
                isRequired
                height="60"
                type="password"
                onChangeText={text => setPassword(text)}
                InputLeftElement={
                  <Icon
                    style={Styles.emailIcon}
                    name="lock"
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
          LOGIN
        </Button>
      </VStack>
    </View>
  );
}
const Styles = StyleSheet.create({
  emailIcon: {
    left: 4,
  },
  email: {
    borderColor: '#9A9191',
    borderRadius: 15,
  },
  LoginBtn: {
    backgroundColor: COLOR,
    borderRadius: 25,
    width: 120,
    height: 50,
    shadowColor: COLOR,
    elevation: 15,
  },
});

export default connect(null, {login, setAuthState})(LoginComponent);
