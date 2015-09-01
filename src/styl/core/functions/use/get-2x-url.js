'use strict';
var path = require('path');
var url = require('url');
var unwrap = require('./utils/unwrap');

/**
 * Defines a function "-get-2x-url", which accepts the arguments of the standard
 * 'background' CSS property. The argument which is determined to be the
 * 'background-image' value is returned. If that argument is a url(...) call,
 * the returned url(...) call's path/URI is modified to include a "@2x" before
 * its file extension.
 */
module.exports = function () {
	return function(style) {
		var nodes = this.nodes;
		var none = new nodes.String('none', '');
		var urlRE = /^url\(['"]?(.*?)['"]?\)$/i;
		var dataUriRE = /^data:/i;
		
		function transformTo2xUrl(originalNode) {
			var oldUrl = urlRE.exec(originalNode.toString())[1];
			
			if (!oldUrl) {
				return none.clone();
			}
			if (dataUriRE.test(oldUrl)) {
				return originalNode;
			}
			
			var loc = url.parse(oldUrl, false, true);
			var ext = path.extname(loc.pathname);
			loc.pathname = path.join(path.dirname(loc.pathname),
									 path.basename(loc.pathname, ext) + '@2x' + ext);
			var newUrl = url.format(loc);
			
			return new nodes.Literal('url("' + newUrl + '")');
		}
		
		style.define('-get-2x-url', function(imageNode) {
			if (urlRE.test(imageNode.toString())) {
				imageNode = transformTo2xUrl(imageNode)
			}
			return imageNode;
		});
	};
};
