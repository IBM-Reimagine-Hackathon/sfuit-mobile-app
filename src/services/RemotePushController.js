import React, {useEffect} from 'react';
import PushNotification from 'react-native-push-notification';

const RemotePushController = () => {
  useEffect(() => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log('REMOTE NOTIFICATION ==>', notification.title);
        PushNotification.localNotification({
          autoCancel: true,
          subText: 'Local Notification Demo',
          title: notification.title,
          message: notification.message,
          vibrate: true,
          vibration: 300,
          playSound: true,
          soundName: 'default',
        });

        // process the notification here
      },
      // Android only: GCM or FCM Sender ID
      senderID: '256218572662',
      popInitialNotification: true,
      requestPermissions: true,
    });
  }, []);

  return null;
};

export default RemotePushController;
