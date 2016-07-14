import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import chatApp from './reducers';
import Root from './components/Root.react';


const store = createStore(chatApp);

if (typeof document !== 'undefined') {
  render(
    <Provider store={store}>
      <Root />
    </Provider>,
    document.getElementById('root')
  );
}
