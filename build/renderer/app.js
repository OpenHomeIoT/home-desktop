"use strict";

var _electron = require("electron");

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _history = require("history");

var _reactRouter = require("react-router");

var _routes = _interopRequireDefault(require("./routes"));

var _IconButton = _interopRequireDefault(require("./components/IconButton/IconButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const rootElement = document.querySelector(document.currentScript.getAttribute("data-container")); // TODO: use redux

const routerHistory = (0, _history.createMemoryHistory)();

class App extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: "Home"
    };
  }

  render() {
    const {
      pageTitle
    } = this.state;
    const {} = this.props;
    const style = {
      app: {
        height: "100vh",
        width: "100vw",
        position: "relative"
      },
      appbar: {
        height: 60,
        width: "100vw",
        backgroundColor: "#6c5ce7",
        color: "#ffffff",
        boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
        zIndex: 2
      },
      menuContainer: {
        height: 60,
        display: "flex",
        alignItems: "center",
        margin: "0 0 0 1rem"
      },
      titleContainer: {
        margin: "0 0 0 1.5rem"
      },
      title: {
        fontSize: "1.65rem",
        fontWeight: 300
      },
      navDrawer: {
        height: "calc(100vh - 60px)",
        width: 240,
        transform: "translate(-100%, 0)",
        float: "left",
        zIndex: 1
      },
      content: {
        height: "calc(100vh - 60px)",
        width: "100vw",
        position: "absolute",
        top: 60,
        left: 0,
        zIndex: 0
      }
    };
    return _react.default.createElement("div", {
      style: style.app
    }, _react.default.createElement("div", {
      style: style.appbar
    }, _react.default.createElement("div", {
      style: style.menuContainer
    }, _react.default.createElement("div", {
      style: style.menuButtonContainer
    }, _react.default.createElement(_IconButton.default, null, "menu")), _react.default.createElement("div", {
      style: style.titleContainer
    }, _react.default.createElement("h2", {
      style: style.title
    }, pageTitle)))), _react.default.createElement("div", {
      style: style.navDrawer
    }), _react.default.createElement("div", {
      style: style.content
    }, _react.default.createElement(_reactRouter.Router, {
      history: routerHistory
    }, _routes.default)));
  }

}

_reactDom.default.render(_react.default.createElement(App, null), rootElement); // TODO: put this logic in the common module.


