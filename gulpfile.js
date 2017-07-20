// Requiring packages
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create(),
    eslint = require('gulp-eslint'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename');
    prettyError = require('gulp-prettyerror')

// GULP TASKS BELOW

// Gulp Scripts Task with lint added as a dependency
gulp.task('scripts', ['lint'], function () {
    gulp.src('./js/*.js')
        .pipe(uglify()) //call the uglify function on the files
        .pipe(rename({ extname: '.min.js' })) // rename uglified file 
        .pipe(gulp.dest('./build/js'))
});

// Gulp Say Hello Task
// gulp.task('say_hello', function () {
//     console.log('hello!');
// });

//Gulp Task: Browser-sync (reloading browser)
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    }); //end of browser-sync init

    gulp.watch(['./build/css/*.css', './build/js/*.js', 'index.html']).on('change', browserSync.reload);
});

//Gulp Watch Task
gulp.task('watch', function () {
    gulp.watch('./sass/*.scss', ['sass']);
    gulp.watch('./js/*.js', ['scripts']);
});

//Gulp Lint Task
gulp.task('lint', function () {
    return gulp.src('./js/*.js') //works on the human file not build
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

//Gulp Sass Task
gulp.task('sass', function() {
   gulp.src('./sass/style.scss')
      .pipe(prettyError())
      .pipe(sass())
      .pipe(autoprefixer({
         browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest('./build/css'))
      .pipe(cssnano())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('./build/css'));
});

//Gulp Default Task
gulp.task('default', ['watch', 'browser-sync']);



