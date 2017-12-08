const path = require('path');
const webpack = require('webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const Copy = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	name: 'client',
	target: 'web',
	devtool: 'source-map',
	entry: [
		'babel-polyfill',
		path.resolve(__dirname, '../src/client/client.js')
	],
	output: {
		filename: '[chunkhash].js',
		chunkFilename: '[chunkhash].js',
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
		new ExtractCssChunks(),
		new webpack.optimize.CommonsChunkPlugin({
			names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
			filename: '[name].[chunkhash].js',
			minChunks: Infinity
		}),

		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
				IS_BROWSER: true
			}
		}),
		new Dotenv({
			path: './.env',
			systemvars: true
		}),
		new Copy([
			{ from: 'public' },
			{ from: 'node_modules/font-awesome/fonts', to: 'fonts' },
			{
				from: 'node_modules/bootstrap-sass/assets/fonts/bootstrap',
				to: 'fonts'
			}
		]),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				screw_ie8: true,
				warnings: false
			},
			mangle: {
				screw_ie8: true
			},
			output: {
				screw_ie8: true,
				comments: false
			},
			sourceMap: true
		}),
		new webpack.HashedModuleIdsPlugin() // not needed for strategy to work (just good practice)
	]
};
