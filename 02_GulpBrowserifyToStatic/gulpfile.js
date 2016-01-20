var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var processhtml = require('gulp-processhtml');
var minifyCSS = require('gulp-minify-css');
var concatCss = require('gulp-concat-css');
var replace = require('gulp-replace');


var browserify = require('gulp-browserify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var clean = require('gulp-clean');

var async = require('async');


var paths = {
  scripts: [
  './src/commonvars.js',
  './src/twowaybinding.js',
  './src/app.js'
  ]
};

//gulp.task('default', ['browserify', 'uglify', 'index', 'clean']);

gulp.task('default', function() {

    // TODO: Investigate Gulp 4 (still in development) to do this in series operations cleaner:
    // http://stackoverflow.com/questions/27511563/gulp-tasks-not-running-in-series?lq=1
    // https://github.com/gulpjs/gulp/issues/96#issuecomment-46151174
    
    // But for now use the async lib to make it in series:
    // https://github.com/caolan/async#seriestasks-callback
    async.series([taskBrowserify, taskUglify, taskIndex, taskClean]);

});

var taskBrowserify = function(cb) {
    var b = browserify({
      debug: false,
      transform: ['reactify'],
      extensions: ['.jsx'],
      ignore:['react-router', 'react', 'ReactRouterBootstrap']
    })
    
    // https://github.com/julien/gulp-processhtml
    gulp.src(paths.scripts)
        .pipe(concat('apptemp.js'))
        .pipe(b)
        .pipe(gulp.dest('./build'))
        .on("end", function() {
            cb(null);
        });
}

var taskUglify = function (cb) {
  
    gulp.src(['./src/ReactRouterBootstrap.js', './build/apptemp.js'])
        .pipe(concat('app.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('./build'))
        .on("end", function() {
            cb(null);
        });
   
};


var taskIndex = function(cb) {
          
    gulp.src(['./src/index-prod.html'])
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./build'))
        .on("end", function() {
            cb(null);
        });
}


var taskClean = function(cb) {
  
    gulp.src(['./build/apptemp.js'], {read: false})
        .pipe(clean())
        .on("end", function() {
            cb(null);
        });
               
}
