import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducerApp from './reducers';
import App from './components/App.react';


const store = createStore(reducerApp);

if (typeof document !== 'undefined') {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}
