import React, {useState} from 'react';
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
import Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Styles} from '../../Styles/Register';
import {COLOR} from '../../constants';
import {connect} from 'react-redux';
import {register} from '../../actions/Auth';
import AxiosInstance from '../../Axios';

function RegisterComponent({device_id, registerSuccess}) {
  const [otpSent, setOTPResult] = React.useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [date, setDate] = React.useState(new Date().toLocaleDateString());
  const [showDate, setShowDate] = React.useState(null);
  const [loading, setLoading] = useState(null);
  console.log('user', device_id);

  const Submit = () => {
    setLoading(true);
    userDetails &&
      userDetails.password === userDetails.confirm_password &&
      AxiosInstance.post('/register', {
        email: userDetails.email,
        dob: date,
        name: userDetails.name,
        device_id: device_id,
        password: userDetails.password,
        phone: userDetails.phone,
      }).then(resp => {
        if (resp.status === 200) {
          registerSuccess(userDetails);
        }
      });
  };
  return (
    <ScrollView>
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
          Join
        </Heading>
        <Heading mt="5" style={{color: COLOR}} fontWeight="medium" size="lg">
          Join us in our journey
        </Heading>
        {/* <ScanScreen /> */}

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
                  placeholder="Name"
                  style={Styles.email}
                  width="100%"
                  isRequired
                  height="60"
                  type="text"
                  onChangeText={text =>
                    setUserDetails({...userDetails, name: text})
                  }
                  InputLeftElement={
                    <Icon
                      style={Styles.emailIcon}
                      name="user"
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
                  placeholder="Email"
                  style={Styles.email}
                  width="100%"
                  height="60"
                  isRequired
                  onChangeText={text =>
                    setUserDetails({...userDetails, email: text})
                  }
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
                  onChangeText={text =>
                    setUserDetails({...userDetails, password: text})
                  }
                  type="password"
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

              <HStack
                borderColor="#9A9191"
                shadow="1"
                borderRadius="xs"
                space="2"
                alignItems="center">
                <Input
                  placeholder="Confirm Password"
                  style={Styles.email}
                  width="100%"
                  isRequired
                  height="60"
                  type="password"
                  onChangeText={text =>
                    setUserDetails({...userDetails, confirm_password: text})
                  }
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
              <HStack
                borderColor="#9A9191"
                shadow="1"
                borderRadius="xs"
                space="2"
                alignItems="center">
                <Input
                  placeholder="Phone Starting from 9xx,8xx,7xx"
                  style={Styles.email}
                  width="100%"
                  isRequired
                  height="60"
                  onChangeText={text =>
                    setUserDetails({...userDetails, phone: text})
                  }
                  type="text"
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
              <HStack
                borderColor="#9A9191"
                shadow="1"
                borderRadius="xs"
                space="2"
                alignItems="center">
                <Input
                  placeholder="Device ID"
                  style={Styles.email}
                  value={device_id}
                  isReadOnly={true}
                  width="100%"
                  isRequired
                  height="60"
                  type="text"
                  InputLeftElement={
                    <Icon
                      style={Styles.emailIcon}
                      name="robot"
                      size={20}
                      color="#CACACA"
                    />
                  }
                />
              </HStack>
              <Pressable
                onPress={() => {
                  setShowDate(true);
                }}
                borderColor="#9A9191"
                shadow="1"
                borderRadius="xs"
                space="2"
                alignItems="center">
                <Input
                  placeholder=" DOB"
                  style={Styles.email}
                  width="100%"
                  isRequired
                  type="text"
                  height="60"
                  isReadOnly={true}
                  value={date}
                  InputLeftElement={
                    <Icon
                      style={Styles.emailIcon}
                      name="calendar-week"
                      size={20}
                      color="#CACACA"
                    />
                  }
                />
                {/* {date ? (
                  <Text>Date</Text>
                ) : (
                  <Button mt="2" color={'emerald.500'} _text={{color: 'white'}}>
                    DOB
                  </Button>
                )} */}
              </Pressable>
              {showDate && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date()}
                  mode={'date'}
                  is24Hour={true}
                  display="default"
                  onChange={(event, selectedDate) => {
                    console.log('SEL DATE', {selectedDate});
                    if (selectedDate) {
                      setDate(new Date(selectedDate).toLocaleDateString());
                      setShowDate(null);
                    }
                  }}
                />
              )}
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
            Register
          </Button>
        </VStack>
      </PresenceTransition>
    </ScrollView>
  );
}

export default RegisterComponent;
