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

function DeviceRegister({next}) {
  return (
    <Center height="full">
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
          Verification
        </Heading>
        <Heading mt="5" style={{color: COLOR}} fontWeight="medium" size="lg">
          Verify Your Device
        </Heading>
        {/* <ScanScreen /> */}

        <VStack space={3} mt="15">
          <FormControl>
            <Stack space="2" alignItems="center">
              <Popover
                trapFocus={true}
                placement="top"
                trigger={triggerProps => {
                  return (
                    <Pressable
                      {...triggerProps}
                      borderColor="#9A9191"
                      shadow="1"
                      borderRadius="xs"
                      space="2"
                      width="80"
                      alignItems="center">
                      <Input
                        placeholder=" Device ID"
                        style={Styles.email}
                        width="100%"
                        isRequired
                        type="text"
                        height="60"
                        isReadOnly={true}
                        value={''}
                        InputLeftElement={
                          <Icon
                            style={Styles.emailIcon}
                            name="robot"
                            size={20}
                            color="#CACACA"
                          />
                        }
                      />
                    </Pressable>
                  );
                }}>
                <Popover.Content top="80" w="80" borderRadius="3xl">
                  {/* <Popover.CloseButton /> */}
                  <Center>
                    <Popover.Header>Scanning Device ID</Popover.Header>
                  </Center>
                  <Popover.Body>
                    <ScanScreen setvalidDevice={device_id => next(device_id)} />
                  </Popover.Body>
                  {/* <Popover.Footer justifyContent="flex-end">
                    <Button.Group space={2}>
                      <Button colorScheme="coolGray" variant="ghost">
                        Cancel
                      </Button>
                      <Button colorScheme="danger">Done</Button>
                    </Button.Group>
                  </Popover.Footer> */}
                </Popover.Content>
              </Popover>
            </Stack>
          </FormControl>

          <Button
            style={Styles.LoginBtn}
            mt="2"
            color={'emerald.500'}
            _text={{color: 'white'}}>
            Verify
          </Button>
        </VStack>
      </PresenceTransition>
    </Center>
  );
}

export default DeviceRegister;
