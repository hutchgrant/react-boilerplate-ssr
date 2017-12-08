import React from 'react';
import ReactDOM from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';

import Routes from '../../client/routes';
import { fetchUser } from '../../client/actions/auth';
import createStore from './createStore';

export default ({ clientStats }) => async (req, res) => {
	const store = createStore(req);
	/* determine if logged in, if so render with alt route file */
	await store.dispatch(fetchUser());
	const routeType = store.getState().auth.admin ? 'admin' : 'guest';
	const resRoutes = await Routes(routeType).then(res => res);
	/* prefetch data based on route */
	const promises = matchRoutes(resRoutes, req.path)
		.map(({ route }) => {
			return route.preload ? store.dispatch(route.preload) : null;
		})
		.map(promise => {
			if (promise) {
				return new Promise((resolve, reject) => {
					promise.then(resolve).catch(resolve);
				});
			}
		});
	/* render routes + page with webpack chunks */
	Promise.all(promises).then(() => {
		const context = {};

		if (context.url) {
			return res.redirect(302, context.url);
		}
		if (context.notFound) {
			res.status(404);
		}
		const app = ReactDOM.renderToString(
			<Provider store={store}>
				<StaticRouter location={req.path} context={context}>
					<div className="page">{renderRoutes(resRoutes)}</div>
				</StaticRouter>
			</Provider>
		);
		const helmet = Helmet.renderStatic();

		/* get webpack chunks */
		const chunkNames = flushChunkNames();
		const { js, styles, cssHash, scripts, stylesheets } = flushChunks(
			clientStats,
			{ chunkNames }
		);

		// uncomment for development chunk testing
		// console.log('PATH', req.path);
		// console.log('DYNAMIC CHUNK NAMES RENDERED', chunkNames);
		// console.log('SCRIPTS SERVED', scripts);
		// console.log('STYLESHEETS SERVED', stylesheets);

		res.send(
			`<!doctype html>
            <html>
            <head>
                <meta charset="utf-8">
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                <title>react-boilerplate-ssr</title>
                ${styles}
            </head>
            <body>
                <div id="root">${app}</div>
                <script>
                    window.INITIAL_STATE = ${serialize(store.getState())}
                </script>
                ${cssHash}
                ${js}                
            </body>
            </html>`
		);
	});
};
