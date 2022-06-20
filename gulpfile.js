const { series, parallel, watch } = require("gulp");
const browserSync = require('browser-sync').create();
const path = require('./tasks/config/path');
const processes = require('./tasks/config/processes');

// TASKS
const clear = require('./tasks/clear');
const html = require('./tasks/html');
const scss = require('./tasks/scss');
const script = require('./tasks/script');
const img = require('./tasks/img');
const fonts = require('./tasks/fonts');

// SERVER
const server = () => {
  browserSync.init({
    server: {
      baseDir: path.root,
    }
  })
};

// TASK WATCHER
const watcher = () => {
  watch(path.html.watch, html).on('all', browserSync.reload)
  watch(path.scss.watch, scss).on('all', browserSync.reload)
  watch(path.script.watch, script).on('all', browserSync.reload)
  watch(path.img.watch, img).on('all', browserSync.reload)
  watch(path.fonts.watch, fonts).on('all', browserSync.reload)
};

const build = series(
  clear,
  parallel(html, scss, script, img, fonts),
);

const dev = series(
  build,
  parallel(watcher, server),
);

exports.html = html;
exports.scss = scss;
exports.script = script;
exports.img = img;
exports.fonts = fonts;

exports.default = processes.isProd
  ? build
  : dev;