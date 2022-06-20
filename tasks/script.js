const { src, dest } = require("gulp");
const path = require('./config/path.js');
// const processes = require('./config/processes.js');

// PLAGINS
// const gulpIf = require('gulp-if');
const concat = require('gulp-concat');
const babel = require('gulp-babel')

const script = () => {
  return src(path.script.src)
    .pipe(babel())
    .pipe(concat('index.js'))
    .pipe(dest(path.script.build))
};

module.exports = script;