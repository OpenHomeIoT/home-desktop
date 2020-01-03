const { src, dest, parallel } = require('gulp');
const fs = require("fs");
const path = require("path");

function copyRendererHtml(cb) {
  return src('app/renderer/index.html').pipe(dest('build/renderer')).on("end", cb);
}

function copyRendererDrawables(cb) {
  return src('app/renderer/drawable/**/*').pipe(dest('build/renderer/drawable')).on("end", cb);
}

function createDBDir(cb) {
  const p = path.join(process.cwd(), "db/");
  if (!fs.existsSync(p)) fs.mkdirSync(p);
  cb();
}

copyRendererHtml.displayName = 'copy-renderer-html';
copyRendererDrawables.displayName = 'copy-renderer-drawables';

exports.copyAssets = parallel(createDBDir, copyRendererHtml, copyRendererDrawables);
