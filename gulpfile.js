var gulp = require('gulp');
 
// `gulp.task()` defines task that can be run calling `gulp xyz` from the command line
// The `default` task gets called when no task name is provided to Gulp
function startExpress() {
 
  var express = require('express');
  var app = express();
  console.log('server running')
  app.use(express.static(__dirname));
  app.listen(4000);
}
 
gulp.task('default', function () {
	startExpress();
  console.log('this')
});

var gulp = require('gulp');
var changed = require('gulp-changed');
var ngmin = require('gulp-ngmin'); // just as an example

var SRC = '*.html';
var DEST = 'dist';

gulp.task('default', function () {
    gulp.src(SRC)
        .pipe(changed(DEST))
        // ngmin will only get the files that
        // changed since the last time it was run
        .pipe(ngmin())
        .pipe(gulp.dest(DEST));
});