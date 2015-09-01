'use strict';

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

module.exports = unwrap;
unwrap.utilsUnwrap = utilsUnwrap;
