const { src, dest, parallel } = require('gulp');
const fs = require("fs");
const path = require("path");

function copyDeviceHtml(cb) {
  return src("app/device/index.html").pipe(dest("build/device")).on("end", cb);
}

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

copyDeviceHtml.displayName = 'dopy-device-html';
copyRendererHtml.displayName = 'copy-renderer-html';
copyRendererDrawables.displayName = 'copy-renderer-drawables';

exports.copyAssets = parallel(createDBDir, copyDeviceHtml, copyRendererHtml, copyRendererDrawables);
