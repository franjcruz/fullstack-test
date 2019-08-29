import { handleActions } from 'redux-actions';

import { CLEAN_AUTH, LOGIN_ACTION } from './../constants';

export const auth = handleActions(
  {
    [CLEAN_AUTH]: (state, action) => ({}),
    [LOGIN_ACTION]: (state, action) => ({ ...state, token: action.payload })
  },
  {}
);
