import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import cssnano from 'cssnano';
import cleanCss from 'gulp-clean-css';
import postcssCenter from 'postcss-center';
import webpcss from 'webp-in-css/plugin.js';
import willChange from 'postcss-will-change-transition';
import flexBugsFixes from 'postcss-flexbugs-fixes';
import postcssCustomMedia from 'postcss-custom-media';
import sortMediaQuery from 'postcss-sort-media-queries';
import postcssNested from 'postcss-nested';
import postcssImport from 'postcss-import';
import postcssMixins from 'postcss-mixins';
import postcssSimpleVars from 'postcss-simple-vars';
import postcssShort from 'postcss-short';
import postcssPrettify from 'postcss-prettify';
// import postcssPxtorem from 'postcss-pxtorem';

// import tailwindcss from 'tailwindcss';
// import tailwindConfig from '../../tailwind.config.cjs';

const postCSS = [
	postcssImport(),
	postcssCustomMedia(),
	postcssSimpleVars(),
	postcssMixins(),
	postcssShort(),
	postcssCenter(),
	// tailwindcss(tailwindConfig),
	postcssPrettify(),
];

const postCssOptionsDev = [
	postcssNested(),
	cssnano({
		preset: [
			'lite',
			{
				normalizeWhitespace: false,
				discardComments: false,
				cssDeclarationSorter: { order: 'smacss' },
			},
		],
	}),
];

const postCssOptionsBuild = [
	postcssNested(),
	sortMediaQuery(),
	flexBugsFixes(),
	webpcss(),
	// postcssPxtorem({ rootValue: 16 }),
	willChange(),
	cssnano({
		preset: [
			'advanced',
			{
				cssDeclarationSorter: { order: 'smacss' },
				discardComments: { removeAll: true },
				normalizeWhitespace: false,
			},
			// Preset options: https://cssnano.co/docs/what-are-optimisations/
		],
	}),
];

export const css = () => {
	app.gulp
		.src(app.path.src.css)
		.pipe(rename({ extname: '.scss' }))
		.pipe(postcss(postCSS))
		.pipe(app.gulp.dest(app.path.build.css));
	return app.gulp
		.src(app.path.src.css)
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'CSS',
					message: 'Error: <%= error.message %>',
				}),
			),
		)
		.pipe(app.plugins.if(app.isDev, app.plugins.sourcemaps.init()))
		.pipe(app.plugins.replace(/\$img\//g, '../img/'))
		.pipe(postcss(postCSS))
		.pipe(postcss(app.isBuild ? postCssOptionsBuild : postCssOptionsDev))
		.pipe(app.plugins.if(app.isBuild, cleanCss()))
		.pipe(app.plugins.if(app.isDev, app.plugins.sourcemaps.write()))
		.pipe(rename({ extname: '.css' }))
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(app.plugins.browsersync.stream());
};
