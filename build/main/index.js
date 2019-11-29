"use strict";

var _path = _interopRequireDefault(require("path"));

var _electron = require("electron");

var _routes = _interopRequireDefault(require("./ipc/routes.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isDevelopment = process.env.NODE_ENV === 'development';
let tray = null;
let mainWindow = null;
let deviceProcess = null; // TODO: implement

let ssdpProcess = null; // TODO: implement

let forceQuit = false;
/**
 * Create the Device management process.
 */

const createDeviceProcess = () => {
  deviceProcess = new _electron.BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });
  deviceProcess.loadFile(_path.default.resolve(_path.default.join(__dirname, "../device/index.html")));
};
/**
 * Create the main window.
 */


const createMainWindow = () => {
  mainWindow = new _electron.BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 640,
    minHeight: 480,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadFile(_path.default.resolve(_path.default.join(__dirname, '../renderer/index.html'))); // show window once on first load

  mainWindow.webContents.once('did-finish-load', () => {
    mainWindow.show();
  });
  mainWindow.webContents.on('did-finish-load', () => {
    // Handle window logic properly on macOS:
    // 1. App should not terminate if window has been closed
    // 2. Click on icon in dock should re-open the window
    // 3. ⌘+Q should close the window and quit the app
    if (process.platform === 'darwin') {
      mainWindow.on('close', function (e) {
        if (!forceQuit) {
          e.preventDefault();
          mainWindow.hide();
        }
      });

      _electron.app.on('activate', () => {
        mainWindow.show();
      });

      _electron.app.on('before-quit', () => {
        forceQuit = true;
      });
    } else {
      mainWindow.on('closed', () => {
        mainWindow = null;
        deviceProcess = null;
        ssdpProcess = null;
      });
    }
  });

  if (isDevelopment) {
    // auto-open dev tools
    mainWindow.webContents.openDevTools(); // add inspect element on right click menu

    mainWindow.webContents.on('context-menu', (e, props) => {
      _electron.Menu.buildFromTemplate([{
        label: 'Inspect element',

        click() {
          mainWindow.inspectElement(props.x, props.y);
        }

      }]).popup(mainWindow);
    });
  }
};
/**
 * Create the Ssdp process.
 */


const createSsdpProcess = () => {
  ssdpProcess = new _electron.BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });
  ssdpProcess.loadFile(_path.default.resolve(_path.default.join(__dirname, '../ssdp/index.html')));
};
/**
 * Initialize the app.
 */


const initializeApp = () => {
  createMainWindow();
  createDeviceProcess();
  createSsdpProcess();
  (0, _routes.default)(_electron.ipcMain); // create the tray
  // TODO: supply icon
  // tray = new Tray("");
  // const contextMenu = Menu.buildFromTemplate([
  //   { label: "Open Hub", type: "normal" },
  //   { label: "Settings", type: "normal" },
  //   { type: "separator" },
  //   { label: "Exit", type: "normal" }
  // ]);
  // // TODO: set tooltip for tray
  // tray.setContextMenu(contextMenu);
};

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');

  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;

  for (const name of extensions) {
    try {
      await installer.default(installer[name], forceDownload);
    } catch (e) {
      console.log(`Error installing ${name} extension: ${e.message}`);
    }
  }
};

_electron.crashReporter.start({
  productName: 'Hub',
  companyName: 'OpenSourceHomeIoT',
  submitURL: 'https://your-domain.com/url-to-submit',
  uploadToServer: false
});

_electron.app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    _electron.app.quit();
  }
});

