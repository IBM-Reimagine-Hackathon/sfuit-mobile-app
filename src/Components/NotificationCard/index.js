import React from 'react';
import {Badge, Box, Center, HStack, Stack, Text} from 'native-base';
import {COLOR} from '../../constants';
function NotificationCard() {
  return (
    <Center>
      <Box
        rounded="lg"
        overflow="hidden"
        width="90%"
        shadow={1}
        _light={{backgroundColor: COLOR}}
        _dark={{backgroundColor: 'gray.700'}}>
        <Stack p="5" space={3}>
          <Text color="#fff" fontWeight="400">
            Bengaluru (also called Bangalore) is the center of India's high-tech
          </Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text color="white" fontWeight="400">
                6 mins ago
              </Text>
            </HStack>
            <Center>
              <Badge colorScheme="success">
                <Text>Success</Text>
              </Badge>
            </Center>
          </HStack>
        </Stack>
      </Box>
    </Center>
  );
}

export default NotificationCard;
