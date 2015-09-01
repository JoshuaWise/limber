'use strict';

var matchMedia = window.matchMedia;

module.exports = function (Limber) {
	Limber.mq = {};
	
	var queryStrings = {
		phone: Limber.__getStylVariable('phone'),
		tablet: Limber.__getStylVariable('tablet'),
		desktop: Limber.__getStylVariable('desktop'),
		phoneOnly: Limber.__getStylVariable('phone-only'),
		tabletOnly: Limber.__getStylVariable('tablet-only'),
		desktopOnly: Limber.__getStylVariable('desktop-only'),
		viewportMin: Limber.__getStylVariable('viewport-min'),
		viewportMax: Limber.__getStylVariable('viewport-max'),
		retina: Limber.__getStylVariable('retina')
	};
	
	function update() {
		if (Limber.mq && typeof Limber.mq === 'object') {
			for (var key in queryStrings) Limber.mq[key] = !!matchMedia(queryStrings[key]).matches;
		}
	}
	
	update();
	setTimeout(update, 0);
	window.addEventListener('resize', update);
};