_electron.app.on('ready', async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  initializeApp();
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vaW5kZXguanMiXSwibmFtZXMiOlsiaXNEZXZlbG9wbWVudCIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInRyYXkiLCJtYWluV2luZG93IiwiZGV2aWNlUHJvY2VzcyIsInNzZHBQcm9jZXNzIiwiZm9yY2VRdWl0IiwiY3JlYXRlRGV2aWNlUHJvY2VzcyIsIkJyb3dzZXJXaW5kb3ciLCJzaG93Iiwid2ViUHJlZmVyZW5jZXMiLCJub2RlSW50ZWdyYXRpb24iLCJsb2FkRmlsZSIsInBhdGgiLCJyZXNvbHZlIiwiam9pbiIsIl9fZGlybmFtZSIsImNyZWF0ZU1haW5XaW5kb3ciLCJ3aWR0aCIsImhlaWdodCIsIm1pbldpZHRoIiwibWluSGVpZ2h0Iiwid2ViQ29udGVudHMiLCJvbmNlIiwib24iLCJwbGF0Zm9ybSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImhpZGUiLCJhcHAiLCJvcGVuRGV2VG9vbHMiLCJwcm9wcyIsIk1lbnUiLCJidWlsZEZyb21UZW1wbGF0ZSIsImxhYmVsIiwiY2xpY2siLCJpbnNwZWN0RWxlbWVudCIsIngiLCJ5IiwicG9wdXAiLCJjcmVhdGVTc2RwUHJvY2VzcyIsImluaXRpYWxpemVBcHAiLCJpcGNNYWluIiwiaW5zdGFsbEV4dGVuc2lvbnMiLCJpbnN0YWxsZXIiLCJyZXF1aXJlIiwiZXh0ZW5zaW9ucyIsImZvcmNlRG93bmxvYWQiLCJVUEdSQURFX0VYVEVOU0lPTlMiLCJuYW1lIiwiZGVmYXVsdCIsImNvbnNvbGUiLCJsb2ciLCJtZXNzYWdlIiwiY3Jhc2hSZXBvcnRlciIsInN0YXJ0IiwicHJvZHVjdE5hbWUiLCJjb21wYW55TmFtZSIsInN1Ym1pdFVSTCIsInVwbG9hZFRvU2VydmVyIiwicXVpdCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFDQTs7OztBQUVBLE1BQU1BLGFBQWEsR0FBR0MsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsYUFBL0M7QUFFQSxJQUFJQyxJQUFJLEdBQUcsSUFB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QUFWLENBQWtCTixTQUFTLENBQUNLLElBQUQsQ0FBM0IsRUFBbUNGLGFBQW5DLENBQU47QUFDRCxLQUZELENBRUUsT0FBT3JCLENBQVAsRUFBVTtBQUNWeUIsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQWEsb0JBQW1CSCxJQUFLLGVBQWN2QixDQUFDLENBQUMyQixPQUFRLEVBQTdEO0FBQ0Q7QUFDRjtBQUNGLENBWEQ7O0FBYUFDLHdCQUFjQyxLQUFkLENBQW9CO0FBQ2xCQyxFQUFBQSxXQUFXLEVBQUUsS0FESztBQUVsQkMsRUFBQUEsV0FBVyxFQUFFLG1CQUZLO0FBR2xCQyxFQUFBQSxTQUFTLEVBQUUsdUNBSE87QUFJbEJDLEVBQUFBLGNBQWMsRUFBRTtBQUpFLENBQXBCOztBQU9BOUIsY0FBSUwsRUFBSixDQUFPLG1CQUFQLEVBQTRCLE1BQU07QUFDaEM7QUFDQTtBQUNBLE1BQUl6QixPQUFPLENBQUMwQixRQUFSLEtBQXFCLFFBQXpCLEVBQW1DO0FBQ2pDSSxrQkFBSStCLElBQUo7QUFDRDtBQUNGLENBTkQ7O0FBUUEvQixjQUFJTCxFQUFKLENBQU8sT0FBUCxFQUFnQixZQUFZO0FBQzFCLE1BQUkxQixhQUFKLEVBQW1CO0FBQ2pCLFVBQU02QyxpQkFBaUIsRUFBdkI7QUFDRDs7QUFFREYsRUFBQUEsYUFBYTtBQUNkLENBTkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IGFwcCwgY3Jhc2hSZXBvcnRlciwgQnJvd3NlcldpbmRvdywgaXBjTWFpbiwgTWVudSwgVHJheSB9IGZyb20gJ2VsZWN0cm9uJztcbmltcG9ydCBjb25maWd1cmVJcGNSb3V0ZXMgZnJvbSBcIi4vaXBjL3JvdXRlcy5qc1wiO1xuXG5jb25zdCBpc0RldmVsb3BtZW50ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCc7XG5cbmxldCB0cmF5ID0gbnVsbDtcbmxldCBtYWluV2luZG93ID0gbnVsbDtcbmxldCBkZXZpY2VQcm9jZXNzID0gbnVsbDsgLy8gVE9ETzogaW1wbGVtZW50XG5sZXQgc3NkcFByb2Nlc3MgPSBudWxsOyAvLyBUT0RPOiBpbXBsZW1lbnRcbmxldCBmb3JjZVF1aXQgPSBmYWxzZTtcblxuLyoqXG4gKiBDcmVhdGUgdGhlIERldmljZSBtYW5hZ2VtZW50IHByb2Nlc3MuXG4gKi9cbmNvbnN0IGNyZWF0ZURldmljZVByb2Nlc3MgPSAoKSA9PiB7XG4gIGRldmljZVByb2Nlc3MgPSBuZXcgQnJvd3NlcldpbmRvdyh7XG4gICAgc2hvdzogZmFsc2UsXG4gICAgd2ViUHJlZmVyZW5jZXM6IHtcbiAgICAgIG5vZGVJbnRlZ3JhdGlvbjogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGRldmljZVByb2Nlc3MubG9hZEZpbGUocGF0aC5yZXNvbHZlKHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi4vZGV2aWNlL2luZGV4Lmh0bWxcIikpKTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgdGhlIG1haW4gd2luZG93LlxuICovXG5jb25zdCBjcmVhdGVNYWluV2luZG93ID0gKCkgPT4ge1xuICBtYWluV2luZG93ID0gbmV3IEJyb3dzZXJXaW5kb3coe1xuICAgIHdpZHRoOiAxMDAwLFxuICAgIGhlaWdodDogODAwLFxuICAgIG1pbldpZHRoOiA2NDAsXG4gICAgbWluSGVpZ2h0OiA0ODAsXG4gICAgc2hvdzogZmFsc2UsXG4gICAgd2ViUHJlZmVyZW5jZXM6IHtcbiAgICAgIG5vZGVJbnRlZ3JhdGlvbjogdHJ1ZSxcbiAgICB9LFxuICB9KTtcblxuICBtYWluV2luZG93LmxvYWRGaWxlKHBhdGgucmVzb2x2ZShwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vcmVuZGVyZXIvaW5kZXguaHRtbCcpKSk7XG5cbiAgLy8gc2hvdyB3aW5kb3cgb25jZSBvbiBmaXJzdCBsb2FkXG4gIG1haW5XaW5kb3cud2ViQ29udGVudHMub25jZSgnZGlkLWZpbmlzaC1sb2FkJywgKCkgPT4ge1xuICAgIG1haW5XaW5kb3cuc2hvdygpO1xuICB9KTtcblxuICBtYWluV2luZG93LndlYkNvbnRlbnRzLm9uKCdkaWQtZmluaXNoLWxvYWQnLCAoKSA9PiB7XG4gICAgLy8gSGFuZGxlIHdpbmRvdyBsb2dpYyBwcm9wZXJseSBvbiBtYWNPUzpcbiAgICAvLyAxLiBBcHAgc2hvdWxkIG5vdCB0ZXJtaW5hdGUgaWYgd2luZG93IGhhcyBiZWVuIGNsb3NlZFxuICAgIC8vIDIuIENsaWNrIG9uIGljb24gaW4gZG9jayBzaG91bGQgcmUtb3BlbiB0aGUgd2luZG93XG4gICAgLy8gMy4g4oyYK1Egc2hvdWxkIGNsb3NlIHRoZSB3aW5kb3cgYW5kIHF1aXQgdGhlIGFwcFxuICAgIGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnZGFyd2luJykge1xuICAgICAgbWFpbldpbmRvdy5vbignY2xvc2UnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICghZm9yY2VRdWl0KSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIG1haW5XaW5kb3cuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgYXBwLm9uKCdhY3RpdmF0ZScsICgpID0+IHtcbiAgICAgICAgbWFpbldpbmRvdy5zaG93KCk7XG4gICAgICB9KTtcblxuICAgICAgYXBwLm9uKCdiZWZvcmUtcXVpdCcsICgpID0+IHtcbiAgICAgICAgZm9yY2VRdWl0ID0gdHJ1ZTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBtYWluV2luZG93Lm9uKCdjbG9zZWQnLCAoKSA9PiB7XG4gICAgICAgIG1haW5XaW5kb3cgPSBudWxsO1xuICAgICAgICBkZXZpY2VQcm9jZXNzID0gbnVsbDtcbiAgICAgICAgc3NkcFByb2Nlc3MgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcblxuICBpZiAoaXNEZXZlbG9wbWVudCkge1xuICAgIC8vIGF1dG8tb3BlbiBkZXYgdG9vbHNcbiAgICBtYWluV2luZG93LndlYkNvbnRlbnRzLm9wZW5EZXZUb29scygpO1xuXG4gICAgLy8gYWRkIGluc3BlY3QgZWxlbWVudCBvbiByaWdodCBjbGljayBtZW51XG4gICAgbWFpbldpbmRvdy53ZWJDb250ZW50cy5vbignY29udGV4dC1tZW51JywgKGUsIHByb3BzKSA9PiB7XG4gICAgICBNZW51LmJ1aWxkRnJvbVRlbXBsYXRlKFtcbiAgICAgICAge1xuICAgICAgICAgIGxhYmVsOiAnSW5zcGVjdCBlbGVtZW50JyxcbiAgICAgICAgICBjbGljaygpIHtcbiAgICAgICAgICAgIG1haW5XaW5kb3cuaW5zcGVjdEVsZW1lbnQocHJvcHMueCwgcHJvcHMueSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIF0pLnBvcHVwKG1haW5XaW5kb3cpO1xuICAgIH0pO1xuICB9XG59O1xuXG4vKipcbiAqIENyZWF0ZSB0aGUgU3NkcCBwcm9jZXNzLlxuICovXG5jb25zdCBjcmVhdGVTc2RwUHJvY2VzcyA9ICgpID0+IHtcbiAgc3NkcFByb2Nlc3MgPSBuZXcgQnJvd3NlcldpbmRvdyh7XG4gICAgc2hvdzogZmFsc2UsXG4gICAgd2ViUHJlZmVyZW5jZXM6IHtcbiAgICAgIG5vZGVJbnRlZ3JhdGlvbjogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIHNzZHBQcm9jZXNzLmxvYWRGaWxlKHBhdGgucmVzb2x2ZShwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vc3NkcC9pbmRleC5odG1sJykpKTtcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplIHRoZSBhcHAuXG4gKi9cbmNvbnN0IGluaXRpYWxpemVBcHAgPSAoKSA9PiB7XG4gIGNyZWF0ZU1haW5XaW5kb3coKTtcbiAgY3JlYXRlRGV2aWNlUHJvY2VzcygpO1xuICBjcmVhdGVTc2RwUHJvY2VzcygpO1xuXG4gIGNvbmZpZ3VyZUlwY1JvdXRlcyhpcGNNYWluKTtcblxuICAvLyBjcmVhdGUgdGhlIHRyYXlcbiAgLy8gVE9ETzogc3VwcGx5IGljb25cbiAgLy8gdHJheSA9IG5ldyBUcmF5KFwiXCIpO1xuICAvLyBjb25zdCBjb250ZXh0TWVudSA9IE1lbnUuYnVpbGRGcm9tVGVtcGxhdGUoW1xuICAvLyAgIHsgbGFiZWw6IFwiT3BlbiBIdWJcIiwgdHlwZTogXCJub3JtYWxcIiB9LFxuICAvLyAgIHsgbGFiZWw6IFwiU2V0dGluZ3NcIiwgdHlwZTogXCJub3JtYWxcIiB9LFxuICAvLyAgIHsgdHlwZTogXCJzZXBhcmF0b3JcIiB9LFxuICAvLyAgIHsgbGFiZWw6IFwiRXhpdFwiLCB0eXBlOiBcIm5vcm1hbFwiIH1cbiAgLy8gXSk7XG4gIC8vIC8vIFRPRE86IHNldCB0b29sdGlwIGZvciB0cmF5XG4gIC8vIHRyYXkuc2V0Q29udGV4dE1lbnUoY29udGV4dE1lbnUpO1xufVxuXG5jb25zdCBpbnN0YWxsRXh0ZW5zaW9ucyA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgaW5zdGFsbGVyID0gcmVxdWlyZSgnZWxlY3Ryb24tZGV2dG9vbHMtaW5zdGFsbGVyJyk7XG4gIGNvbnN0IGV4dGVuc2lvbnMgPSBbJ1JFQUNUX0RFVkVMT1BFUl9UT09MUycsICdSRURVWF9ERVZUT09MUyddO1xuICBjb25zdCBmb3JjZURvd25sb2FkID0gISFwcm9jZXNzLmVudi5VUEdSQURFX0VYVEVOU0lPTlM7XG4gIGZvciAoY29uc3QgbmFtZSBvZiBleHRlbnNpb25zKSB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGluc3RhbGxlci5kZWZhdWx0KGluc3RhbGxlcltuYW1lXSwgZm9yY2VEb3dubG9hZCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coYEVycm9yIGluc3RhbGxpbmcgJHtuYW1lfSBleHRlbnNpb246ICR7ZS5tZXNzYWdlfWApO1xuICAgIH1cbiAgfVxufTtcblxuY3Jhc2hSZXBvcnRlci5zdGFydCh7XG4gIHByb2R1Y3ROYW1lOiAnSHViJyxcbiAgY29tcGFueU5hbWU6ICdPcGVuU291cmNlSG9tZUlvVCcsXG4gIHN1Ym1pdFVSTDogJ2h0dHBzOi8veW91ci1kb21haW4uY29tL3VybC10by1zdWJtaXQnLFxuICB1cGxvYWRUb1NlcnZlcjogZmFsc2UsXG59KTtcblxuYXBwLm9uKCd3aW5kb3ctYWxsLWNsb3NlZCcsICgpID0+IHtcbiAgLy8gT24gT1MgWCBpdCBpcyBjb21tb24gZm9yIGFwcGxpY2F0aW9ucyBhbmQgdGhlaXIgbWVudSBiYXJcbiAgLy8gdG8gc3RheSBhY3RpdmUgdW50aWwgdGhlIHVzZXIgcXVpdHMgZXhwbGljaXRseSB3aXRoIENtZCArIFFcbiAgaWYgKHByb2Nlc3MucGxhdGZvcm0gIT09ICdkYXJ3aW4nKSB7XG4gICAgYXBwLnF1aXQoKTtcbiAgfVxufSk7XG5cbmFwcC5vbigncmVhZHknLCBhc3luYyAoKSA9PiB7XG4gIGlmIChpc0RldmVsb3BtZW50KSB7XG4gICAgYXdhaXQgaW5zdGFsbEV4dGVuc2lvbnMoKTtcbiAgfVxuXG4gIGluaXRpYWxpemVBcHAoKTtcbn0pO1xuIl0sImZpbGUiOiJtYWluL2luZGV4LmpzIn0=
