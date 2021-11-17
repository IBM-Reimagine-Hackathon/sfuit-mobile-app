import {Card, Flex} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import Sensor from '../Components/Card';
import {ScrollView, Box, Container} from 'native-base';
import {COLOR} from '../constants';
import {Util} from '../Util';
import {connect} from 'react-redux';
import {setAuthState} from '../actions/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Main = ({setAuthState}) => {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(async () => {
    const _User = JSON.parse(await AsyncStorage.getItem('user'));
    const IOT = Util.ConnectIBMIot();
    IOT.on(_User.device_id, message => {
      console.log('message', {message});
      setData(message.data);
    });
  }, []);
  return (
    <Box>
      <ScrollView>
        <Container>
          <Flex
            direction="column"
            mb="2.5"
            mt="2"
            m="2"
            _text={{
              color: 'coolGray.800',
            }}>
            <Sensor
              name={'Heart'}
              data={data ? data.Pulse.toString().split('.')[0] : 0}
              unit={'BPM'}
            />
            <Sensor
              name={'SPO2'}
              data={data ? data.SpO2.toString().split('.')[0] : 0}
              unit={'%'}
            />
            <Sensor
              name={'TEMPERATURE'}
              data={data ? data.temperature.toString().split('.')[0] : 0}
              unit={'°C'}
            />
            {/* <Sensor data={} unit={} /> */}
          </Flex>
          {/* <Center size="2xl" rounded="sm" m="10">
          <Sensor />
        </Center>
        <Center size="2xl" rounded="sm" m="0">
          <Sensor />
        </Center>
        <Divider /> */}
        </Container>
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

const mapStateToProps = ({auth}) => ({
  user: auth.user,
});

export default connect(mapStateToProps, {setAuthState})(Main);
