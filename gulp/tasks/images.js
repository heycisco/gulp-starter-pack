import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';
import sharpResponsive from 'gulp-sharp-responsive';

export const images = () => {
	return (
		app.gulp
			.src(app.path.src.images)
			.pipe(
				app.plugins.plumber(
					app.plugins.notify.onError({
						title: 'IMAGES',
						message: 'Error: <%= error.message %>',
					})
				)
			)
			.pipe(app.plugins.newer(app.path.build.images))
			.pipe(webp())
			// .pipe(
			// 	app.plugins.if(
			// 		app.isBuild,
			// 		sharpResponsive({
			// 			includeOriginalFile: true,
			// 			formats: [
			// 				{ width: 640, rename: { suffix: '-sm' } },
			// 				{ width: 1024, rename: { suffix: '-lg' } },
			// 			],
			// 		})
			// 	)
			// )
			.pipe(app.gulp.dest(app.path.build.images))
			.pipe(app.gulp.src(app.path.src.images))
			.pipe(app.plugins.newer(app.path.build.images))
			.pipe(
				app.plugins.if(
					app.isBuild,
					imagemin({
						progressive: true,
						svgoPlugins: [{ removeViewBox: false }],
						interlaced: true,
						optimizationLevel: 4,
					})
				)
			)
			.pipe(
				app.plugins.if(
					app.isBuild,
					sharpResponsive({
						includeOriginalFile: true,
						formats: [
							{ width: 640, rename: { suffix: '-sm' } },
							{ width: 1024, rename: { suffix: '-lg' } },
						],
					})
				)
			)
			.pipe(app.gulp.dest(app.path.build.images))
			.pipe(app.gulp.src(app.path.src.svg))
			.pipe(app.gulp.dest(app.path.build.images))
			.pipe(app.plugins.browsersync.stream())
	);
};
