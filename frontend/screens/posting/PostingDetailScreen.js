/* eslint-disable camelcase */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import {mapping, light as lightTheme} from '@eva-design/eva';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
} from 'react-native';

import {
  ApplicationProvider,
  Layout,
  Text,
  Button,
  Input,
} from '@ui-kitten/components';

export const PostDetailScreen = ({navigation, route}) => {
  useEffect(() => {
  }, []);

  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>cash_price: {route.params.posting.cash_price}</Text>
      <Text>comment:{route.params.posting.comment}</Text>
      <Text>userId={route.params.posting.userId}</Text>
      <Text>id={route.params.posting.id}</Text>
      <Text>counterId={route.params.posting.counterId}</Text>
      <Text>daddy_baby={route.params.posting.daddy_baby}</Text>
      <Text>dining_price={route.params.posting.dining_price}</Text>
      <Text>exchange_rate={route.params.posting.exchange_rate}</Text>
      <Text>expire_time={route.params.posting.expire_time}</Text>
      <Text>post_time={route.params.posting.post_time}</Text>
      <Text>status={route.params.posting.status}</Text>
      <Input
        style={styles.input}
        placeholder='Place your Text'
      />
      <Button onPress={() => navigation.goBack()}>Confirm</Button>
    </Layout>
  );
};

const App = ({navigation, route}) => (
  <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <PostDetailScreen navigation={navigation} route = {route}/>
  </ApplicationProvider>
);

export default App;

PostDetailScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  input: {
    margin: 8,
  },
});


