import React, {useState, useEffect} from 'react';
import {mapping, light as lightTheme} from '@eva-design/eva';
import {
  ApplicationProvider,
} from '@ui-kitten/components';

import {
  StyleSheet,
} from 'react-native';

import MapView, {
  Marker,
} from 'react-native-maps';

import {useDispatch, useSelector} from 'react-redux';
// TODO: 1.complete map actions and redux
import * as mapActions from '../../store/actions/map';






const Map = (props) => {
  const dispatch = useDispatch();

  // TODO: 2. change the `useState` blow to `useSelector for `myLocation` and `userLocation`
  
  
  









  
  
  const userLocation = {
    latitude: 39.3262,
    longitude: -76.6209,
  };
  const myLocation = {
    latitude: 39.3273,
    longitude: -76.6209,
  };
  // * this is an example of useSelector
  // const myLocation = useSelector((state) => {
  //   return state.map.currentLocation;
  // });

  const [myPin, setMyPin] = useState(
      <Marker
        coordinate={{
          latitude: myLocation.latitude,
          longitude: myLocation.longitude,
        }}
        title={'my location'}>
      </Marker >,
  );
  const [userPin, setUserPin] = useState(
      <Marker
        coordinate={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        }}
        title={'user location'}>
      </Marker >,
  );

  // TODO: 3. use `useEffect` to fetch data(write into state) when onload
  useEffect(() => {
    // * this is a dummy example to fetch
    // const fetchData = async () => {
    //   await dispatch(mapActions.getUserLocation());
    //   await dispatch(mapActions.getMyLocation());
    // }
    // fetchData();
  }, []);


  const [region, setRegion] = useState({
    latitude: 39.3262,
    longitude: -76.6209,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421,
  });

  useEffect(() => {
    // TODO: complete setRegion
    // setRegion(() =>(
    // ));
    setMyPin(() => (
      myLocation == undefined || null ?
        null :
        <Marker
          coordinate={{
            latitude: myLocation.latitude,
            longitude: myLocation.longitude,
          }}
          title={'my location'}>
        </Marker >
    ));
    setUserPin(() => (
      // TODO: set a different color
      userLocation == undefined || null ?
        null :
        <Marker
          coordinate={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          }}
          title={'user location'}>
        </Marker >
    ));
  }, [myLocation, userLocation]);

  return (
    <MapView
      style={styles.map}
      region={region}
      // TODO: use my location as center
	  // onRegionChangeComplete={onRegionChange}
    >
      {myPin}
      {userPin}
    </MapView>
  );
};


const App = ({navigation, route}) => (
  <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <Map navigation={navigation} route={route} />
  </ApplicationProvider>
);

const styles = StyleSheet.create({
  map: {
    height: '100%',
    flex: 6,
  },
});

export default App;
