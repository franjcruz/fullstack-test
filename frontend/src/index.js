import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { persistor, store } from './store';

const rootComponent = (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
ReactDOM.render(rootComponent, document.getElementById('root'));
registerServiceWorker();
