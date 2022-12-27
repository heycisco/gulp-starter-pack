'use strict';
// import jQuery from 'jquery';
// window.$ = window.jQuery = jQuery;
import * as functions from './modules/functions.js';

window.addEventListener('load', function () {
	functions.isWebp();
	// functions.preventClickDefault($('form'));
});

window.addEventListener('resize', function () {
	clearTimeout(window.resizedFinished);
	window.resizedFinished = setTimeout(function () {
		// window resize functions
	}, 100);
});

let timer;
window.addEventListener(
	'scroll',
	function () {
		if (timer !== null) {
			clearTimeout(timer);
		}
		timer = setTimeout(function () {
			const pageOffset = Math.round(window.pageYOffset);
			pageOffset > 300
				? document.body.classList.add('scrolled')
				: document.body.classList.remove('scrolled');
			// scroll functions
		}, 100);
	},
	false,
);
