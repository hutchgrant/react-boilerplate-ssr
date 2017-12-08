// Startup point for the client side application
// import 'babel-polyfill';
import 'jquery/src/jquery';
import 'bootstrap/dist/js/bootstrap.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import AppContainer from 'react-hot-loader/lib/AppContainer';
import axios from 'axios';
import * as actions from './actions/auth';

import Routes from './routes';
import reducers from './reducers';
import Client from './routes/Client';

const axiosInstance = axios.create({
	baseURL: '/api'
});

const store = createStore(
	reducers,
	window.INITIAL_STATE,
	applyMiddleware(thunk.withExtraArgument(axiosInstance))
);

const render = async () => {
	await store.dispatch(actions.fetchUser());
	const routeType = store.getState().auth.admin ? 'admin' : 'guest';
	const resRoutes = await Routes(routeType).then(res => res);
	ReactDOM.hydrate(
		<AppContainer>
			<Provider store={store}>
				<BrowserRouter>
					<div className="page">{renderRoutes(resRoutes)}</div>
				</BrowserRouter>
			</Provider>
		</AppContainer>,
		document.getElementById('root')
	);
};

if (process.env.NODE_ENV === 'development' && module.hot) {
	module.hot.accept();
	module.hot.accept('./reducers', () => {
		const nextReducer = require('./reducers/index');
		store.replaceReducer(nextReducer);
	});
}

render();
