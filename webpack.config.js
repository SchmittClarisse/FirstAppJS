const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
module.exports = {
	entry: './src/js/index.js',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'assets',
					},
				},
			},
		],
	},
	devtool: "source-map",
	plugins: [
		new HtmlWebpackPlugin({
			hash: false,
			title: 'GamesAppSPA',
			template: './public/index.html',
			filename: 'index.html',
		}),
		new Dotenv()
	],

}
