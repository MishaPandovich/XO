let path = require('path');

let conf = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, './dist/'), //куда выводить
		filename: 'main.js', // название файла
		publicPath: 'dist/'
	},
	module: {
	  rules: [
	    {
	      test: /\.m?js$/,
	      exclude: /(node_modules|bower_components)/,
	      use: {
	        loader: 'babel-loader',
	        options: {
	          presets: ['@babel/preset-env']
	        }
	      }
	    }
	  ]
	}
};

module.exports = conf;