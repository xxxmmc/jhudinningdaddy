/* eslint-disable max-len */
import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import {mapping, light as lightTheme} from '@eva-design/eva';
import {
  StyleSheet,
  View,
  FlatList,
  Switch,
} from 'react-native';

import {
  ApplicationProvider,
  Input,
  Layout,
  Text,
  Button,
  Card,
  CardHeader,
  Icon,
  List,
  ListItem,
} from '@ui-kitten/components';

const CreatePost = ({navigation}) => {
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text category="h1">Create your Post</Text>
      <InputPostInformation/>
    </Layout>
  );
};

const useInputChanges = (initialValue = '') => {
  const [value, setValue] = React.useState(initialValue);
  return {
    value,
    onChangeText: setValue,
  };
};

export const InputPostInformation = () => {
  const diningPriceInputChanges = useInputChanges();
  const cashPriceInputChanges = useInputChanges();
  const expireDateInputChanges = useInputChanges();
  const commentInputChanges = useInputChanges();
  const [switchValue, setSwitch] = React.useState(false);

  const PressAndPost = async function() {
    const userData = JSON.parse(await AsyncStorage.getItem('userData'));
    token = userData.token;

    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + token);


    fetch('http://localhost:8080/postings', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify({
        userId: 12345,
        daddy_baby: switchValue,
        dining_price: diningPriceInputChanges.value,
        cash_price: cashPriceInputChanges.value,
        exchange_rate: cashPriceInputChanges.value / diningPriceInputChanges.value,
        post_time: 1582687373,
        expire_time: expireDateInputChanges.value,
        comment: commentInputChanges.value,
        status: 0,
      }),
    });
    console.log("posted new post");
  };


  return (
    <Layout>
      <Text>{switchValue?'I want to buy':'I want to sell'}</Text>
      <Switch style={{justifyContent: 'center', alignItems: 'center'}} value= {switchValue} onValueChange = {() => setSwitch(switchValue? false: true)}/>
      <Input
        style={styles.input}
        status='primary'
        placeholder='                    Dining Price                 '
        {...diningPriceInputChanges}
      />

      <Input
        style={styles.input}
        status='success'
        placeholder='                    Cash Price                 '
        {...cashPriceInputChanges}
      />

      <Input
        style={styles.input}
        status='info'
        placeholder='                    Expire Date                '
        {...expireDateInputChanges}
      />

      <Input
        style={styles.input}
        status='basic'
        placeholder='                   Leave Message                '
        {...commentInputChanges}
      />
       <Button onPress={PressAndPost}>
      {`Submit!`}
    </Button>

    </Layout>
  );
};

const App = ({navigation}) => (
  <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <CreatePost navigation={navigation}/>

  </ApplicationProvider>
);

export default App;

const styles = StyleSheet.create({
  input: {
    margin: 8,
  },
  button: {
    margin: 8,
  },
  switch:{
    alignItems: 'center',
  },
  controlContainer: {
    borderRadius: 4,
    margin: 50,
    backgroundColor: '#3366FF',
  },
  textStyle:{  
    margin: 24,  
    fontSize: 25,  
    fontWeight: 'bold',  
    textAlign: 'center',  
    color: '#344953'  
}  
});

