'use strict'
const gulp = require('gulp')
const stylus = require('gulp-stylus')
const browserSync = require('browser-sync')
  .create()

const globs = {
  javascript: './*.js',
  javascriptClient: './public/_scr/*.js',
  stylus: './components/stylus/*.styl',
  jade: './views/*.jade'
}

gulp.task('default', ['css'])

gulp.task('css', () => {
  gulp.src(globs.stylus).pipe(stylus()).pipe(gulp.dest('./public/_sty/'))
})

gulp.task('dev', () => {
  browserSync.init({
    proxy: 'localhost:8080/chat'
  })
  gulp.watch(globs.stylus, ['css', 'reload'])
  gulp.watch(globs.jade, ['reload'])
})

gulp.task('reload', () => {
  browserSync.reload()
})
