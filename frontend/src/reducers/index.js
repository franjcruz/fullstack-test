import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import { reducer as modal } from 'redux-modal';

import { auth } from './auth';
import { item } from './item';

export default combineReducers({
  auth,
  item,
  modal,
  form: reduxForm
});
