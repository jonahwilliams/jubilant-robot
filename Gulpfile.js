'use strict';
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const envify = require('loose-envify/custom');
const gutil = require('gutil');
const browserify = require('browserify');
const babelify = require('babelify');

const config = {
  debug: false,
  env: 'production'
};


gulp.task('make-index', () => {
  browserify('./src/index.js', { debug: config.debug})
    .transform(babelify)
    .transform(envify({_: 'purge', NODE_ENV: 'production', global: true}))
    .bundle()
    .on('error', function (error) {
      gutil.log('Browserify Error', error.message);
      this.emit('end');
    })
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('make-worker', () => {
  browserify('./src/worker.js', { debug: config.debug })
  .transform(babelify)
  .transform(envify({_: 'purge', NODE_ENV: 'production', global: true}))
  .bundle()
  .on('error', function (error) {
    gutil.log('Browserify Error', error.message);
    this.emit('end');
  })
  .pipe(source('worker.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('./dist/'));
});

gulp.task('make-service-worker', () => {
  gulp.src('./src/service.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('html', () => {
  gulp.src('./src/*.html')
    .pipe(gulp.dest('./dist'));
});


gulp.task(
  'compile',
  ['make-index', 'make-worker', 'make-service-worker', 'html'],
  () => { return; }
);
