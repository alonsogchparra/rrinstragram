import 'babel-polyfill'; // for redux-saga
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';

import {createStore, applyMiddleware, compose} from 'redux';

import reducer from './reducer';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

import Layout from './components/layout';
import { HomeContainer } from './components/home';
import { DetailContainer } from './components/detail';
import { AddContainer } from './components/add';

import '../dist/css/style.css';

filepicker.setKey("A0QJtRxcISLKPF43iFs70z");

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducer,
    compose(
        applyMiddleware(sagaMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f // connect to redux devtools
    )
);
sagaMiddleware.run(rootSaga);

const routes = <Route component={Layout}>
    <Route path="/" component={HomeContainer} />
    <Route path="/detail/:id" component={DetailContainer} />
    <Route path="/add" component={AddContainer} />
</Route>;

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>{routes}</Router>
    </Provider>,
    document.getElementById('app')
);
