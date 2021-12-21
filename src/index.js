import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from './state/store/configureStore';
import { Provider } from 'react-redux';
import './index.css';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

if (window.Cypress) {
  window.store = store;
}
