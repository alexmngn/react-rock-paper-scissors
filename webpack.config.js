const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = 'development';

module.exports = {
	cache: true,
	debug: true,
	devtool: 'source-map',
	devServer: {
		inline: true,
		port: 3333
	},
	resolve: {
		root: path.resolve('src'),
		extensions: ['.js', '.json', '.jsx', ''],
	},
	resolveLoader: {
		root: [path.join(process.cwd(), 'node_modules')]
	},
	entry: [
		require.resolve('react-dev-utils/webpackHotDevClient'),
		path.resolve('src/index.jsx'),
	],
	output: {
		path: path.resolve('build'),
		filename: 'static/js/bundle.js',
		sourceMapFilename: 'bundle.map',
		publicPath: '/'
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: path.resolve('public/index.html'),
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		preLoaders: [{
			test: /\.(js|jsx)$/,
			loader: 'eslint',
			exclude: [/node_modules/]
		}],
		loaders: [{
			exclude: [
				/\.html$/,
				/\.(js|jsx)$/,
				/\.scss$/,
				/\.css$/,
				/\.json$/,
				/\.svg$/
			],
			loader: 'url',
			query: {
				limit: 10000,
				name: 'static/media/[name].[hash:8].[ext]'
			}
		}, {
			test: /\.css$/,
			loader: 'style!css?importLoaders=1!postcss'
		},{
			test: /\.scss$/,
			loader: 'style!css?importLoaders=1&localIdentName=[local]_[hash:base64:5]!postcss!sass'
		},{
			test: /\.(js|jsx)$/,
			include: [/(src|test)/],
			loader: 'babel'
		}]
	},
	postcss: function() {
		return [
			autoprefixer({
				browsers: [
					'>1%',
					'last 4 versions',
					'Firefox ESR',
					'not ie < 9',
				]
			}),
		];
	},
	eslint: {
		failOnError: true,
	}
};
