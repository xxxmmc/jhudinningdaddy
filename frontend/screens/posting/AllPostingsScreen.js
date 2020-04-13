/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable require-jsdoc */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import {AsyncStorage} from 'react-native';
import React, {useState, useEffect} from 'react';
import {mapping, light as lightTheme} from '@eva-design/eva';
import {useDispatch, useSelector} from 'react-redux';
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
  TabView,
  Tab,
} from '@ui-kitten/components';

import * as postingActions from '../../store/actions/posting';

export const CardWithHeaderAndFooterShowcase = (para) => {
  const DetailBtnOnPressed = () => {
    para.navigation.navigate('PostingDetail', {
      posting: para.posting,
      navigation: para.navigation,
    });
  };

  const Header = () => (
    <CardHeader title={para.posting.id.toString()} description={para.posting.userId.toString()} />
  );

  const Footer = () => (
    <View style={styles.footerContainer}>
      <Button style={styles.footerControl} size="small" status="basic">
        CHAT
      </Button>
      <Button style={styles.footerControl} size="small" >
        ADD
      </Button>
      <Button style={styles.footerControl} size="small" onPress={DetailBtnOnPressed}>
        DETAIL
      </Button>
    </View>
  );

  return (
    // FIXME: the card below cannot be displayed in full width while centered
    <Card header={Header} footer={Footer} >
      <Text>cash_price: {para.posting.cash_price}</Text>
      <Text>comment:{para.posting.comment}</Text>
      <Text>userId={para.posting.userId}</Text>
      <Text>id={para.posting.id}</Text>
      <Text>counterId={para.posting.counterId}</Text>
      <Text>daddy_baby={para.posting.daddy_baby}</Text>
      <Text>dining_price={para.posting.dining_price}</Text>
      <Text>exchange_rate={para.posting.exchange_rate}</Text>
      <Text>expire_time={para.posting.expire_time}</Text>
      <Text>post_time={para.posting.post_time}</Text>
      <Text>status={para.posting.status}</Text>
    </Card>
  );
};


function AllPostingsScreen({navigation, route}) {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const allPostings = useSelector((state) => {
    return state.posting.allPostings;
  });

  const fetchAllPostings = async () => {
    await dispatch(postingActions.setAllPostings());
  };

  useEffect(() => {
    fetchAllPostings();
    setIsLoading(false);
  }, []);

  const onRefresh = () => {
    fetchAllPostings();
  };

  const emptyComponent = () => {
    return (
      <Text category='h1'>Empty, no posts</Text>
    );
  };

  const LoadingComponent = () => {
    return (
      <View style={{flex: 1, padding: 20}}>
        <ActivityIndicator />
      </View>
    );
  };

  const renderItem = ({item, index}) => (
    <CardWithHeaderAndFooterShowcase style={styles.cardContainer}
      posting={item}
      navigation={navigation}
    />
  );


  return (
    <Layout style={styles.container}>
      <Text category="h2">Welcome</Text>
      {isLoading ? <LoadingComponent /> :


        <List
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListEmptyComponent={emptyComponent}
          data={allPostings}
          renderItem={renderItem}
        />
      }
    </Layout >
  );
}

const Post = ({navigation, route}) => (
  <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <AllPostingsScreen navigation={navigation} route={route} />
  </ApplicationProvider>
);

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  cardContainer: {
    // TODO: card width --> 100%
    // width: '100%',
    alignContent: 'stretch',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 4,
  },
  headerText: {
    marginHorizontal: 24,
    marginVertical: 16,
  },
});
