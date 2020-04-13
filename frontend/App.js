/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import * as React from 'react';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {SplashScreen} from 'expo';
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';
// import 'react-native-gesture-handler';

import NavigationContainer from './navigation/NavigationContainer';

import store from './Store';

store.subscribe(() => {
  // console.log('somthing: ', store.getState());
});

export default function App(props) {
  console.log('test');
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [
    initialNavigationState,
    setInitialNavigationState,
  ] = React.useState();

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        // setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer/>
      </Provider>
    );
  }
}
