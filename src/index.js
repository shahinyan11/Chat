import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import reducers from './store/reducers'
import watchers from './store/sagas'
import createSageMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';
import './asset/sass/app.scss'
import './asset/css/custome.css'
import Pusher from 'pusher-js';
require('dotenv').config();


const saga = createSageMiddleware();

const store = createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware(saga)

    )

);

saga.run(watchers);

if (document.getElementById('root')) {
    ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>, document.getElementById('root'));
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
