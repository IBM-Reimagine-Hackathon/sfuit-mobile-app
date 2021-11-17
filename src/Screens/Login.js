import React, {useEffect, useState} from 'react';
import {MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';
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
  IconButton,
  HStack,
  Divider,
  Flex,
  Stack,
} from 'native-base';
import {COLOR} from '../constants';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LoginComponent from '../Components/Login';
import RegisterComponent from '../Components/Register/index';
import {connect} from 'react-redux';
import AxiosInstance from '../Axios';

function App({user, setLogin}) {
  const [authType, setAuthType] = useState('LOGIN');
  useEffect(() => {
    // user && setLogin(user.token);

    console.log('USER', user);
  }, [user]);
  return (
    <Box safeArea flex={1} p="2" py="8" w="90%" mx="auto">
      {authType === 'LOGIN' ? (
        <LoginComponent LoginSuccess={Token => setLogin(Token)} />
      ) : (
        <RegisterComponent goToLogin={() => setAuthType('LOGIN')} />
      )}
      <HStack mt="6" justifyContent="center">
        <Text fontSize="sm" color="muted.700" fontWeight={400}>
          {authType === 'LOGIN' ? "I'm a new user." : 'Already Registered.'}{' '}
        </Text>
        <Link
          _text={{
            color: COLOR,
            fontWeight: 'medium',
            fontSize: 'sm',
          }}
          onTouchStart={() =>
            setAuthType(authType === 'LOGIN' ? null : 'LOGIN')
          }>
          {authType === 'LOGIN' ? 'Sign Up' : 'Log In'}
        </Link>
      </HStack>
    </Box>
  );
}

const mapStateToProps = ({auth}) => ({
  user: auth.user,
});

export default connect(mapStateToProps, null)(App);

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
