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
  ButtonGroup,
  Radio,
  RadioGroup,
} from '@ui-kitten/components';

const RateUser = ({navigation}) => {
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text category="h1">How was your trading?</Text>
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
  const commentInputChanges = useInputChanges();
  const [switchValue, setSwitch] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(4);
  const onCheckedChange = (index) => {
    setSelectedIndex(index);
  };


  const PressAndPost = async function() {
    const userData = JSON.parse(await AsyncStorage.getItem('userData'));
    token = userData.token;

    fetch('http://localhost:8080/users/rating', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + token,
      },
      body: JSON.stringify({
        userId: 1,
        rating: 1.0, // selectedIndex + 1,
        // comment: commentInputChanges.value,
        // status: 0,
      }),
    });
  };

  return (
    <Layout>
      <RadioGroup
        selectedIndex={selectedIndex}
        onChange={onCheckedChange}
        style = {styles.container}>
        <Radio style={styles.radio} text='1'/>
        <Radio style={styles.radio} text='2'/>
        <Radio style={styles.radio} text='3'/>
        <Radio style={styles.radio} text='4'/>
        <Radio style={styles.radio} text='5'/>
      </RadioGroup>
      <Text style={styles.text} category='h6'>
        {`You indicated your overall experence as ${selectedIndex + 1} stars`}
      </Text>

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
    <RateUser navigation={navigation}/>

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
  radio: {
    margin: 8,
  },
  switch: {
    alignItems: 'center',
  },
  controlContainer: {
    borderRadius: 4,
    margin: 50,
    backgroundColor: '#3366FF',
  },
  textStyle: {
    margin: 24,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#344953',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

