'use strict';

var util = require('util');
var EventEmitter = require('events');
var document = window.document;
var Math = window.Math;

module.exports = function (Limber) {
	var progressUnit = Limber.__getStylVariable('loader-progress-unit');
	Limber.loader = new Loader(progressUnit);
};

function Loader(progressUnit) {
	EventEmitter.call(this);
	
	var progress = 0;
	Object.defineProperty(this, 'progress', {
		get: function () {return progress;},
		set: function (val) {
			var previous = progress;
			progress = Math.min(Math.max(+val || 0, 0), 100);
			
			if (progress < 100 && previous === 100) {
				updateProgressBar(true);
				this.emit('loading');
			}
			this.emit('progress', previous, progress);
		}
	});
	
	this.on('progress', function (previous) {
		if (previous == null) previous = progress;
		updateProgressBar();
		progress === 100 && previous < 100 && this.emit('load');
	});
	this.on('load', setLoaded.bind(this, true));
	this.on('loading', setLoaded.bind(this, false));
	
	function updateProgressBar(reflow) {
		var progressEl = document.getElementById('limber-progress');
		if (progressEl) {
			progressEl.style.fontSize = progress + progressUnit;
			reflow && progressEl.offsetHeight;
		}
	}
	function setLoaded(loaded) {
		var loaderEl = document.getElementById('limber-loader');
		loaderEl && loaderEl.classList[loaded ? 'add' : 'remove']('loaded');
	}
}
util.inherits(Loader, EventEmitter);
