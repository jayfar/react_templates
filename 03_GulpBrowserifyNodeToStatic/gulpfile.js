var gulp = require('gulp');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
// gulp-util is used to track down any errors with uglify: https://github.com/terinjokes/gulp-uglify/issues/76
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');


gulp.task('browserify', function() {
    return browserify('src/js/app.js', {transform:'reactify', debug: false}) 
        .bundle()
        .pipe(source('app.js')) // gives streaming vinyl file object
        .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
        .pipe(uglify().on('error', gutil.log)) // now gulp-uglify works
        .pipe(gulp.dest('dist/js'));
});

gulp.task('browserify_debug', function() {
    return browserify('src/js/app.js', {transform:'reactify', debug: true}) // ignore:['react', 'react-dom', 'jQuery', 'react-bootstrap', 'react-router', 'react-router-bootstrap']
        .bundle()
        .pipe(source('app.js')) // gives streaming vinyl file object
        .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
        //.pipe(uglify()) // no gulp-uglify in debug
        .pipe(gulp.dest('dist/js'));
});

gulp.task('copy', function() {
    gulp.src('src/index.html')
      .pipe(gulp.dest('dist'));
    
    gulp.src('src/*.png')
      .pipe(gulp.dest('dist'));

    gulp.src('node_modules/react-data-grid/themes/react-data-grid.css')
      .pipe(gulp.dest('./dist/css'));
      
    gulp.src('src/css/*.css')
      .pipe(gulp.dest('./dist/css'));
      
    gulp.src('src/js_external/*.js')
      .pipe(gulp.dest('./dist/js'));

});


gulp.task('apply-prod-environment', function() {
    process.env.NODE_ENV = 'production';
});

gulp.task('default',['browserify_debug', 'copy']);

gulp.task('release',['apply-prod-environment', 'browserify', 'copy']);

gulp.task('watch', function() {
    gulp.watch('srcClient/**/*.*', ['default']);
});

