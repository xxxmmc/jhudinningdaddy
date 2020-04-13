/* eslint-disable require-jsdoc */
import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import TabBarIcon from '../components/TabBarIcon';
import TestScreen from '../screens/TestScreen';
import MyPostingsScreen from './MyPostingsNavigator';
import CreatePost from '../screens/CreatePost';
import RateUser from '../screens/RateUser';
import 'react-native-gesture-handler';
import AllPostingsNavigator from './AllPostingsNavigator'
import ChatScreen from '../screens/chat/ChatScreen';
import MapScreen from '../screens/map/MapScreen';

const BottomTab = createBottomTabNavigator();
// const INITIAL_ROUTE_NAME = 'Login';
const INITIAL_ROUTE_NAME = 'AllPostings';

function BottomTabNavigator({navigation, route}) {

  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: getHeaderTitle(route), tabBarVisible:true});
  }, [navigation, route]);

  return (
      <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME} headerMode='screen'>
        <BottomTab.Screen
          name="AllPostings"
          component={AllPostingsNavigator}
          options={{
            title: 'none',
            tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="md-code-working" />,
            headerMode: 'none',
          }}
        />
        <BottomTab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            title: 'chat',
            tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="md-book" />,
          }}
        />
        <BottomTab.Screen
          name="Map"
          component={MapScreen}
          options={{
            title: 'map',
            tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="md-code-working" />,
            headerMode: 'none',
          }}
        />
        <BottomTab.Screen
          name="Test"
          component={TestScreen}
          options={{
            title: 'Test Screen',
            tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="md-book" />,
          }}
        />
        <BottomTab.Screen
          name="UserPost"
          component={MyPostingsScreen}
          options={{
            title: 'Your trades',
            tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="ios-grid" />,
            headerMode: 'none',
          }}
        />

        <BottomTab.Screen
          name="CreatePost"
          component={CreatePost}
          options={{
            title: 'CreatePost',
            tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="ios-paper-plane"/>,
          }}
        />

        <BottomTab.Screen
          name="RateUser"
          component={RateUser}
          options={{
            title: 'RateUser',
            tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="ios-paper-plane"/>,
          }}
        />
      </BottomTab.Navigator>
  );
}
export default BottomTabNavigator;

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    // case 'Post':
    //   return 'All Posts';
    case 'Test':
      return 'Test page';
  }
}
