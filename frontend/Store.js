import {createStore, combineReducers, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import mapReducer from './store/reducers/map';
import postingReducer from './store/reducers/posting';

const rootReducer = combineReducers({
  auth: authReducer,
  map: mapReducer,
  posting: postingReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;
