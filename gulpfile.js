const { src, dest, series, parallel } = require('gulp');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const cleanCss = require('gulp-clean-css');

function clean(cb) {
  del.sync('./dist');
  cb();
}

function dealCss(cb) {
  src('./src/css/**/*.css')
    .pipe(
      autoprefixer({
        cascade: false,
        remove: false
      })
    )
    .pipe(cleanCss())
    .pipe(dest('./dist/css'));
  cb();
}

function dealJs(cb) {
  src('./src/js/**/*.js').pipe(babel()).pipe(uglify()).pipe(dest('./dist/js'));
  cb();
}

function dealHtml(cb) {
  src('./src/html/**/*.html')
    .pipe(
      htmlmin({
        removeComments: true,
        collapseWhitespace: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true
      })
    )
    .pipe(dest('./dist/html'));
  cb();
}

function dealResource(cb) {
  src('./src/resource/**/*').pipe(dest('./dist/resource'));
  cb();
}

exports.default = series([
  clean,
  parallel(dealHtml, dealCss, dealJs, dealResource)
]);
