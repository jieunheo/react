import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // 제공자 컴포넌트

import './index.css';
import App from './App';
import store from './store/index'; // 제공할 스토어

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
