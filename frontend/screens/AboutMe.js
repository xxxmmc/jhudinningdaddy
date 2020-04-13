/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable require-jsdoc */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React from 'react';
import {mapping, light as lightTheme} from '@eva-design/eva';
import {
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';

import {
  ApplicationProvider,
  Layout,
  Text,
  Button,
  Card,
  CardHeader,
  List,
} from '@ui-kitten/components';

const getUserByUserId = 'http://localhost:8080/users/userid/1';
const getAllPostingByUserId = 'http://localhost:8080/postings/userId/1';
const getUserRatingByUserId = 'http://localhost:8080/users/rating/1';


export const DisplayProfile = (para) => {

  return (
    <Card header={Header}>
      <Text>cash_price: {para.cash_price}</Text>
      <Text>comment:{para.comment}</Text>
      <Text>userId={para.userId}</Text>
      <Text>id={para.id}</Text>
      <Text>counterId={para.counterId}</Text>
      <Text>daddy_baby={para.daddy_baby}</Text>
      <Text>dining_price={para.dining_price}</Text>
      <Text>exchange_rate={para.exchange_rate}</Text>
      <Text>expire_time={para.expire_time}</Text>
      <Text>post_time={para.post_time}</Text>
      <Text>status={para.status}</Text>
    </Card>
  );
};


class PostScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      refreshing: false,
    };

    this.navigation = props.navigation;
    this.route = props.route;
  }

  componentDidMount() {
    return fetch(getUserByUserId)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            refreshing: false,
            dataSource: responseJson,
          }, function() {
          });
        })
        .catch((error) => {
          console.error(error);
        });
  }


  render() {
    const renderItem = ({item, index}) => (
      <DisplayProfile
        userId={item.userId}
        id={item.id}
        firstName={item.firstName}
        lastName={item.lastName}



        navigation={this.navigation}
      />
    );
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    const {UserId} = this.route.params;
    // TODO: change back
    // const UserId = 1;
    const onRefresh = () => {
      console.log('post log');
      this.componentDidMount();
    };

    return (
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text category="h1">About {UserId.toString()}</Text>
        <List
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={onRefresh} />
          }
          data={this.state.dataSource}
          renderItem={renderItem}
        />
      </Layout>
    );
  }
}

const AboutMe = ({navigation, route}) => (
  <ApplicationProvider mapping={mapping} theme={lightTheme}>
    {/* <PostScreen navigation={navigation} /> */}
    <PostScreen navigation={navigation} route = {route}/>
  </ApplicationProvider>
);

export default AboutMe;

PostScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 4,
  },
});