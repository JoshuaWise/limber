'use strict';
var path = require('path');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var stylus = require('gulp-stylus');
var stylusResolver = stylus.stylus.resolver;
var autoprefixer = require('gulp-autoprefixer');
var cleanCss = require('gulp-minify-css');

gulp.task('build-example-js', function() {
	var sourcePath = './index.js';
	var destPath = './examples/limber.min.js';
	
	return browserify(sourcePath, {debug: true})
		.require(sourcePath, {expose: 'limber'})
		.bundle()
		.pipe(source(sourcePath))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(uglify({
			compress: {
				unsafe: false
			},
			mangle: {
				keep_fnames: true,
				screw_ie8: true,
			}
		}))
		.pipe(rename(path.basename(destPath)))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(path.dirname(destPath)));
});

gulp.task('build-example-css', function () {
	var sourcePath = './index.styl';
	var destPath = './examples/limber.min.css';
	
	return gulp.src(sourcePath)
		.pipe(stylus({
			sourcemap: {inline: true},
			linenos: true,
			define: {url: stylusResolver({nocheck: true})},
			dest: path.dirname(destPath)
		}))
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(autoprefixer({browsers: [
			'chrome >= 31',
			'ff >= 31',
			'safari >= 7',
			'ie >= 11',
			'edge >= 1',
			'opera >= 28',
			'and_chr >= 44',
			'and_ff >= 40',
			'android >= 40',
			'ios >= 8',
			'ie_mob >= 11',
			'op_mob >= 30'
		]}))
		.pipe(cleanCss({
			processImport: false,
			rebase: false,
			roundingPrecision: -1,
			advanced: true,
			aggressiveMerging: false,
			restructuring: false,
			shorthandCompacting: true
		}))
		.pipe(rename(path.basename(destPath)))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(path.dirname(destPath)));
});

gulp.task('build-example-app-css', function () {
	var sourcePath = './examples/app.styl';
	var destPath = './examples/app.css';
	
	return gulp.src(sourcePath)
		.pipe(sourcemaps.init())
		.pipe(stylus({
			sourcemap: true,
			linenos: true
		}))
		.pipe(rename(path.basename(destPath)))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(path.dirname(destPath)));
});

gulp.task('build-example', ['build-example-css', 'build-example-js', 'build-example-app-css']);
gulp.task('default', ['build-example']);

gulp.task('watch', ['build-example'], function () {
	gulp.watch(['./src/*.styl', './src/styl/**/*.styl', './src/styl/**/*.js'], ['build-example-css']);
	gulp.watch(['./src/*.js', './src/js/**/*.js'], ['build-example-js']);
	gulp.watch('./examples/**/*.styl', ['build-example-app-css']);
});
