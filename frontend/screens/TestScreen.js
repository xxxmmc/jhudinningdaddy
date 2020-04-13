/* eslint-disable camelcase */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import {mapping, light as lightTheme} from '@eva-design/eva';
import {Notifications} from 'expo';
import postPushToken from '../components/notification/postPushToken';

import {
  ApplicationProvider,
  Layout,
  Text,
  Button,
} from '@ui-kitten/components';

export const TestScreen = ({navigation, route}) => {
  useEffect(() => {
    const notificationSubscription = Notifications.addListener(handleNotification);
  }, []);

  const [notification, setNotification] = useState({});
  const [notificationToken, setNotificationToken] = useState(null);

  const handleNotification = (notification) => {
    console.log('notification content');
    console.log(notification);

    setNotification(notification);
  };


  const onTestButtonPress = async () => {
    // alert('test button pressed');
    setNotificationToken(await postPushToken());
    // await postPushToken();
  };

  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button onPress={onTestButtonPress}>Press to get push token</Button>
      <Text category='h5'>notification token:</Text>
      <Text> {notificationToken}</Text>

      <Text category='h5'>notification.origin:</Text>
      <Text> {notification.origin}</Text>

      <Text category='h5'>notification.data:</Text>
      <Text>{JSON.stringify(notification.data)}</Text>

    </Layout>

  );
};

const App = ({navigation, route}) => (
  <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <TestScreen navigation={navigation} route={route} />
  </ApplicationProvider>
);

export default App;

