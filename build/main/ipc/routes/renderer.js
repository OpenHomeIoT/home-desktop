"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//@ts-check
let _mainWindow = null;
let _deviceProcess = null;
let _ssdpProcess = null;
/**
 * Initialize the renderer ipc routes.
 */

const init = (mainWindow, deviceProcess, ssdpProcess) => {
  _mainWindow = mainWindow;
  _deviceProcess = deviceProcess;
  _ssdpProcess = ssdpProcess;
};

const onInitialized = (event, {
  sender,
  recipient
}) => {
  console.log("Renderer process initialized.");
};

var _default = {
  init,
  onInitialized
};
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vaXBjL3JvdXRlcy9yZW5kZXJlci5qcyJdLCJuYW1lcyI6WyJfbWFpbldpbmRvdyIsIl9kZXZpY2VQcm9jZXNzIiwiX3NzZHBQcm9jZXNzIiwiaW5pdCIsIm1haW5XaW5kb3ciLCJkZXZpY2VQcm9jZXNzIiwic3NkcFByb2Nlc3MiLCJvbkluaXRpYWxpemVkIiwiZXZlbnQiLCJzZW5kZXIiLCJyZWNpcGllbnQiLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBLElBQUlBLFdBQVcsR0FBRyxJQUFsQjtBQUNBLElBQUlDLGNBQWMsR0FBRyxJQUFyQjtBQUNBLElBQUlDLFlBQVksR0FBRyxJQUFuQjtBQUVBOzs7O0FBR0EsTUFBTUMsSUFBSSxHQUFHLENBQUNDLFVBQUQsRUFBYUMsYUFBYixFQUE0QkMsV0FBNUIsS0FBNEM7QUFDdkROLEVBQUFBLFdBQVcsR0FBR0ksVUFBZDtBQUNBSCxFQUFBQSxjQUFjLEdBQUdJLGFBQWpCO0FBQ0FILEVBQUFBLFlBQVksR0FBR0ksV0FBZjtBQUNELENBSkQ7O0FBTUEsTUFBTUMsYUFBYSxHQUFHLENBQUNDLEtBQUQsRUFBUTtBQUFFQyxFQUFBQSxNQUFGO0FBQVVDLEVBQUFBO0FBQVYsQ0FBUixLQUFrQztBQUN0REMsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksK0JBQVo7QUFDRCxDQUZEOztlQUllO0FBQ2JULEVBQUFBLElBRGE7QUFFYkksRUFBQUE7QUFGYSxDIiwic291cmNlc0NvbnRlbnQiOlsiLy9AdHMtY2hlY2tcbmxldCBfbWFpbldpbmRvdyA9IG51bGw7XG5sZXQgX2RldmljZVByb2Nlc3MgPSBudWxsO1xubGV0IF9zc2RwUHJvY2VzcyA9IG51bGw7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSB0aGUgcmVuZGVyZXIgaXBjIHJvdXRlcy5cbiAqL1xuY29uc3QgaW5pdCA9IChtYWluV2luZG93LCBkZXZpY2VQcm9jZXNzLCBzc2RwUHJvY2VzcykgPT4ge1xuICBfbWFpbldpbmRvdyA9IG1haW5XaW5kb3c7XG4gIF9kZXZpY2VQcm9jZXNzID0gZGV2aWNlUHJvY2VzcztcbiAgX3NzZHBQcm9jZXNzID0gc3NkcFByb2Nlc3M7XG59O1xuXG5jb25zdCBvbkluaXRpYWxpemVkID0gKGV2ZW50LCB7IHNlbmRlciwgcmVjaXBpZW50IH0pID0+IHtcbiAgY29uc29sZS5sb2coXCJSZW5kZXJlciBwcm9jZXNzIGluaXRpYWxpemVkLlwiKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0LFxuICBvbkluaXRpYWxpemVkXG59O1xuIl0sImZpbGUiOiJtYWluL2lwYy9yb3V0ZXMvcmVuZGVyZXIuanMifQ==
