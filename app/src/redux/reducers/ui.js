import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { UPDATE_PRIMARY_COLOR, UPDATE_SECONDARY_COLOR, UPDATE_FOREGROUND_COLOR, UPDATE_APPBAR_DEFINED, UPDATE_APPBAR_HEIGHT, UPDATE_BOTTOMNAV_DEFINED, UPDATE_NAVDRAWER_OPEN, UPDATE_BOTTOMNAV_HEIGHT, UPDATE_NAVDRAWER_DEFINED } from "../actions/ui";

const ui = (state={
  primaryColor: "#000000",
  secondaryColor: "#000000",
  foregroundColor: "#ffffff",
  appbarDefined: false,
  appbarHeight: 0,
  bottomNavDefined: false,
  bottomNavHeight: 0,
  navDrawerDefined: false,
  navDrawerOpen: false
}, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case UPDATE_PRIMARY_COLOR:
      newState.primaryColor = action.primaryColor;
      break;
    case UPDATE_SECONDARY_COLOR:
      newState.secondaryColor = action.secondaryColor;
      break;
    case UPDATE_FOREGROUND_COLOR:
      newState.foregroundColor = action.foregroundColor;
      break;
    case UPDATE_APPBAR_DEFINED:
      newState.appbarDefined = action.appbarDefined;
      break;
    case UPDATE_APPBAR_HEIGHT:
      newState.appbarHeight = action.appbarHeight;
      break;
    case UPDATE_BOTTOMNAV_DEFINED:
      newState.bottomNavDefined = action.bottomNavDefined;
      break;
    case UPDATE_BOTTOMNAV_HEIGHT:
      newState.bottomNavHeight = action.bottomNavHeight;
      break;
    case UPDATE_NAVDRAWER_DEFINED:
      newState.navDrawerDefined = action.navDrawerDefined;
      break;
    case UPDATE_NAVDRAWER_OPEN:
      newState.navDrawerOpen = action.navDrawerOpen;
      break;
    default:
      break;
  }
  return newState;
};

const uiReducer = (history) => {
  return combineReducers({
    router: connectRouter(history),
    ui
  });
};

export default uiReducer;
