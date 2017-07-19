// Requiring packages
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create(),
    eslint = require('gulp-eslint');

// Gulp tasks below 

// Gulp Scripts Task
gulp.task('scripts', ['lint'], function () {
    gulp.src('./js/*.js')
        .pipe(uglify()) //call the uglify function on the files
        .pipe(rename({ extname: '.min.js' })) // rename uglified file 
        .pipe(gulp.dest('./build/js'))
});

// Gulp Say Hello Task
gulp.task('say_hello', function () {
    console.log('hello!');
});

//Gulp Task: Browser-sync (reloading browser)
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    }); //end of browser-sync init

    gulp.watch('./build/js/*.js').on('change', browserSync.reload);
});

//Gulp Watch Task
gulp.task('watch', function () {
    gulp.watch('./js/*.js', ['scripts']);
});

//Gulp Lint Task
gulp.task('lint', function () {
    return gulp.src('./js/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

//Gulp Default Task
gulp.task('default', ['watch', 'browser-sync']);



