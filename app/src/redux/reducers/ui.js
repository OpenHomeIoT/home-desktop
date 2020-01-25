import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { UPDATE_PRIMARY_COLOR, UPDATE_SECONDARY_COLOR, UPDATE_FOREGROUND_COLOR, UPDATE_APPBAR_DEFINED, UPDATE_APPBAR_HEIGHT, UPDATE_BOTTOMNAV_DEFINED, UPDATE_NAVDRAWER_OPEN, UPDATE_BOTTOMNAV_HEIGHT, UPDATE_NAVDRAWER_DEFINED } from "../actions/ui";

const ui = () =>  {
  return (state, action) => {
    switch (action.type) {
      case UPDATE_PRIMARY_COLOR: state.primaryColor = action.primaryColor; break;
      case UPDATE_SECONDARY_COLOR: state.secondaryColor = action.secondaryColor; break;
      case UPDATE_FOREGROUND_COLOR: state.foregroundColor = action.foregroundColor; break;
      case UPDATE_APPBAR_DEFINED: state.appbarDefined = action.appbarDefined; break;
      case UPDATE_APPBAR_HEIGHT: state.appbarHeight = action.appbarHeight; break;
      case UPDATE_BOTTOMNAV_DEFINED: state.bottomNavDefined = action.bottomNavDefined; break;
      case UPDATE_BOTTOMNAV_HEIGHT: state.bottomNavHeight = action.bottomNavHeight; break;
      case UPDATE_NAVDRAWER_DEFINED: state.navDrawerDefined = action.navDrawerDefined; break;
      case UPDATE_NAVDRAWER_OPEN: state.navDrawerOpen = action.navDrawerOpen; break;
      default: break;
    }
    return state;
  };
}

const uiReducer = (history) => {
  return combineReducers({
    router: connectRouter(history),
    ui
  });
};

export default uiReducer;
