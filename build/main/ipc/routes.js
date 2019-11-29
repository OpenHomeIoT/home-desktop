"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _device = _interopRequireDefault(require("./routes/device"));

var _renderer = _interopRequireDefault(require("./routes/renderer"));

var _ssdp = _interopRequireDefault(require("./routes/ssdp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//@ts-check

/**
 * Configure routes for interprocess communication.
 * @param {Electron.IpcMain} ipcMain
 */
const configureIpcRoutes = (ipcMain, mainWindow, deviceProcess, ssdpProcess) => {
  _device.default.init(mainWindow, deviceProcess, ssdpProcess);

  _renderer.default.init(mainWindow, deviceProcess, ssdpProcess);

  _ssdp.default.init(mainWindow, deviceProcess, ssdpProcess);

  ipcMain.on("device.process_loaded", _device.default.onInitialized);
  ipcMain.on("renderer.process_loaded", _renderer.default.onInitialized);
  ipcMain.on("ssdp.process_loaded", _ssdp.default.onInitialized);
  ipcMain.on("ssdp.devices_discovered", _ssdp.default.onDevicesDiscovered);
};

var _default = configureIpcRoutes;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vaXBjL3JvdXRlcy5qcyJdLCJuYW1lcyI6WyJjb25maWd1cmVJcGNSb3V0ZXMiLCJpcGNNYWluIiwibWFpbldpbmRvdyIsImRldmljZVByb2Nlc3MiLCJzc2RwUHJvY2VzcyIsImRldmljZVJvdXRlcyIsImluaXQiLCJyZW5kZXJlclJvdXRlcyIsInNzZHBSb3V0ZXMiLCJvbiIsIm9uSW5pdGlhbGl6ZWQiLCJvbkRldmljZXNEaXNjb3ZlcmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFIQTs7QUFLQTs7OztBQUlBLE1BQU1BLGtCQUFrQixHQUFHLENBQUNDLE9BQUQsRUFBVUMsVUFBVixFQUFzQkMsYUFBdEIsRUFBcUNDLFdBQXJDLEtBQXFEO0FBQzlFQyxrQkFBYUMsSUFBYixDQUFrQkosVUFBbEIsRUFBOEJDLGFBQTlCLEVBQTZDQyxXQUE3Qzs7QUFDQUcsb0JBQWVELElBQWYsQ0FBb0JKLFVBQXBCLEVBQWdDQyxhQUFoQyxFQUErQ0MsV0FBL0M7O0FBQ0FJLGdCQUFXRixJQUFYLENBQWdCSixVQUFoQixFQUE0QkMsYUFBNUIsRUFBMkNDLFdBQTNDOztBQUVBSCxFQUFBQSxPQUFPLENBQUNRLEVBQVIsQ0FBVyx1QkFBWCxFQUFvQ0osZ0JBQWFLLGFBQWpEO0FBRUFULEVBQUFBLE9BQU8sQ0FBQ1EsRUFBUixDQUFXLHlCQUFYLEVBQXNDRixrQkFBZUcsYUFBckQ7QUFFQVQsRUFBQUEsT0FBTyxDQUFDUSxFQUFSLENBQVcscUJBQVgsRUFBa0NELGNBQVdFLGFBQTdDO0FBQ0FULEVBQUFBLE9BQU8sQ0FBQ1EsRUFBUixDQUFXLHlCQUFYLEVBQXNDRCxjQUFXRyxtQkFBakQ7QUFDRCxDQVhEOztlQWNlWCxrQiIsInNvdXJjZXNDb250ZW50IjpbIi8vQHRzLWNoZWNrXG5pbXBvcnQgZGV2aWNlUm91dGVzIGZyb20gXCIuL3JvdXRlcy9kZXZpY2VcIjtcbmltcG9ydCByZW5kZXJlclJvdXRlcyBmcm9tIFwiLi9yb3V0ZXMvcmVuZGVyZXJcIjtcbmltcG9ydCBzc2RwUm91dGVzIGZyb20gXCIuL3JvdXRlcy9zc2RwXCI7XG5cbi8qKlxuICogQ29uZmlndXJlIHJvdXRlcyBmb3IgaW50ZXJwcm9jZXNzIGNvbW11bmljYXRpb24uXG4gKiBAcGFyYW0ge0VsZWN0cm9uLklwY01haW59IGlwY01haW5cbiAqL1xuY29uc3QgY29uZmlndXJlSXBjUm91dGVzID0gKGlwY01haW4sIG1haW5XaW5kb3csIGRldmljZVByb2Nlc3MsIHNzZHBQcm9jZXNzKSA9PiB7XG4gIGRldmljZVJvdXRlcy5pbml0KG1haW5XaW5kb3csIGRldmljZVByb2Nlc3MsIHNzZHBQcm9jZXNzKTtcbiAgcmVuZGVyZXJSb3V0ZXMuaW5pdChtYWluV2luZG93LCBkZXZpY2VQcm9jZXNzLCBzc2RwUHJvY2Vzcyk7XG4gIHNzZHBSb3V0ZXMuaW5pdChtYWluV2luZG93LCBkZXZpY2VQcm9jZXNzLCBzc2RwUHJvY2Vzcyk7XG5cbiAgaXBjTWFpbi5vbihcImRldmljZS5wcm9jZXNzX2xvYWRlZFwiLCBkZXZpY2VSb3V0ZXMub25Jbml0aWFsaXplZCk7XG5cbiAgaXBjTWFpbi5vbihcInJlbmRlcmVyLnByb2Nlc3NfbG9hZGVkXCIsIHJlbmRlcmVyUm91dGVzLm9uSW5pdGlhbGl6ZWQpO1xuXG4gIGlwY01haW4ub24oXCJzc2RwLnByb2Nlc3NfbG9hZGVkXCIsIHNzZHBSb3V0ZXMub25Jbml0aWFsaXplZCk7XG4gIGlwY01haW4ub24oXCJzc2RwLmRldmljZXNfZGlzY292ZXJlZFwiLCBzc2RwUm91dGVzLm9uRGV2aWNlc0Rpc2NvdmVyZWQpO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZ3VyZUlwY1JvdXRlczsiXSwiZmlsZSI6Im1haW4vaXBjL3JvdXRlcy5qcyJ9
