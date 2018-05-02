var gulp   = require('gulp'),
    concat = require('gulp-concat'), // concatena i file
    minify = require('gulp-minify'), // ofusca in modo irreversibile i js
    rename = require('gulp-rename'), // middleware rinominazione file
    sass   = require('gulp-sass'), // preprocess sass
    maps   = require('gulp-sourcemaps') // sourcemap
    runSequence = require('run-sequence'), // esecuzione parallela
    babel = require('gulp-babel'); // transpiler
var __LIBDIR = 'node_modules/';

// This task concats the indicated files in a single one, releasing two mapped outputs (.js, .min.js)
gulp.task('concatScripts', function() {
  gulp.src([
    'public/javascripts/index.js',
    'public/javascripts/tools.inizia.js', // array of js to concat
    'public/javascripts/tools.reset.js'])
  .pipe(maps.init()) // initializes sourcemap
  .pipe(babel())
  .pipe(concat('app.js')) // concat files in a single virtual file called app.js
  .pipe(gulp.dest('./public/javascripts/dist/')) // writes output in hd
  
  .pipe(minify({ // middleware for minification
    ext:{
        min:'.min.js'
    },
    exclude: [],
    ignoreFiles: ['.combo.js', '-min.js']
   }))
  .pipe(maps.write('./maps')) // Writes pointer to map file and generate it in the specified path
  .pipe(gulp.dest('./public/javascripts/dist/')) // writes output minified
  ;
});

// Task to copy asset libraries to folder public distribution
gulp.task('copyLibs', function(){
    gulp.src([
        'bootstrap/dist/**',
        'jquery/dist/**',
        'babel-polyfill/dist/**'].map(dir=>__LIBDIR+dir) )
    .pipe(gulp.dest('./public/assets/'))
})

// This task listens for changes in files and automatically executes a sequence of defined task in array
gulp.task('watch:js', function() {
    gulp.watch([
        './public/javascripts/**.js',
        '!.public/javascripts/assets/**',
        '!.public/javascripts/dist/**'
    ], ['concatScripts']);
});

gulp.task('default', ['concatScripts', 'copyLibs'], function() {
    runSequence(['watch:js']);
});