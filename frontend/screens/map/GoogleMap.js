// import React, {useState, useEffect, Component} from 'react';
// import {
//   StyleSheet,
//   Text,
//   Button,
//   Modal,
//   TouchableOpacity,
//   TouchableHighlight,
//   View,
// } from 'react-native';
// import MapView, {
//   Marker,
//   Callout,
//   CalloutSubview,
// } from 'react-native-maps';
// import {connect} from 'react-redux';
// import Bubbles from './Bubbles';
// import getProfile from '../GetAPI/GetProfileAPI';
// import FullProfile from './FullProfile';

// import {useDispatch, useSelector} from 'react-redux';
// import * as userActions from '../store/actions/user';
// import {SET_LOCATION} from '../store/actions/user';


// const Map = (props) => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const dispatch = useDispatch();

//   const [neighbors, setNeighbors] = useState();
//   const [myPin, setMyPin] = useState();


//   const profile = useSelector((state) => {
//     return state.user.profile;
//   });

//   const profileList = useSelector((state) => {
//     return state.user.profileList;
//   });

//   const currentLocation = useSelector((state) => {
//     return state.user.currentLocation;
//   });

//   const [region, setRegion] = useState({
//     latitude: currentLocation.coords.latitude,
//     longitude: currentLocation.coords.longitude,
//     latitudeDelta: 0.09,
//     longitudeDelta: 0.035,
//   });

//   useEffect(() => {
//     // TODO: how to decide lat and lon: user current location, or the user's map center
//     navigator.geolocation.getCurrentPosition(
//         (position) => {
//           dispatch({
//             type: SET_LOCATION,
//             currentLocation: position,
//           });
//         },
//         (error) => alert(error.message),
//         {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
//     );
//     const watchID = navigator.geolocation.watchPosition((position) => {
//       dispatch({
//         type: SET_LOCATION,
//         currentLocation: position,
//       });
//       console.log(`Phone moved, updating location to ${JSON.stringify(position)}`);
//     });
//     return () => {
//       navigator.geolocation.clearWatch(watchID);
//     };
//   }, []);

//   useEffect(() => {
//     // TODO: how to decide lat and lon: user current location, or the user's map center
//     console.log(`location updated, searching: ${JSON.stringify(currentLocation)}`);
//     const fetchData = async () => {
//       await dispatch(userActions.getProfileList(currentLocation.coords.longitude, currentLocation.coords.latitude));
//       await dispatch(userActions.getProfile());
//     };
//     fetchData();
//   }, [currentLocation]);

//   useEffect(() => {
//     setNeighbors(() => (
//       profileList == undefined || null ?
//         null :
//         profileList.map((p) => (
//           <Marker
//             coordinate={{
//               latitude: p.location.lat,
//               longitude: p.location.lon,
//             }}
//             title={'others marker'}
//             pinColor="blue">
//             <Callout tooltip>
//               <TouchableOpacity>
//                 <Bubbles />
//               </TouchableOpacity>
//             </Callout>
//           </Marker>),
//         )
//     ));

//     setMyPin(() => (
//       profile == undefined || null ?
//         null :
//         <Marker
//           coordinate={{
//             latitude: currentLocation.coords.latitude,
//             longitude: currentLocation.coords.longitude,
//           }}
//           title={'my location'}>
//           <Callout tooltip>
//             <TouchableOpacity
//               onPress={() => setIsModalVisible(true)}>
//               <Bubbles />
//             </TouchableOpacity>

//             <Modal
//               transparent={true}
//               animationType="fade"
//               visible={isModalVisible}
//               onSwipeComplete={() => setIsModalVisible(false)}
//               swipeDirection="left">
//               <TouchableOpacity
//                 onPress={() => setIsModalVisible(false)}>
//                 <FullProfile />
//               </TouchableOpacity>
//             </Modal>
//           </Callout>
//         </Marker >
//     ));
//   }, [profile, profileList, currentLocation]);


//   const onRegionChange = (region) => {
//     setRegion(region);
//   };

//   return (
//     <MapView
//       style={styles.map}
//       region={region}
// 	  onRegionChangeComplete={onRegionChange}
//     >
//       {myPin}
//       {neighbors}
//     </MapView>
//   );
// };

// const styles = StyleSheet.create({
//   map: {
//     height: '100%',
//     flex: 6,
//   },
// });

// // export default connect(mapStateToProps)(Map);
// export default Map;
