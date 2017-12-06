module.exports = {
	devtool: 'inline-source-map',
	entry: './src/block.js',
	output: {
		path: __dirname,
		filename: 'block.build.js',
	},
	module: {
		loaders: [
			{
				test: /.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
		],
	},
};
