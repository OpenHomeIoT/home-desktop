const { src, dest, parallel } = require('gulp');

function copyDeviceHtml(cb) {
  return src("app/device/index.html").pipe(dest("build/device")).on("end", cb);
}

function copyRendererHtml(cb) {
  return src('app/renderer/index.html').pipe(dest('build/renderer')).on("end", cb);
}

copyDeviceHtml.displayName = 'dopy-device-html';
copyRendererHtml.displayName = 'copy-renderer-html';

exports.copyHtml = parallel(copyDeviceHtml, copyRendererHtml);
