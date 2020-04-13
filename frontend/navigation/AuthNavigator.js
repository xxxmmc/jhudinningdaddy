/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */

import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import AuthScreen from '../screens/user/AuthScreen';
import SignUpScreen from '../screens/user/SignUpScreen';

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
