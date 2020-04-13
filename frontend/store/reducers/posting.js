import {SET_MY_POSTINGS, SET_ALL_POSTINGS, ADD_POSTING, REMOVE_POSTING} from '../actions/posting';
import Posting from '../../models/posting';

const initialState = {
  allPostings: {},
  myPostings: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_POSTINGS:
      return {
        ...state,
        allPostings: action.allPostings,
      };
    case SET_MY_POSTINGS:
      return {
        ...state,
        myPostings: action.myPostings,
      };
    case ADD_POSTING:
      const addedPosting = action.posting;

      return {
        ...state,
        allPostings: {...state.allPostings, [addedPosting.id]: addedPosting},
        myPostings: {...state.myPostings, [addedPosting.id]: addedPosting},
      };
    case REMOVE_POSTING:
      if (!state.items[action.id]) {
        return state;
      }
      const updatedAllPostings = {...state.allPostings};
      const updatedMyPostings = {...state.myPostings};
      delete updatedAllPostings[action.id];
      delete updatedMyPostings[action.id];
      return {
        ...state,
        allPostings: updatedAllPostings,
        myPostings: updatedMyPostings,
      };
  }

  return state;
};
