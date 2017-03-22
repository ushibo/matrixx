import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import reducer from './reducers'
import App from './App';
import './index.css';

const initialState = {
  text: "",
  isFetching: false,
  isSendCompleted: false,
  currentUser: null,
};
document.title = "Matrixx";
const store = createStore(reducer, initialState, applyMiddleware(
  thunkMiddleware,
  promiseMiddleware()
));

ReactDOM.render(
  <div id="full">
    <div id="background"></div>
    <div id="midground"></div>
    <div id="foreground"></div>

    <Provider store={store}>
      <App />
    </Provider>
  </div>, document.getElementById('root')
);
