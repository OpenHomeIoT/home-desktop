import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import uiReducer from "./reducers/ui";

export const history = createBrowserHistory();

const configureUIStore = (preloadedState) => {
  return createStore(
    uiReducer(history),
    preloadedState,
    compose(applyMiddleware(routerMiddleware(history), window.__REDUX_DEVTOOLS_EXTENSION__()))
    );
}
export default configureUIStore;
