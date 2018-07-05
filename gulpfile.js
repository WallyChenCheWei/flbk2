/**
 * Created by chewei.chen on 2016/8/22.
 */
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS  = require('gulp-minify-css'),
    rename     = require("gulp-rename"),
    notify = require('gulp-notify'),
    uglify     = require('gulp-uglify'),
    htmlreplace = require('gulp-html-replace'),
    imagemin = require('gulp-imagemin');

//sass
gulp.task('sass', function () {
    return sass('src/sass/*.scss')
        .on('error', sass.logError)
        .pipe(gulp.dest('src/css/'))
        .pipe(notify({ message: 'sass complete' }));
});

//autoprefixer
gulp.task('autoprefixer', function () {
    return gulp.src('src/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('src/css/'));
});

//minify css
gulp.task('minify-css',['autoprefixer'], function() {
    return gulp.src('src/css/*.css')
        .pipe(minifyCSS({
            keepBreaks: true
        }))
        .pipe(rename(function(path) {
            path.basename += ".min";
            path.extname = ".css";
        }))
        .pipe(gulp.dest('build/css/'))
});

//uglify js
gulp.task('uglify', function() {
    return gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(rename(function(path) {
            path.basename += ".min";
            path.extname = ".js";
        }))
        .pipe(gulp.dest('build/js/'));
});

//minify image
gulp.task('images', function() {
    return gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/img'))
        .pipe(notify({ message: 'Images task complete' }));
});

//replace html
gulp.task('html-replace',function() {
    return gulp.src('src/*.html')
        .pipe(htmlreplace({
            'css': 'css/style.min.css',
            'js': 'js/action.min.js'
        }))
        .pipe(gulp.dest('build/'));
});

//watch
gulp.task('watch', function() {
    gulp.watch('src/sass/base/*.scss', ['sass']);/*Watch .scss files*/
    gulp.watch('src/sass/*.scss', ['sass']);/*Watch .scss files*/
});


//task
gulp.task('default',['html-replace', 'minify-css', 'uglify', 'images']);