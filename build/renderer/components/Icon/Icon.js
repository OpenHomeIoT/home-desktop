"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Icon = ({
  children: icon,
  style: compStyle
}) => {
  const style = {
    icon: {}
  };
  Object.assign(style.icon, compStyle);
  return _react.default.createElement("div", {
    style: style.icon
  }, _react.default.createElement("i", {
    className: "material-icons"
  }, icon));
};

Icon.propTypes = {
  children: _propTypes.default.string
};
var _default = Icon;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlbmRlcmVyL2NvbXBvbmVudHMvSWNvbi9JY29uLmpzIl0sIm5hbWVzIjpbIkljb24iLCJjaGlsZHJlbiIsImljb24iLCJzdHlsZSIsImNvbXBTdHlsZSIsIk9iamVjdCIsImFzc2lnbiIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsInN0cmluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7O0FBRUEsTUFBTUEsSUFBSSxHQUFHLENBQUM7QUFBRUMsRUFBQUEsUUFBUSxFQUFFQyxJQUFaO0FBQWtCQyxFQUFBQSxLQUFLLEVBQUVDO0FBQXpCLENBQUQsS0FBMEM7QUFDckQsUUFBTUQsS0FBSyxHQUFHO0FBQ1pELElBQUFBLElBQUksRUFBRTtBQURNLEdBQWQ7QUFLQUcsRUFBQUEsTUFBTSxDQUFDQyxNQUFQLENBQWNILEtBQUssQ0FBQ0QsSUFBcEIsRUFBMEJFLFNBQTFCO0FBQ0EsU0FDRTtBQUFLLElBQUEsS0FBSyxFQUFFRCxLQUFLLENBQUNEO0FBQWxCLEtBQ0U7QUFBRyxJQUFBLFNBQVMsRUFBQztBQUFiLEtBQStCQSxJQUEvQixDQURGLENBREY7QUFLRCxDQVpEOztBQWNBRixJQUFJLENBQUNPLFNBQUwsR0FBaUI7QUFDZk4sRUFBQUEsUUFBUSxFQUFFTyxtQkFBVUM7QUFETCxDQUFqQjtlQUllVCxJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IEljb24gPSAoeyBjaGlsZHJlbjogaWNvbiwgc3R5bGU6IGNvbXBTdHlsZSB9KSA9PiB7XG4gIGNvbnN0IHN0eWxlID0ge1xuICAgIGljb246IHtcblxuICAgIH1cbiAgfTtcbiAgT2JqZWN0LmFzc2lnbihzdHlsZS5pY29uLCBjb21wU3R5bGUpO1xuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3N0eWxlLmljb259PlxuICAgICAgPGkgY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnNcIj57aWNvbn08L2k+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbkljb24ucHJvcFR5cGVzID0ge1xuICBjaGlsZHJlbjogUHJvcFR5cGVzLnN0cmluZ1xufVxuIFxuZXhwb3J0IGRlZmF1bHQgSWNvbjsiXSwiZmlsZSI6InJlbmRlcmVyL2NvbXBvbmVudHMvSWNvbi9JY29uLmpzIn0=
