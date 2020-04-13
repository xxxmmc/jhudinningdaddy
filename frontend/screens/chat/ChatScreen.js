/* eslint-disable camelcase */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import {mapping, light as lightTheme} from '@eva-design/eva';
// import ChatList from "./conversation-list/index";
import ChatNavigator from '../../navigation/ChatNavigator';
import {StyleSheet, View} from 'react-native';

import {
  ApplicationProvider,
  Layout,
  Text,
  Button,
} from '@ui-kitten/components';

export const ChatScreen = ({navigation, route}) => {
  return (
    <Layout style={styles.container}>
      <ChatList
        navigation={navigation}
        style={styles.conversationList}
      />
    </Layout>
  );
};

const App = ({navigation, route}) => (
  <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <ChatNavigator/>
    {/* <ChatScreen navigation={navigation} route={route} /> */}
  </ApplicationProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center"
  },
  conversationList: {
    flex: 1,
  },
});

export default App;
