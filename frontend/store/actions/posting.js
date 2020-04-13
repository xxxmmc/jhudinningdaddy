import {plainToClass} from 'class-transformer';
export const ADD_POSTING = 'ADD_POSTING';
export const SET_MY_POSTINGS = 'SET_MY_POSTING';
export const SET_ALL_POSTINGS = 'SET_ALL_POSTING';
export const REMOVE_POSTING = 'REMOVE_POSTING';

const serverURL = 'http://localhost:8080';
const getAllPostingsURL = serverURL + '/postings';
import Posting from '../../models/posting';

export const setAllPostings = (posting) => {
  return async (dispatch, getState) => {
    // alert('posts refreshed');
    // * that's how get token from async store
    const token = getState().auth.token;

    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + token);
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    const response = await fetch(getAllPostingsURL, requestOptions);

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

    // * build allPostings
    const allPostings = [];
    for (x of resData) {
      // FIXME: use plainToClass, but cannot do
      allPostings.push(plainToClass(Posting, x));
      // allPostings.push(x);
    }
    dispatch({
      type: SET_ALL_POSTINGS,
      allPostings: allPostings,
    });
  };
};

export const addPosting = (posting) => {
  // TODO: http request to backend
  return {type: ADD_POSTING, posting: posting};
};

export const removePosting = (postingId) => {
  // TODO: http request to backend
  return {type: REMOVE_POSTING, pid: postingId};
};
