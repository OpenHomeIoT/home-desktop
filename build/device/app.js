"use strict";

var _electron = require("electron");

// TODO: move logic to common module
_electron.ipcRenderer.send("device.process_loaded", {
  sender: "device",
  recipient: "main"
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldmljZS9hcHAuanMiXSwibmFtZXMiOlsiaXBjUmVuZGVyZXIiLCJzZW5kIiwic2VuZGVyIiwicmVjaXBpZW50Il0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBO0FBQ0FBLHNCQUFZQyxJQUFaLENBQWlCLHVCQUFqQixFQUEwQztBQUFFQyxFQUFBQSxNQUFNLEVBQUUsUUFBVjtBQUFvQkMsRUFBQUEsU0FBUyxFQUFFO0FBQS9CLENBQTFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXBjUmVuZGVyZXIgfSBmcm9tIFwiZWxlY3Ryb25cIjtcblxuLy8gVE9ETzogbW92ZSBsb2dpYyB0byBjb21tb24gbW9kdWxlXG5pcGNSZW5kZXJlci5zZW5kKFwiZGV2aWNlLnByb2Nlc3NfbG9hZGVkXCIsIHsgc2VuZGVyOiBcImRldmljZVwiLCByZWNpcGllbnQ6IFwibWFpblwiIH0pOyJdLCJmaWxlIjoiZGV2aWNlL2FwcC5qcyJ9
