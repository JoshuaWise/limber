'use strict';

var document = window.document;
var getComputedStyle = window.getComputedStyle;

module.exports = {
	__getStylVariable: function (variableName) {
		var el = document.createElement('meta');
		el.style.className = 'limber-var-' + variableName;
		return getComputedStyle(el).backgroundImage;
	}
};
