var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var processhtml = require('gulp-processhtml');
var minifyCSS = require('gulp-minify-css');
var concatCss = require('gulp-concat-css');
var replace = require('gulp-replace');

var paths = {
  scripts: ['../ClientDebug/client/js/jquery-1.11.1.js',
            '../ClientDebug/client/js/bootstrap-3.1.1.js',
			'../ClientDebug/client/js/knockout-3.1.0.js',
			'../ClientDebug/client/js/leaflet-src.js',
			'../ClientDebug/client/js/leaflet.draw-src.js',
            '../ClientDebug/client/js/leaflet.measure.js',
			'../ClientDebug/client/js/leaflet.markercluster-src.js',
            '../ClientDebug/client/js/esri-leaflet-src.js',
            '../ClientDebug/client/js/esri-leaflet-clustered-feature-layer-src.js',
            '../ClientDebug/client/js/leaflet.zoomdisplay-src.js',
			//'../ClientDebug/client/js/gmaps.js',
			'../ClientDebug/client/js/leaflet-google.js',
			'../ClientDebug/client/js/dropzone.js',
			'../ClientDebug/client/js/knockout.mapping.js',
            '../ClientDebug/client/js/messenger.js',
            '../ClientDebug/client/js/messenger-theme-future.js',
            '../ClientDebug/client/js/moment.js',
            '../ClientDebug/client/js/buckets.js',
            '../ClientDebug/client/js/sts-webglobals.js',
			'../ClientDebug/client/js/sts-commondataobjects.js',
			'../ClientDebug/client/js/sts-mapgoogle.js',
			'../ClientDebug/client/js/sts-mapleaflet.js',
			'../ClientDebug/client/js/sts-datamodel.js',
			'../ClientDebug/client/js/sts-main.js'
  ],
  images: 'client/img/**/*'
};

// https://github.com/gulpjs/gulp/blob/master/docs/API.md
gulp.task('default', function() {
  // place code for your default task here
  
  // https://github.com/julien/gulp-processhtml
  gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('build/client/js'));
  
  // https://www.npmjs.org/package/gulp-minify-css
  gulp.src('../ClientDebug/client/css/**/*css')
    .pipe(minifyCSS({keepBreaks:false, keepSpecialComments:false}))
	.pipe(concatCss("app.css"))
    .pipe(gulp.dest('build/client/css'))
  
  gulp.src('../ClientDebug/client/pagecontent/*')
  	.pipe(gulp.dest('build/client/pagecontent'));
  
  gulp.src('../ClientDebug/client/js/images/**')
  	.pipe(gulp.dest('build/client/js/images'));

  gulp.src('../ClientDebug/client/images/**')
  	.pipe(gulp.dest('build/client/images'));
	 
  gulp.src('../ClientDebug/client/stsicons/**')
  	.pipe(gulp.dest('build/client/stsicons'));
  
  gulp.src('../ClientDebug/client/stsiconssmall/**')
  	.pipe(gulp.dest('build/client/stsiconssmall'));
  
  gulp.src('../ClientDebug/client/fonts/**')
  	.pipe(gulp.dest('build/client/fonts'));
	
  gulp.src('../ClientDebug/client/css/images/**')
  	.pipe(gulp.dest('build/client/css/images'));
  
  gulp.src('../ClientDebug/client/css/styles/**')
  	.pipe(gulp.dest('build/client/css/styles'));

	
	
  gulp.src('../ClientDebug/client/index.html')
    .pipe(processhtml('index.html'))
    .pipe(gulp.dest('./build/client/'));
	
	
  gulp.src(['server.js'])
    .pipe(replace('/../ClientDebug/client', '/client'))
	//.pipe(uglify())
    .pipe(gulp.dest('build/'));
	
   gulp.src(['PeriodicFileProcessor.js'])
    //.pipe(uglify())
    .pipe(gulp.dest('build/'));
  
  gulp.src(['login.html'])
    .pipe(gulp.dest('build/'));
  
  gulp.src(['package.json'])
    .pipe(gulp.dest('build/'));
  
   gulp.src('./server/**')
    .pipe(uglify())
  	.pipe(gulp.dest('build/server'));
	
	gulp.src('./common/**')
    .pipe(uglify())
  	.pipe(gulp.dest('build/common'));
  
});