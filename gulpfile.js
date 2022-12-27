import gulp from 'gulp';
import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js';

global.app = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	path: path,
	gulp: gulp,
	plugins: plugins,
};

import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { css } from './gulp/tasks/postcss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { svgIcons } from './gulp/tasks/svgSprite.js';
import { otfToTtf, ttfToWoff, fontsStyle, iconFont } from './gulp/tasks/fonts.js';
import { zip } from './gulp/tasks/zip.js';
import { ftp } from './gulp/tasks/ftp.js';

function watcher() {
	gulp.watch(path.watch.files, copy);
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.css, css);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.images, images);
	// gulp.watch(path.watch.html, gulp.series(html, ftp));
}

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle, iconFont);
const icons = gulp.series(svgIcons);
const mainTasks = gulp.series(
	fonts,
	gulp.parallel(copy, html, css, js, images),
);
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const createZip = gulp.series(reset, mainTasks, zip);
const uploadFTP = gulp.series(reset, mainTasks, ftp);
const one = gulp.series(reset, css);

export { icons };
export { build };
export { createZip };
export { uploadFTP };
export { one };
gulp.task('default', dev);
