const { spawn } = require('child_process');
const electron = require('electron');

let subprocess;

function startElectron(done) {
  subprocess = spawn(electron, ['.', ], {
    env: { ...process.env, NODE_ENV: 'development' },
    stdio: 'inherit',
  });
  subprocess.on("error", err => console.error(err));
  done();
}

function startElectronDebug(done) {
  subprocess = spawn(electron, ['--inspect=9223', '.'], {
    env: { ...process.env, NODE_ENV: 'development' },
    stdio: 'inherit',
  });
  subprocess.on("error", err => console.error(err));
  done();
}

function stopElectron() {
  subprocess.kill();
  return subprocess;
}

startElectron.displayName = 'start-electron';
stopElectron.displayName = 'stop-electron';

exports.start = startElectron;
exports.startDebug = startElectronDebug;
exports.stop = stopElectron;
