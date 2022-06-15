import {IS_LOADING, NOT_LOADING} from './ActionTypes';

export const loaderReducer = (state, action) => {
  switch (action.type) {
    case IS_LOADING:
      return {...action.payload};
    case NOT_LOADING:
      return {...action.payload};
    default:
      return state;
  }
};

export const loaderValue = {isLoad: false};

export const loaderStateReducer = (state, action) => {
  switch (action.type) {
    case 'IS_NOT_LOADING':
      return action.payload;
    default:
      return state;
  }
};
