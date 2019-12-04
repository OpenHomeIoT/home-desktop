const { series, src, dest, parallel } = require('gulp');
const inject = require('gulp-inject-string');

const browserSync = require('browser-sync').create();

function startBrowserSync(done) {
  browserSync.init(
    {
      ui: false,
      localOnly: true,
      port: 35829,
      ghostMode: false,
      open: false,
      notify: false,
      logSnippet: false,
    },
    function(error) {
      done(error);
    },
  );
}

function injectBrowserSyncDevice() {
  return src('app/device/index.html')
    .pipe(inject.before('</body>', browserSync.getOption('snippet')))
    .pipe(
      inject.after('script-src', " 'unsafe-eval' " + browserSync.getOption('urls').get('local')),
    )
    .pipe(dest('build/device'));
}

function injectBrowserSyncRenderer() {
  return src('app/renderer/index.html')
    .pipe(inject.before('</body>', browserSync.getOption('snippet')))
    .pipe(
      inject.after('script-src', " 'unsafe-eval' " + browserSync.getOption('urls').get('local')),
    )
    .pipe(dest('build/renderer'));
}

function reloadBrowser(done) {
  browserSync.reload();
  done();
}

startBrowserSync.displayName = 'start-hotreload';
reloadBrowser.displayName = 'reload-hotreload';
injectBrowserSyncDevice.displayName = 'inject-hotreload-device';
injectBrowserSyncRenderer.displayName = 'inject-hotreload-renderer';

exports.start = series(startBrowserSync, parallel(injectBrowserSyncDevice, injectBrowserSyncRenderer));
exports.inject = parallel(injectBrowserSyncDevice, injectBrowserSyncRenderer);
exports.reload = reloadBrowser;
