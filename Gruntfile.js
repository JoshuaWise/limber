'use strict';
var fs = require('fs');
var pathJoin = require('path').join;

module.exports = function(grunt) {
    
    grunt.registerTask('build', 'Updates the example css and js.', function() {
		var sourcePath = pathJoin(__dirname, 'limber.styl');
		var outputPath = pathJoin(__dirname, 'example', 'limber.css');
		
		var style = require('stylus')('' + fs.readFileSync(sourcePath));
		style
			.use(require('autoprefixer-stylus')({browsers: [
				'chrome >= 31',
				'ff >= 31',
				'safari >= 7',
				'ie >= 10',
				'edge >= 1',
				'opera >= 28',
				'and_chr >= 44',
				'and_ff >= 40',
				'android >= 40',
				'ios >= 8',
				'ie_mob >= 11',
				'op_mob >= 30'
			]}))
			.set('filename', './limber.styl')
			.set('sourcemap', {comment: true, inline: false, basePath: '.'})
			.render(function(err, css) {
				if (err) {throw err;}
				fs.writeFileSync(outputPath, css);
				fs.writeFileSync(outputPath + '.map', style.sourcemap);
			});
    });
    
};
