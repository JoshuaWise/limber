'use strict';

var document = window.document;

module.exports = function (Limber) {
	Limber.loader = new Loader;
};

function Loader() {
	function setLoaded(loaded) {
		var loaderEl = document.getElementById('limber-loader');
		loaderEl && loaderEl.classList[loaded ? 'add' : 'remove']('loaded');
	}
	this.ready = setLoaded.bind(this, true);
	this.loading = setLoaded.bind(this, false);
	
	var progress = 0;
	Object.defineProperty(this, 'progress', {
		get: function () {return progress;},
		set: function (val) {
			progress = +val || 0;
			var progressEl = document.getElementById('limber-progress');
			progressEl && progressEl.style.fontSize = progress + 'vw';
		}
	});
}
