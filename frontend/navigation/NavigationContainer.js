/* eslint-disable max-len */
import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import BottomTabNavigator from './BottomTabNavigator';
import AuthNavigator from './AuthNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TestScreen from '../screens/TestScreen';

const Stack = createStackNavigator();


// * Auth flow: https://reactnavigation.org/docs/auth-flow
const MainNavigator = (props) => {
  // TODO: what does navRef do
  // const navRef = useRef();
  //const isAuth = useSelector((state) => !!state.auth.token);

   const isAuth = true;
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='screen'>
        {isAuth ? (
          <Stack.Screen name='Main' component={BottomTabNavigator} options={{headerShown: false}} />
        ) : (
          <Stack.Screen name='Auth' component={AuthNavigator} options={{headerShown: false}}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
