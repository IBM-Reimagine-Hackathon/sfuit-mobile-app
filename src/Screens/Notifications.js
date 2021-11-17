import React from 'react';
import {
  Box,
  Heading,
  Icon,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  NativeBaseProvider,
} from 'native-base';
import NotificationCard from '../Components/NotificationCard';

function Notifications() {
  return (
    <Box
      rounded="lg"
      overflow="hidden"
      width="100%"
      height="100%"
      shadow={1}
      _light={{backgroundColor: 'gray.50'}}
      _dark={{backgroundColor: 'gray.700'}}>
      <Box></Box>
      <Stack p="4" space={3}>
        <Stack space={2}>
          <Heading size="xl" ml="-1">
            Notifications
          </Heading>
          <Text
            fontSize="md"
            _light={{color: 'violet.500'}}
            _dark={{color: 'violet.300'}}
            fontWeight="500"
            ml="-0.5"
            mt="-1">
            You have 1 Notifications
          </Text>
        </Stack>
      </Stack>
      <NotificationCard />
    </Box>
  );
}

export default Notifications;
