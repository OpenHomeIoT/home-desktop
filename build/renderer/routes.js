"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _HomeView = _interopRequireDefault(require("./views/HomeView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
  path: "/",
  component: _HomeView.default
}));

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlbmRlcmVyL3JvdXRlcy5qcyJdLCJuYW1lcyI6WyJIb21lVmlldyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUVBOzs7O2VBR0UsNkJBQUMsc0JBQUQsUUFDRSw2QkFBQyxxQkFBRDtBQUFPLEVBQUEsSUFBSSxFQUFDLEdBQVo7QUFBZ0IsRUFBQSxTQUFTLEVBQUVBO0FBQTNCLEVBREYsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFN3aXRjaCwgUm91dGUgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xuXG5pbXBvcnQgSG9tZVZpZXcgZnJvbSBcIi4vdmlld3MvSG9tZVZpZXdcIjtcblxuZXhwb3J0IGRlZmF1bHQgKFxuICA8U3dpdGNoPlxuICAgIDxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17SG9tZVZpZXd9IC8+XG4gIDwvU3dpdGNoPlxuKSJdLCJmaWxlIjoicmVuZGVyZXIvcm91dGVzLmpzIn0=
