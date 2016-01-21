gulp = require 'gulp'
coffee = require 'gulp-coffee'
stylus = require 'gulp-stylus'

globs = {
	coffee: "./components/coffee/*.coffee"
	coffee_main: "./components/coffee/!(gulpfile|xkout).coffee",
	coffee_root: "./components/coffee/?(gulpfile|xkout).coffee",
	stylus: "./components/stylus/*.styl"
}

gulp.task 'default', ->
	gulp.watch globs.coffee, ['js']
	gulp.watch globs.stylus, ['css']
	return

gulp.task 'js', ->
	gulp
		.src globs.coffee_main
		.pipe coffee bare: true
		.pipe gulp.dest './scripts'
	gulp
		.src globs.coffee_root
		.pipe coffee bare: true
		.pipe gulp.dest './'
	return

gulp.task 'css', ->
	gulp
		.src globs.stylus
		.pipe stylus()
		.pipe gulp.dest './public/_sty/'
	return
