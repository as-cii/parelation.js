var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    coffee = require('gulp-coffee')

gulp.task('compress', function() {
  gulp.src('src/*.coffee')
    .pipe(coffee())
    .pipe(uglify())
    .pipe(rename({suffix: '.min', extname: '.js'}))
    .pipe(gulp.dest('dist'))

  gulp.src('src/*.coffee')
    .pipe(coffee())
    .pipe(rename({extname: '.js'}))
    .pipe(gulp.dest('dist'))
});

gulp.task('compile', function() {
  gulp.src('src/*.coffee')
    .pipe(coffee())
    .pipe(rename({extname: '.js'}))
    .pipe(gulp.dest('dist'))
});

gulp.task('watch', function() {
    gulp.watch('./src/*.coffee', ['compress']);
});
