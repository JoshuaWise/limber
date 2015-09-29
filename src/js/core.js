'use strict';

var document = window.document;
var getComputedStyle = window.getComputedStyle;

module.exports = {
	__getStylVariable: function (variableName) {
		var el = document.createElement('meta');
		el.className = 'limber-var-' + variableName;
		document.head.appendChild(el);
		var value = getComputedStyle(el).fontFamily.replace(/^['"](.*)['"]$/, '$1');
		document.head.removeChild(el);
		return value;
	}
};
