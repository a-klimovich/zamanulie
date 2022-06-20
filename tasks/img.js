const { src, dest } = require("gulp");
const path = require('./config/path.js');
const processes = require('./config/processes.js');

// PLAGINS
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const gulpIf = require('gulp-if');

const img = () => {
  return src(path.img.src)
    .pipe(newer(path.img.build))
    .pipe(gulpIf(processes.isProd, imagemin()))
    .pipe(dest(path.img.build))
};

module.exports = img;