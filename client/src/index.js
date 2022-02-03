import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import axios from 'axios';
import { SearchProvider } from './context/SearchContext';

// axios.defaults.baseURL = 'https://backendsociall.herokuapp.com/api';

ReactDOM.render(
  <React.StrictMode>
    <SearchProvider>
      <AuthContextProvider>
          <App />
      </AuthContextProvider>
    </SearchProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
