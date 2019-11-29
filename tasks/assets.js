const { src, dest, parallel } = require('gulp');

function copyDeviceHtml(cb) {
  return src("app/device/index.html").pipe(dest("build/device")).on("end", cb);
}

function copyRendererHtml(cb) {
  return src('app/renderer/index.html').pipe(dest('build/renderer')).on("end", cb);
}

function copySsdpHtml(cb) {
  return src('app/ssdp/index.html').pipe(dest('build/ssdp')).on("end", cb);
}

copyDeviceHtml.displayName = 'dopy-device-html';
copyRendererHtml.displayName = 'copy-renderer-html';
copySsdpHtml.displayName = 'copy-ssdp-html';

exports.copyHtml = parallel(copyDeviceHtml, copyRendererHtml, copySsdpHtml);
