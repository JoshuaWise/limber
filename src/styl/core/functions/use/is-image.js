'use strict';
var unwrap = require('./utils/unwrap');

/**
 * Defines a function "-is-image", which accepts a single value. If the value is
 * an <image> type, return true. Otherwise, false.
 * Docs for <image>: https://developer.mozilla.org/en-US/docs/Web/CSS/image
 */
module.exports = function () {
	return function(style) {
		var nodes = this.nodes;
		var urlRE = /^url\(.*\)$/i;
		var gradientRE = /^[-\w]*gradient\(.*\)$/i;
		var elementRE = /^[-\w]*element\(.*\)$/i;
		style.define('-is-image', function(node) {
			if (!node || arguments.length > 1) return nodes.false;
			var string = unwrap(node).toString();
			
			if (urlRE.test(string)) return nodes.true;
			if (gradientRE.test(string)) return nodes.true;
			if (elementRE.test(string)) return nodes.true;
			
			return nodes.false;
		});
	};
};
