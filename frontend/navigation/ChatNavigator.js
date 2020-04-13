
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ChatListScreen from '../screens/chat/chat-list/index';
import ChatScreen from '../screens/chat/chat-1/index';

const Stack = createStackNavigator();

function ChatNavigator() {
  return (
    // <Stack.Navigator headerMode="none">
    <Stack.Navigator>
      <Stack.Screen name="ChatList" component={ChatListScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}

export default ChatNavigator;
