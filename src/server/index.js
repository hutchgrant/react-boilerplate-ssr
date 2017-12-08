/*
*  Modified index.js from universal-demo to work with Stephen Grider's react-ssr api
*  author: faceyspacey
*  repository: https://github.com/faceyspacey/universal-demo 
*  license: MIT
*/

require('colors');
const express = require('express');
const proxy = require('express-http-proxy');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const clientConfig = require('../../webpack/client.dev');
const serverConfig = require('../../webpack/server.dev');
const clientConfigProd = require('../../webpack/client.prod');
const serverConfigProd = require('../../webpack/server.prod');
const path = require('path');

const publicPath = clientConfig.output.publicPath;
const outputPath = clientConfig.output.path;

const DEV = process.env.NODE_ENV === 'development';
const app = express();

let isBuilt = false;

const done = () =>
	!isBuilt &&
	app.listen(3000, () => {
		isBuilt = true;
		console.log(
			'BUILD COMPLETE -- Listening @ http://localhost:3000'.magenta
		);
	});
app.use(
	'/api',
	proxy('http://localhost:5000', {
		proxyReqOptDecorator(opts) {
			opts.headers['x-forwarded-host'] = 'localhost:3000';
			return opts;
		}
	})
);

if (DEV) {
	const compiler = webpack([clientConfig, serverConfig]);
	const clientCompiler = compiler.compilers[0];
	const options = { publicPath, stats: { colors: true } };

	app.use(webpackDevMiddleware(compiler, options));
	app.use(webpackHotMiddleware(clientCompiler));
	app.use(webpackHotServerMiddleware(compiler));

	compiler.plugin('done', done);
} else {
	webpack([clientConfigProd, serverConfigProd]).run((err, stats) => {
		const clientStats = stats.toJson().children[0];
		const serverRender = require('../../buildServer/main.js').default;
		app.use(publicPath, express.static(outputPath));

		app.use(serverRender({ clientStats }));

		done();
	});
}
