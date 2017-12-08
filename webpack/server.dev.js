const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const res = p => path.resolve(__dirname, p);

const nodeModules = res('../node_modules');
const entry = res('../src/server/helpers/renderer.js');
const output = res('../buildServer');

// if you're specifying externals to leave unbundled, you need to tell Webpack
// to still bundle `react-universal-component`, `webpack-flush-chunks` and
// `require-universal-module` so that they know they are running
// within Webpack and can properly make connections to client modules:
const externals = fs
	.readdirSync(nodeModules)
	.filter(
		x => !/\.bin|react-universal-component|webpack-flush-chunks/.test(x)
	)
	.reduce((externals, mod) => {
		externals[mod] = `commonjs ${mod}`;
		return externals;
	}, {});

externals['react-dom/server'] = 'commonjs react-dom/server';

module.exports = {
	name: 'server',
	target: 'node',
	// devtool: 'source-map',
	devtool: 'eval',
	devServer: {
		hot: true
	},
	entry: ['babel-polyfill', entry],
	externals,
	output: {
		path: output,
		filename: '[name].js',
		libraryTarget: 'commonjs2',
		publicPath: 'buildServer/'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'css-loader/locals'
						// options: {
						// 	modules: true,
						// 	localIdentName: '[name]__[local]--[hash:base64:5]'
						// }
					},
					{
						loader: 'resolve-url-loader'
					},
					{
						loader: 'sass-loader'
					}
				]
			}
		]
	},
	resolve: {
		extensions: ['.js', '.css', '.scss']
	},
	plugins: [
		new WriteFilePlugin(),
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
				IS_BROWSER: false
			}
		}),
		new Dotenv({
			path: './.env',
			systemvars: true
		})
	]
};
