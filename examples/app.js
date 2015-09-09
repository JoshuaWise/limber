'use strict';

(function () {
	
	var limber = require('limber');
	console.log('This is a limber example app.');
	
	var loadTimer = setInterval(function () {
		limber.loader.progress += 10;
	}, 50);
	
	limber.loader.on('load', function () {
		clearInterval(loadTimer);
	});
	
}());
