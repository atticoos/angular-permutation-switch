var gulp = require('gulp'),
    jscs = require('gulp-jscs'),
    jshint = require('gulp-jshint'),
    karma = require('karma').server;

gulp.task('lint', function () {
  gulp.src([
    'src/**/*.js',
    'test/**/*.js'
  ])
  .pipe(jshint())
  .pipe(jscs());
});

gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

gulp.task('default', ['lint', 'test']);
