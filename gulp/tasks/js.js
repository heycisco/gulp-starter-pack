import webpack from 'webpack-stream';

export const js = () => {
	return app.gulp
		.src(app.path.src.js)
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'JS',
					message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(app.plugins.if(app.isDev, app.plugins.sourcemaps.init()))
		.pipe(
			webpack({
				mode: app.isBuild ? 'production' : 'development',
				output: {
					filename: 'app.js',
				},
				module: {
					rules: [
						{
							test: /\.(js)$/,
							exclude: /(node_modules)/,
							loader: 'babel-loader',
							options: {
								presets: ['@babel/env'],
							},
						},
					],
				},
			})
		)
		.pipe(app.plugins.if(app.isDev, app.plugins.sourcemaps.write()))
		.pipe(app.gulp.dest(app.path.build.js))
		.pipe(app.plugins.browsersync.stream());
};
