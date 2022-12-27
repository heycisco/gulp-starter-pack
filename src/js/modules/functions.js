// Отключение действий при нажатии на кнопки
export function preventClickDefault(elem) {
	elem.on('click', function (e) {
		e.preventDefault();
	});
}

/* Проверка поддержки webp, добавление класса webp или not-webp для HTML */
export function isWebp() {
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src =
			'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
	}
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.body.classList.add(className);
	});
}
