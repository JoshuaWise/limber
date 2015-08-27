'use strict';
var path = require('path');
var url = require('url');

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
		
		// Taken from utils.js at https://github.com/stylus/stylus
		function utilsUnwrap(expr) {
			if (expr.preserve) return expr;
			if ('arguments' != expr.nodeName && 'expression' != expr.nodeName) return expr;
			if (1 != expr.nodes.length) return expr;
			if ('arguments' != expr.nodes[0].nodeName && 'expression' != expr.nodes[0].nodeName) return expr;
			return utilsUnwrap(expr.nodes[0]);
		}
		
		function unwrap(expr) {
			expr = utilsUnwrap(expr);
			if (expr.nodeName == 'expression' || expr.nodeName == 'arguments') {
				if (expr.nodes.length) expr = expr.nodes[0];
			}
			return expr;
		}
		
		function getFirstUrlNode(args) {
			for (var i=0, len=args.length; i<len; i++) {
				var arg = args[i];
				if (!arg) continue;
				
				var node = unwrap(arg);
				if (node.nodeName === 'call' || node.operate('==', none).isTrue) {
					return node;
				}
			}
			return none;
		}
		
		function transformTo2xUrl(originalNode) {
			var unwrappedArgumentNode = utilsUnwrap(originalNode.args)
			if (!unwrappedArgumentNode.nodes.length) {
				return none;
			}
			
			var stringNode = unwrap(unwrappedArgumentNode.nodes[0]);
			var oldUrl = stringNode.string || stringNode.toString();
			if (/^data:/i.test(oldUrl)) {
				return originalNode;
			}
			
			var loc = url.parse(oldUrl);
			var ext = path.extname(loc.pathname);
			loc.pathname = path.join(path.dirname(loc.pathname),
									 path.basename(loc.pathname, ext) + '@2x' + ext);
			var newUrl = url.format(loc);
			
			var callArgumentsNode = new nodes.Arguments;
			callArgumentsNode.push(new nodes.String(newUrl));
			return new nodes.Call(originalNode.name, callArgumentsNode);
		}
		
		style.define('-get-2x-url', function() {
			var urlNode = getFirstUrlNode(arguments);
			
			if (urlNode.nodeName === 'call' && urlNode.name.toLowerCase() === 'url') {
				urlNode = transformTo2xUrl(urlNode)
			}
			
			return urlNode;
		});
	};
};
