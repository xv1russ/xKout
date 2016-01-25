var browserSync, coffee, globs, gulp, stylus;

gulp = require('gulp');

coffee = require('gulp-coffee');

stylus = require('gulp-stylus');

browserSync = require('browser-sync').create();

globs = {
  coffee: "./components/*/*.coffee",
  coffee_main: "./components/coffee/!(gulpfile|xkout).coffee",
  coffee_root: "./components/coffee/?(gulpfile|xkout).coffee",
  coffee_public: "./components/coffee_public/*.coffee",
  stylus: "./components/stylus/*.styl",
  jade: "./views/*.jade"
};

gulp.task('default', ['js', 'css']);

gulp.task('js', function() {
  console.log('running js task');
  gulp.src(globs.coffee_main).pipe(coffee({
    bare: true
  })).pipe(gulp.dest('./scripts'));
  gulp.src(globs.coffee_root).pipe(coffee({
    bare: true
  })).pipe(gulp.dest('./'));
  gulp.src(globs.coffee_public).pipe(coffee({
    bare: true
  })).pipe(gulp.dest('./public/_scr/'));
});

gulp.task('css', function() {
  console.log('running css task');
  gulp.src(globs.stylus).pipe(stylus()).pipe(gulp.dest('./public/_sty/'));
});

gulp.task('dev', function() {
  console.log('running browserinit task');
  browserSync.init({
    proxy: "localhost:8080/chat"
  });
  gulp.watch(globs.stylus, ['css', 'reload']);
  gulp.watch(globs.coffee, ['js', 'reload']);
  gulp.watch(globs.jade, ['reload']);
});

gulp.task('reload', function() {
  return browserSync.reload();
});
