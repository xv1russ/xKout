var coffee, globs, gulp, stylus;

gulp = require('gulp');

coffee = require('gulp-coffee');

stylus = require('gulp-stylus');

globs = {
  coffee: "./components/coffee/*.coffee",
  coffee_main: "./components/coffee/!(gulpfile|xkout).coffee",
  coffee_root: "./components/coffee/?(gulpfile|xkout).coffee",
  stylus: "./components/stylus/*.styl"
};

gulp.task('default', function() {
  gulp.watch(globs.coffee, ['js']);
  gulp.watch(globs.stylus, ['css']);
});

gulp.task('js', function() {
  gulp.src(globs.coffee_main).pipe(coffee({
    bare: true
  })).pipe(gulp.dest('./scripts'));
  gulp.src(globs.coffee_root).pipe(coffee({
    bare: true
  })).pipe(gulp.dest('./'));
});

gulp.task('css', function() {
  gulp.src(globs.stylus).pipe(stylus()).pipe(gulp.dest('./public/_sty/'));
});
