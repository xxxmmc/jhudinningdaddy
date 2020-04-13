/* eslint-disable camelcase */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React from 'react';

import {mapping, light as lightTheme} from '@eva-design/eva';
import {
  StyleSheet,
  Image
} from 'react-native';

import {
  ApplicationProvider,
  Layout,
  Text,
  Button,
  Input,
} from '@ui-kitten/components';

export const MyProfileScreen = ({navigation, route}) => {
  const {userId}= "route.params";
  const {dining_dollars}= "route.params";
  const {personalintro}= "route.params";


  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
       <Image style = {{width:50,height:50}}
             source = {{uri:'https://reactnative.dev/img/tiny_logo.png'}}
       ></Image> 
      <Text>userId {userId}</Text>
      <Text>dining dollars:{dining_dollars}</Text>
      <Text>PersonalIntroduction:{personalintro}</Text>


      <Button onPress={() => navigation.navigate('Post')}>View All My post</Button>
    </Layout>

  );
};

const App = ({navigation, route}) => (
  <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <MyProfileScreen navigation={navigation} route = {route}/>
  </ApplicationProvider>
);

export default App;

MyProfileScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  input: {
    margin: 8,
  },
});


