import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());
const buildFolder = `./dist`;
// const buildFolder = process.env.npm_package_name;
const cleanFolder = [`./dist/{css,js,img}`, `./dist/*.*`];
const srcFolder = `./src`;

export const path = {
	build: {
		js: `${buildFolder}/js/`,
		css: `${buildFolder}/css/`,
		html: `${buildFolder}/`,
		images: `${buildFolder}/img/`,
		fonts: `${buildFolder}/fonts/`,
		files: `${buildFolder}/files/`,
	},
	src: {
		js: `${srcFolder}/js/app.js`,
		css: `${srcFolder}/css/style.css`,
		html: `${srcFolder}/*.{html,pug,php,ico}`,
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
		imagesVariants: `${srcFolder}/img/`,
		svg: `${srcFolder}/img/**/*.svg`,
		svgicons: `${srcFolder}/icons/*.svg`,
		files: `${srcFolder}/files/**/*.*`,
	},
	watch: {
		js: `${srcFolder}/js/**/*.js`,
		css: `${srcFolder}/css/**/*.css`,
		html: `${srcFolder}/**/*.{html,pug,php}`,
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg}`,
		svgicons: `${srcFolder}/icons/*.svg`,
		files: `${srcFolder}/files/**/*.*`,
	},
	clean: cleanFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder,
	ftp: `httpdocs`,
};
