/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';

// TODO: set url
const PUSH_ENDPOINT = 'https://your-server.com/users/push-token';

async function registerForPushNotificationsAsync() {
  const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  if (status !== 'granted') {
    alert('No notification permissions!');
  }

  // Get the token that identifies this device
  const token = await Notifications.getExpoPushTokenAsync();
  console.log('token for server to push notification:');
  console.log(token);

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: {
        value: token,
      },
      user: {
        // TODO: should this post have authentication header? And what username to set. Need specify this with backend
        username: 'Brent',
      },
    }),
  });
  return token;
}

export default registerForPushNotificationsAsync;
