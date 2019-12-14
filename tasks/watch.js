const { parallel, series, watch } = require('gulp');
const electron = require('./electron');
const hotreload = require('./hotreload');
const assets = require('./assets');
const scripts = require('./scripts');

function watchMainScripts() {
  return watch(['app/main/**/*.js'], series(scripts.developBuild, electron.stop, electron.start));
}

function watchCommonScripts() {
  return watch(["app/common/**/*.js"], series(scripts.developBuild, hotreload.reload));
}

function watchDeviceScripts() {
  return watch(["app/device/**/*.js"], series(scripts.developBuild, hotreload.reload));
}

function watchRendererScripts() {
  return watch(['app/renderer/**/*.js'], series(scripts.developBuild, hotreload.reload));
}

function watchDeviceHtml() {
  return watch(["app/device/index.html"], series(assets.copyAssets, hotreload.inject, hotreload.reload));
}

function watchRendererHtml() {
  return watch(["app/renderer/index.html"], series(assets.copyAssets, hotreload.inject, hotreload.reload));
}

watchMainScripts.displayName = 'watch-main-scripts';
watchRendererScripts.displayName = 'watch-renderer-scripts';
watchDeviceHtml.displayName = 'watch-device-html';
watchRendererHtml.displayName = 'watch-renderer-html';

exports.start = series(
  assets.copyAssets,
  scripts.developBuild,
  hotreload.start,
  electron.start,
  parallel(watchMainScripts, watchCommonScripts, watchDeviceScripts, watchRendererScripts, watchDeviceHtml, watchRendererHtml),
);

exports.startDebug = series(
  assets.copyAssets,
  scripts.developBuild,
  electron.startDebug
)
