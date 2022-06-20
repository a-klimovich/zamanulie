const { src, dest } = require("gulp");
const path = require('./config/path.js');
const processes = require('./config/processes.js');

// PLAGINS
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const shorthand = require("gulp-shorthand");
const size = require("gulp-size");
const sass = require("gulp-sass")(require('sass'));
const concat = require('gulp-concat');
const gulpIf = require('gulp-if');

const scss = () => {
  return src(path.scss.src)
    .pipe(sass())
    .pipe(gulpIf(processes.isProd, size({title: 'scss--css--before'})))
    .pipe(gulpIf(processes.isProd, autoprefixer({
      cascade: false,
      grid: true,
      overrideBrowserslist: ["last 3 versions"]
    })))
    .pipe(gulpIf(processes.isProd, shorthand()))
    .pipe(gulpIf(processes.isProd, csso()))
    .pipe(gulpIf(processes.isProd, size({title: 'scss--css--after'})))
    .pipe(concat('styles.css'))
    .pipe(dest(path.scss.build, { sourcemaps: '.' }))
};

module.exports = scss;