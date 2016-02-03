'use strict'
/*
  ~~~ DECLARATIONS ~~~
*/
// -- CONSTANTS --
// Requires
const gulp = require('gulp')
const stylus = require('gulp-stylus')
// Instants
const browserSync = require('browser-sync')
  .create()
// Options
const globs = {
  javascript: './*.js',
  javascriptClient: './public/_scr/*.js',
  stylus: './components/stylus/*.styl',
  jade: './views/*.jade'
}
/*
  ~~~ GULP TASKS ~~~
*/
// -- DEFAULT TASK --
gulp.task('default', ['css'])
// -- STYLUS PREPROCESSING --
gulp.task('css', () => {
  gulp.src(globs.stylus).pipe(stylus()).pipe(gulp.dest('./public/_sty/'))
})
// -- DEVELOPMENT TASK --
gulp.task('dev', () => {
  browserSync.init({
    proxy: 'localhost:8080/chat'
  })
  // Watches
  gulp.watch(globs.javascript, ['reload'])
  gulp.watch(globs.javascriptClient, ['reload'])
  gulp.watch(globs.stylus, ['css', 'reload'])
  gulp.watch(globs.jade, ['reload'])
})
// -- BROWSER RELOADING --
gulp.task('reload', () => {
  browserSync.reload()
})
