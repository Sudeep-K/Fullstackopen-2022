import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './reduxApp';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import noteReducer, { setNotes } from './reducers/noteReducer';
import filterReducer from './reducers/filterReducer';

const store = configureStore({
  reducer:{
    notes: noteReducer,
    filter: filterReducer,
    setNotes
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={ store }>
    <App />
  </Provider>
);


