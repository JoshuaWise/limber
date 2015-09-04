'use strict';

(function () {
	
	var limber = require('limber');
	console.log('This is a limber example app.');
	
	setTimeout(function () {
		limber.ready();
	}, 100);
	
}());