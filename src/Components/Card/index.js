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
  Flex,
} from 'native-base';
import {COLOR} from '../../constants';
import {Util} from '../../Util';
function Sensor({name, data, unit}) {
  return (
    <Center bg={'white'} rounded="2xl" m="4">
      <Flex direction="row" mb="2.5" mt="1.5">
        <Image
          size={'32'}
          m="10"
          source={name && Util.getSensorIcon(name.toLowerCase())}
          alt="image"
        />
        <Center
          bg="red.500"
          _text={{color: 'white', fontWeight: '700', fontSize: 'xs'}}
          position="absolute"
          bottom={4}
          right={3}
          borderRadius={10}
          px="3"
          py="1.5">
          {name}
        </Center>
        <Center>
          <Stack p="4" space={4}>
            <Heading size="md" ml="-1">
              {`${data} ${unit}`}
            </Heading>
            {/* <Text
            fontSize="xs"
            _light={{color: 'violet.500'}}
            _dark={{color: 'violet.300'}}
            fontWeight="500"
            ml="-0.5"
            mt="-1">
            The Silicon Valley of India.
          </Text> */}
            <HStack
              alignItems="center"
              space={5}
              justifyContent="space-between">
              <HStack alignItems="center">
                <Text color="gray.500" fontWeight="400">
                  1 mins ago
                </Text>
              </HStack>
            </HStack>
          </Stack>
        </Center>
      </Flex>
    </Center>
  );
}

export default Sensor;
