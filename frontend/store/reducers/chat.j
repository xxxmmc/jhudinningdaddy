import {AsyncStorage} from 'react-native';

// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

const SignUpURL = '';
const LoginURL = 'http://localhost:8080/login';

export const authenticate = (userId, token) => {
  return (dispatch) => {
    // TODO: add expiryTime
    dispatch({type: AUTHENTICATE, userId: userId, token: token});
  };
};

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
        SignUpURL,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        },
    );

    if (!response.ok) {
      console.log('response not ok');
      console.log(JSON.stringify(response));

      // TODO: add error handling
      // const errorResData = await response.json();
      // const errorId = errorResData.error.message;
      // let message = 'Something went wrong!';
      // if (errorId === 'EMAIL_EXISTS') {
      //   message = 'This email exists already!';
      // }
      // throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    dispatch(
        authenticate(
            resData.userId,
            resData.token,
        ),
    );
    saveDataToStorage(resData.userId, resData.token);
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
        LoginURL,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        },
    );

    // * response is already a json
    if (!response.ok) {
      console.log('response not ok');
      console.log(response);
      // TODO: add error handling
      // const errorResData = response;
      // const errorId = errorResData.error.message;
      // let message = 'Something went wrong!';
      // if (errorId === 'EMAIL_NOT_FOUND') {
      //   message = 'This email could not be found!';
      // } else if (errorId === 'INVALID_PASSWORD') {
      //   message = 'This password is not valid!';
      // }
      // throw new Error(message);
    }

    const resData = await response.json();
    dispatch(
        authenticate(
            resData.userId,
            resData.token,
        ),
    );
    saveDataToStorage(resData.token, resData.userId);
    // * that's how you get from asyncStore
    const userData = await AsyncStorage.getItem('userData');
    console.log(userData);
  };
};

export const logout = () => {
  AsyncStorage.removeItem('userData');
  return {type: LOGOUT};
};

const saveDataToStorage = (token, userId) => {
  AsyncStorage.setItem(
      'userData',
      JSON.stringify({
        token: token,
        userId: userId,
      }),
  );
};
