/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyPostingsScreen from '../screens/posting/MyPostingsScreen';
import PostDetailScreen from '../screens/posting/PostingDetailScreen';

const Stack = createStackNavigator();

function PostNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyPostings" component={MyPostingsScreen} />
      <Stack.Screen name="PostingDetail" component={PostDetailScreen} />
    </Stack.Navigator>
  );
}

export default PostNavigator;
