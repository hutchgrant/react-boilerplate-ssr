const path = require('path');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin'); // here so you can see what chunks are built
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const Copy = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	name: 'client',
	target: 'web',
	// devtool: 'source-map',
	devtool: 'eval',
	devServer: {
		hot: true
	},
	entry: [
		'babel-polyfill',
		'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
		'react-hot-loader/patch',
		path.resolve(__dirname, '../src/client/client.js')
	],
	output: {
		filename: '[name].js',
		chunkFilename: '[id].js',
		path: path.resolve(__dirname, '../buildClient'),
		publicPath: '/static/'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader?limit=10000&mimetype=application/font-woff'
			},
			{
				test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file-loader'
			},
			{
				test: /\.scss$/,
				use: ExtractCssChunks.extract({
					use: [
						{
							loader: 'css-loader'
							// options: {
							// 	modules: true,
							// 	localIdentName:
							// 		'[name]__[local]--[hash:base64:5]'
							// }
						},
						{
							loader: 'resolve-url-loader'
						},
						{
							loader: 'sass-loader'
						}
					]
				})
			}
		]
	},
	resolve: {
		extensions: ['.js', '.css', '.scss']
	},
	plugins: [
		new WriteFilePlugin(),
		new ExtractCssChunks(),
		new webpack.optimize.CommonsChunkPlugin({
			names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
			filename: '[name].js',
			minChunks: Infinity
		}),

		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
				IS_BROWSER: true
			}
		}),
		new Dotenv({
			path: './.env',
			systemvars: false
		}),
		new Copy([
			{ from: 'public' },
			{ from: 'node_modules/font-awesome/fonts', to: 'fonts' },
			{
				from: 'node_modules/bootstrap-sass/assets/fonts/bootstrap',
				to: 'fonts'
			}
		])
	]
};
