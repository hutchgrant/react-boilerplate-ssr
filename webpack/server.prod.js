const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const res = p => path.resolve(__dirname, p);

const entry = res('../src/server/helpers/renderer.js');
const output = res('../buildServer');

module.exports = {
	name: 'server',
	target: 'node',
	devtool: 'source-map',
	entry: ['babel-polyfill', entry],
	output: {
		path: output,
		filename: '[name].js',
		libraryTarget: 'commonjs2'
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
