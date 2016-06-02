const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	cache: true,
	debug: true,
	context: process.cwd(),
	devtool: 'source-map',
	devServer: {
		inline: true,
		port: 3333
	},
	resolve: {
		root: [
			path.resolve('./node_modules')
		],
		extensions: ['', '.js']
	},
	resolveLoader: {
		root: path.join(process.cwd(), 'node_modules')
	},
	entry: {
		"main": "./src/js/main.js"
	},
	output: {
		path: path.join(process.cwd(), 'build'),
		filename: '[name].js',
		sourceMapFilename: '[file].map'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.ejs'
		}),
		new ExtractTextPlugin("[name].css")
	],
	module: {
		preLoaders: [{
			test: /\.js$/,
			loader: 'eslint',
			exclude: [/node_modules/]
		}],
		loaders: [{
			test: /\.css$/,
			loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
		},{
			test: /\.scss$/,
			loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
		},{
			test: /\.js$/,
			exclude: [/node_modules/],
			loader: 'babel'
		}]
	},
	eslint: {
		failOnError: true
	}
};
