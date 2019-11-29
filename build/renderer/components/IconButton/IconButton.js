"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Icon = _interopRequireDefault(require("../Icon/Icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const IconButton = ({
  children: icon,
  onClick,
  style: compStyle
}) => {
  const style = {
    iconButton: {
      userSelect: "none",
      cursor: "pointer"
    }
  };
  Object.assign(style.iconButton, compStyle);
  return _react.default.createElement("div", {
    style: style.iconButton,
    onClick: onClick
  }, _react.default.createElement(_Icon.default, null, icon));
};

IconButton.propTypes = {
  children: _propTypes.default.string,
  onClick: _propTypes.default.func
};
var _default = IconButton;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlbmRlcmVyL2NvbXBvbmVudHMvSWNvbkJ1dHRvbi9JY29uQnV0dG9uLmpzIl0sIm5hbWVzIjpbIkljb25CdXR0b24iLCJjaGlsZHJlbiIsImljb24iLCJvbkNsaWNrIiwic3R5bGUiLCJjb21wU3R5bGUiLCJpY29uQnV0dG9uIiwidXNlclNlbGVjdCIsImN1cnNvciIsIk9iamVjdCIsImFzc2lnbiIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsInN0cmluZyIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFQTs7OztBQUVBLE1BQU1BLFVBQVUsR0FBRyxDQUFDO0FBQUVDLEVBQUFBLFFBQVEsRUFBRUMsSUFBWjtBQUFrQkMsRUFBQUEsT0FBbEI7QUFBMkJDLEVBQUFBLEtBQUssRUFBRUM7QUFBbEMsQ0FBRCxLQUFtRDtBQUNwRSxRQUFNRCxLQUFLLEdBQUc7QUFDWkUsSUFBQUEsVUFBVSxFQUFFO0FBQ1ZDLE1BQUFBLFVBQVUsRUFBRSxNQURGO0FBRVZDLE1BQUFBLE1BQU0sRUFBRTtBQUZFO0FBREEsR0FBZDtBQU1BQyxFQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBY04sS0FBSyxDQUFDRSxVQUFwQixFQUFnQ0QsU0FBaEM7QUFDQSxTQUNFO0FBQUssSUFBQSxLQUFLLEVBQUVELEtBQUssQ0FBQ0UsVUFBbEI7QUFBOEIsSUFBQSxPQUFPLEVBQUVIO0FBQXZDLEtBQ0UsNkJBQUMsYUFBRCxRQUFRRCxJQUFSLENBREYsQ0FERjtBQUtELENBYkQ7O0FBZUFGLFVBQVUsQ0FBQ1csU0FBWCxHQUF1QjtBQUNyQlYsRUFBQUEsUUFBUSxFQUFFVyxtQkFBVUMsTUFEQztBQUVyQlYsRUFBQUEsT0FBTyxFQUFFUyxtQkFBVUU7QUFGRSxDQUF2QjtlQUtlZCxVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCBJY29uIGZyb20gXCIuLi9JY29uL0ljb25cIjtcblxuY29uc3QgSWNvbkJ1dHRvbiA9ICh7IGNoaWxkcmVuOiBpY29uLCBvbkNsaWNrLCBzdHlsZTogY29tcFN0eWxlIH0pID0+IHtcbiAgY29uc3Qgc3R5bGUgPSB7XG4gICAgaWNvbkJ1dHRvbjoge1xuICAgICAgdXNlclNlbGVjdDogXCJub25lXCIsXG4gICAgICBjdXJzb3I6IFwicG9pbnRlclwiXG4gICAgfVxuICB9O1xuICBPYmplY3QuYXNzaWduKHN0eWxlLmljb25CdXR0b24sIGNvbXBTdHlsZSk7XG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17c3R5bGUuaWNvbkJ1dHRvbn0gb25DbGljaz17b25DbGlja30+XG4gICAgICA8SWNvbj57IGljb24gfTwvSWNvbj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuSWNvbkJ1dHRvbi5wcm9wVHlwZXMgPSB7XG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuY1xufTtcbiBcbmV4cG9ydCBkZWZhdWx0IEljb25CdXR0b247Il0sImZpbGUiOiJyZW5kZXJlci9jb21wb25lbnRzL0ljb25CdXR0b24vSWNvbkJ1dHRvbi5qcyJ9
