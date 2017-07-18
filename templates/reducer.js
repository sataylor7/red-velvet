/**
 * reducer for the feature
 */

import * as types from './actionTypes';
import [NAME]Model from './model';

export const initialState = [NAME]Model;

const [NAME]Reducer = (state = initialState, action) => {
  switch( action.type ) {
    // should be types.UPPERCASE_ACTION
    case types.[NAME]_SAMPLE : {
      return {
        ...state
      }
    }
    default:
      return state
  }
}
