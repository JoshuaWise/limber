'use strict';

/**
 * Defines a function "-contains-url-call", which accepts a list of unwrapped
 * values to check. If any of those values are a Call node with name "url",
 * returns true. Otherwise, returns false.
 */
module.exports = function () {
	return function(style) {
		var nodes = this.nodes;
		var urlRE = /^url\(.*\)$/i;
		style.define('-contains-url-call', function() {
			for (var i=0, len=arguments.length; i<len; i++) {
				var node = arguments[i];
				if (node && urlRE.test(node.toString())) {
					return nodes.true;
				}
			}
			return nodes.false;
		});
	};
};
