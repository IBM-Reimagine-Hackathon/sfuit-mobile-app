import React, {useEffect, useState} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  Avatar,
  Badge,
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
} from 'native-base';
import {connect} from 'react-redux';
import {COLOR} from '../constants';
import {getUser, setAuthState, logout} from '../actions/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CustomDrawerContent(props) {
  const [_user, setUser] = useState(null);

  useEffect(async () => {
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    setUser(user);
  }, []);
  const getName = name => {
    return name.split(' ')[1]
      ? `${name.split(' ')[0].charAt(0)} ${name.split(' ')[1].charAt(0)}`
      : name.split(' ')[0].charAt(0);
  };
  const getAge = dateString => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  return (
    <DrawerContentScrollView {...props}>
      <Box style={{marginTop: 15}} position="relative" top={0}>
        <Center flex={1} px="3">
          <Avatar bg="lightBlue.400">
            {_user && getName(_user && _user.name)}
            <Avatar.Badge bg="green.500" />
          </Avatar>
          <Center>
            <Text fontSize="xl">{_user && _user.name}</Text>
          </Center>
          <Divider />
          <Center>
            {_user && <Text fontSize="xl">Age:{getAge(_user.dob)}</Text>}
          </Center>
        </Center>
      </Box>
      {/* <Center>
        <Text fontSize="xl">Device ID</Text>
      </Center> */}
      {_user && (
        <Center>
          <Badge borderRadius="xl" colorScheme="#fff">
            <Text fontSize="xl">{_user.device_id}</Text>
          </Badge>
        </Center>
      )}
      <DrawerItemList {...props} />

      <DrawerItem label="Log Out" onPress={() => props.logOut()} />
    </DrawerContentScrollView>
  );
}
const mapStateToProps = ({auth}) => ({
  user: auth.user,
});
export default connect(mapStateToProps, {setAuthState, getUser, logout})(
  CustomDrawerContent,
);
