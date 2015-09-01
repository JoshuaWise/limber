'use strict';

var document = window.document;

module.exports = function (Limber) {
	function setLoaded(loaded) {
		var loader = document.getElementById('limber-loader');
		loader && loader.classList[loaded ? 'add' : 'remove']('loaded');
	}
	Limber.ready = setLoaded.bind(Limber, true);
	Limber.loading = setLoaded.bind(Limber, false);
};
