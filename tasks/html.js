const { src, dest } = require("gulp");
const path = require('./config/path.js');
const processes = require('./config/processes.js');

// PLAGINS
const fileinclude = require('gulp-file-include');
const htmlmin = require("gulp-htmlmin");
const size = require("gulp-size");
const gulpIf = require('gulp-if');

const html = () => {
  return src(path.html.src)
    .pipe(fileinclude())
    .pipe(size({title: 'html--before'}))
    .pipe(gulpIf(processes.isProd ,htmlmin({
      collapseWhitespace: true,
    })))
    .pipe(dest(path.html.build))
    .pipe(size({title: 'html--after'}))
};

module.exports = html;