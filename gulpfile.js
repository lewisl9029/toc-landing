var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');

function handleError(error) {
  console.error(error);
  this.emit('end');
};

gulp.task('watch', function watch() {
  gulp.watch(['./app/*.html'], ['reload']);
  gulp.watch(['./app/*.js'], ['reload']);
  gulp.watch(['./app/*.css'], ['reload']);
  gulp.watch(['./app/assets/**'], ['reload']);
  gulp.watch(['./app/*.scss'], ['scss']);
});

gulp.task('reload', function reload() {
  return gulp.src('')
    .pipe(connect.reload());
});

gulp.task('scss', function scss() {
  return gulp.src('./app/*.scss')
    .pipe(sass())
    .on('error', handleError)
    .pipe(gulp.dest('./app'));
});

gulp.task('serve', function serve() {
  return connect.server({
    root: 'app',
    port: 8200,
    livereload: {
      port: 8201
    }
  });
});

gulp.task('default', ['serve', 'watch', 'scss']);
