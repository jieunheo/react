import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import { FavoretesContextProvider } from './store/favorites-context';

ReactDOM.render(
  <FavoretesContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FavoretesContextProvider>,
  document.getElementById('root'));