_electron.ipcRenderer.send("renderer.process_loaded", {
  sender: 'renderer',
  recipient: 'main'
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlbmRlcmVyL2FwcC5qcyJdLCJuYW1lcyI6WyJyb290RWxlbWVudCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImN1cnJlbnRTY3JpcHQiLCJnZXRBdHRyaWJ1dGUiLCJyb3V0ZXJIaXN0b3J5IiwiQXBwIiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsInN0YXRlIiwicGFnZVRpdGxlIiwicmVuZGVyIiwic3R5bGUiLCJhcHAiLCJoZWlnaHQiLCJ3aWR0aCIsInBvc2l0aW9uIiwiYXBwYmFyIiwiYmFja2dyb3VuZENvbG9yIiwiY29sb3IiLCJib3hTaGFkb3ciLCJ6SW5kZXgiLCJtZW51Q29udGFpbmVyIiwiZGlzcGxheSIsImFsaWduSXRlbXMiLCJtYXJnaW4iLCJ0aXRsZUNvbnRhaW5lciIsInRpdGxlIiwiZm9udFNpemUiLCJmb250V2VpZ2h0IiwibmF2RHJhd2VyIiwidHJhbnNmb3JtIiwiZmxvYXQiLCJjb250ZW50IiwidG9wIiwibGVmdCIsIm1lbnVCdXR0b25Db250YWluZXIiLCJyb3V0ZXMiLCJSZWFjdERPTSIsImlwY1JlbmRlcmVyIiwic2VuZCIsInNlbmRlciIsInJlY2lwaWVudCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7QUFFQSxNQUFNQSxXQUFXLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QkQsUUFBUSxDQUFDRSxhQUFULENBQXVCQyxZQUF2QixDQUFvQyxnQkFBcEMsQ0FBdkIsQ0FBcEIsQyxDQUVBOztBQUNBLE1BQU1DLGFBQWEsR0FBRyxtQ0FBdEI7O0FBRUEsTUFBTUMsR0FBTixTQUFrQkMsZ0JBQWxCLENBQTRCO0FBQzFCQyxFQUFBQSxXQUFXLENBQUNDLEtBQUQsRUFBUTtBQUNqQixVQUFNQSxLQUFOO0FBQ0EsU0FBS0MsS0FBTCxHQUFhO0FBQ1hDLE1BQUFBLFNBQVMsRUFBRTtBQURBLEtBQWI7QUFHRDs7QUFFREMsRUFBQUEsTUFBTSxHQUFHO0FBQ1AsVUFBTTtBQUFFRCxNQUFBQTtBQUFGLFFBQWdCLEtBQUtELEtBQTNCO0FBQ0EsVUFBTSxLQUFNLEtBQUtELEtBQWpCO0FBQ0EsVUFBTUksS0FBSyxHQUFHO0FBQ1pDLE1BQUFBLEdBQUcsRUFBRTtBQUNIQyxRQUFBQSxNQUFNLEVBQUUsT0FETDtBQUVIQyxRQUFBQSxLQUFLLEVBQUUsT0FGSjtBQUdIQyxRQUFBQSxRQUFRLEVBQUU7QUFIUCxPQURPO0FBTVpDLE1BQUFBLE1BQU0sRUFBRTtBQUNOSCxRQUFBQSxNQUFNLEVBQUUsRUFERjtBQUVOQyxRQUFBQSxLQUFLLEVBQUUsT0FGRDtBQUdORyxRQUFBQSxlQUFlLEVBQUUsU0FIWDtBQUlOQyxRQUFBQSxLQUFLLEVBQUUsU0FKRDtBQUtOQyxRQUFBQSxTQUFTLEVBQUUsd0RBTEw7QUFNTkMsUUFBQUEsTUFBTSxFQUFFO0FBTkYsT0FOSTtBQWNaQyxNQUFBQSxhQUFhLEVBQUU7QUFDYlIsUUFBQUEsTUFBTSxFQUFFLEVBREs7QUFFYlMsUUFBQUEsT0FBTyxFQUFFLE1BRkk7QUFHYkMsUUFBQUEsVUFBVSxFQUFFLFFBSEM7QUFJYkMsUUFBQUEsTUFBTSxFQUFFO0FBSkssT0FkSDtBQW9CWkMsTUFBQUEsY0FBYyxFQUFFO0FBQ2RELFFBQUFBLE1BQU0sRUFBRTtBQURNLE9BcEJKO0FBdUJaRSxNQUFBQSxLQUFLLEVBQUU7QUFDTEMsUUFBQUEsUUFBUSxFQUFFLFNBREw7QUFFTEMsUUFBQUEsVUFBVSxFQUFFO0FBRlAsT0F2Qks7QUEyQlpDLE1BQUFBLFNBQVMsRUFBRTtBQUNUaEIsUUFBQUEsTUFBTSxFQUFFLG9CQURDO0FBRVRDLFFBQUFBLEtBQUssRUFBRSxHQUZFO0FBR1RnQixRQUFBQSxTQUFTLEVBQUUscUJBSEY7QUFJVEMsUUFBQUEsS0FBSyxFQUFFLE1BSkU7QUFLVFgsUUFBQUEsTUFBTSxFQUFFO0FBTEMsT0EzQkM7QUFrQ1pZLE1BQUFBLE9BQU8sRUFBRTtBQUNQbkIsUUFBQUEsTUFBTSxFQUFFLG9CQUREO0FBRVBDLFFBQUFBLEtBQUssRUFBRSxPQUZBO0FBR1BDLFFBQUFBLFFBQVEsRUFBRSxVQUhIO0FBSVBrQixRQUFBQSxHQUFHLEVBQUUsRUFKRTtBQUtQQyxRQUFBQSxJQUFJLEVBQUUsQ0FMQztBQU1QZCxRQUFBQSxNQUFNLEVBQUU7QUFORDtBQWxDRyxLQUFkO0FBMkNBLFdBQ0U7QUFBSyxNQUFBLEtBQUssRUFBRVQsS0FBSyxDQUFDQztBQUFsQixPQUNFO0FBQUssTUFBQSxLQUFLLEVBQUVELEtBQUssQ0FBQ0s7QUFBbEIsT0FDRTtBQUFLLE1BQUEsS0FBSyxFQUFFTCxLQUFLLENBQUNVO0FBQWxCLE9BQ0U7QUFBSyxNQUFBLEtBQUssRUFBRVYsS0FBSyxDQUFDd0I7QUFBbEIsT0FDRSw2QkFBQyxtQkFBRCxlQURGLENBREYsRUFJRTtBQUFLLE1BQUEsS0FBSyxFQUFFeEIsS0FBSyxDQUFDYztBQUFsQixPQUNFO0FBQUksTUFBQSxLQUFLLEVBQUVkLEtBQUssQ0FBQ2U7QUFBakIsT0FBMEJqQixTQUExQixDQURGLENBSkYsQ0FERixDQURGLEVBV0U7QUFBSyxNQUFBLEtBQUssRUFBRUUsS0FBSyxDQUFDa0I7QUFBbEIsTUFYRixFQWNFO0FBQUssTUFBQSxLQUFLLEVBQUVsQixLQUFLLENBQUNxQjtBQUFsQixPQUNFLDZCQUFDLG1CQUFEO0FBQVEsTUFBQSxPQUFPLEVBQUU3QjtBQUFqQixPQUNHaUMsZUFESCxDQURGLENBZEYsQ0FERjtBQXNCRDs7QUE1RXlCOztBQStFNUJDLGtCQUFTM0IsTUFBVCxDQUNFLDZCQUFDLEdBQUQsT0FERixFQUVFWixXQUZGLEUsQ0FLQTs7O0FBQ0F3QyxzQkFBWUMsSUFBWixDQUFpQix5QkFBakIsRUFBNEM7QUFBRUMsRUFBQUEsTUFBTSxFQUFFLFVBQVY7QUFBc0JDLEVBQUFBLFNBQVMsRUFBRTtBQUFqQyxDQUE1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlwY1JlbmRlcmVyIH0gZnJvbSBcImVsZWN0cm9uXCI7XG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiO1xuaW1wb3J0IHsgY3JlYXRlTWVtb3J5SGlzdG9yeSB9IGZyb20gXCJoaXN0b3J5XCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcbmltcG9ydCByb3V0ZXMgZnJvbSBcIi4vcm91dGVzXCI7XG5cbmltcG9ydCBJY29uQnV0dG9uIGZyb20gXCIuL2NvbXBvbmVudHMvSWNvbkJ1dHRvbi9JY29uQnV0dG9uXCI7XG5cbmNvbnN0IHJvb3RFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihkb2N1bWVudC5jdXJyZW50U2NyaXB0LmdldEF0dHJpYnV0ZShcImRhdGEtY29udGFpbmVyXCIpKTtcblxuLy8gVE9ETzogdXNlIHJlZHV4XG5jb25zdCByb3V0ZXJIaXN0b3J5ID0gY3JlYXRlTWVtb3J5SGlzdG9yeSgpO1xuXG5jbGFzcyBBcHAgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgcGFnZVRpdGxlOiBcIkhvbWVcIlxuICAgIH07XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBwYWdlVGl0bGUgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzdHlsZSA9IHtcbiAgICAgIGFwcDoge1xuICAgICAgICBoZWlnaHQ6IFwiMTAwdmhcIixcbiAgICAgICAgd2lkdGg6IFwiMTAwdndcIixcbiAgICAgICAgcG9zaXRpb246IFwicmVsYXRpdmVcIlxuICAgICAgfSxcbiAgICAgIGFwcGJhcjoge1xuICAgICAgICBoZWlnaHQ6IDYwLFxuICAgICAgICB3aWR0aDogXCIxMDB2d1wiLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiIzZjNWNlN1wiLFxuICAgICAgICBjb2xvcjogXCIjZmZmZmZmXCIsXG4gICAgICAgIGJveFNoYWRvdzogXCIwIDNweCA2cHggcmdiYSgwLDAsMCwwLjE2KSwgMCAzcHggNnB4IHJnYmEoMCwwLDAsMC4yMylcIixcbiAgICAgICAgekluZGV4OiAyXG4gICAgICB9LFxuICAgICAgbWVudUNvbnRhaW5lcjoge1xuICAgICAgICBoZWlnaHQ6IDYwLFxuICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAgbWFyZ2luOiBcIjAgMCAwIDFyZW1cIixcbiAgICAgIH0sXG4gICAgICB0aXRsZUNvbnRhaW5lcjoge1xuICAgICAgICBtYXJnaW46IFwiMCAwIDAgMS41cmVtXCJcbiAgICAgIH0sXG4gICAgICB0aXRsZToge1xuICAgICAgICBmb250U2l6ZTogXCIxLjY1cmVtXCIsXG4gICAgICAgIGZvbnRXZWlnaHQ6IDMwMFxuICAgICAgfSxcbiAgICAgIG5hdkRyYXdlcjoge1xuICAgICAgICBoZWlnaHQ6IFwiY2FsYygxMDB2aCAtIDYwcHgpXCIsXG4gICAgICAgIHdpZHRoOiAyNDAsXG4gICAgICAgIHRyYW5zZm9ybTogXCJ0cmFuc2xhdGUoLTEwMCUsIDApXCIsXG4gICAgICAgIGZsb2F0OiBcImxlZnRcIixcbiAgICAgICAgekluZGV4OiAxLFxuICAgICAgfSxcbiAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgaGVpZ2h0OiBcImNhbGMoMTAwdmggLSA2MHB4KVwiLFxuICAgICAgICB3aWR0aDogXCIxMDB2d1wiLFxuICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICB0b3A6IDYwLFxuICAgICAgICBsZWZ0OiAwLFxuICAgICAgICB6SW5kZXg6IDBcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXtzdHlsZS5hcHB9PlxuICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZS5hcHBiYXJ9PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlLm1lbnVDb250YWluZXJ9PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGUubWVudUJ1dHRvbkNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgIDxJY29uQnV0dG9uPm1lbnU8L0ljb25CdXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlLnRpdGxlQ29udGFpbmVyfT5cbiAgICAgICAgICAgICAgPGgyIHN0eWxlPXtzdHlsZS50aXRsZX0+eyBwYWdlVGl0bGUgfTwvaDI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlLm5hdkRyYXdlcn0+XG5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlLmNvbnRlbnR9PlxuICAgICAgICAgIDxSb3V0ZXIgaGlzdG9yeT17cm91dGVySGlzdG9yeX0+XG4gICAgICAgICAgICB7cm91dGVzfVxuICAgICAgICAgIDwvUm91dGVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuUmVhY3RET00ucmVuZGVyKFxuICA8QXBwIC8+LFxuICByb290RWxlbWVudFxuKTtcblxuLy8gVE9ETzogcHV0IHRoaXMgbG9naWMgaW4gdGhlIGNvbW1vbiBtb2R1bGUuXG5pcGNSZW5kZXJlci5zZW5kKFwicmVuZGVyZXIucHJvY2Vzc19sb2FkZWRcIiwgeyBzZW5kZXI6ICdyZW5kZXJlcicsIHJlY2lwaWVudDogJ21haW4nIH0pO1xuXG4iXSwiZmlsZSI6InJlbmRlcmVyL2FwcC5qcyJ9
