const { src, dest } = require("gulp");
const path = require('./config/path.js');
const processes = require('./config/processes.js');

// PLAGINS
const newer = require('gulp-newer');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');

const fonts = () => {
  return src(path.fonts.src)
    .pipe(newer(path.fonts.build))
    .pipe(ttf2woff2())
    .pipe(fonter({
      formats: ['eot','ttf', 'woff', 'svg']
    }))
    .pipe(dest(path.fonts.build))
};

module.exports = fonts;