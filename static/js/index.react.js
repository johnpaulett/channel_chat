import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from './reducers';
import Root from './containers/Root.react';

import { ChatAPI } from './utils/ChatAPI';

const loggerMiddleware = createLogger();

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);


// Under mocha test? via http://stackoverflow.com/a/29183140/82872
// TODO Undo
const isInTest = typeof global.it === 'function';

if (!isInTest) {
  ChatAPI.connect();
  ChatAPI.listen(store);

  render(
    <Provider store={store}>
      <Root />
    </Provider>,
    document.getElementById('root')
  );
}
