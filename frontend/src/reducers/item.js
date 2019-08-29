import { handleActions } from 'redux-actions';

import { CREATE_ITEM, LIST_ITEM } from '../constants';

export const item = handleActions(
  {
    [CREATE_ITEM]: (state, action) => ({ ...state, item: action.payload }),
    [LIST_ITEM]: (state, action) => ({ ...state, listItem: action.payload })
  },
  {}
);
