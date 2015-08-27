'use strict';

/**
 * Defines a function "-convert-to-list", which converts a given expression into
 * a comma-separated list. If the list contains expressions of length > 1, only
 * the first value is kept. In other words, the returned list can only be made
 * from single values.
 */
module.exports = function () {
	return function(style) {
		var nodes = this.nodes;
		style.define('-convert-to-list', function() {
			var list = new nodes.Expression(true);
			for (var i=0, len=arguments.length; i<len; i++) {
				if (arguments[i].nodeName !== 'null') {
					list.push(arguments[i]);
				}
			}
			return list
		});
	};
};
