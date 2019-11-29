// import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
// import { connectRouter, routerMiddleware, push } from 'connected-react-router';
// import persistState from 'redux-localstorage';
// import thunk from 'redux-thunk';
// import user from './reducers/user';
// import userActions from './actions/user';
// export default function configureStore(initialState, routerHistory) {
//   const router = routerMiddleware(routerHistory);
//   const actionCreators = {
//     ...userActions,
//     push,
//   };
//   const reducers = {
//     router: connectRouter(routerHistory),
//     user,
//   };
//   const middlewares = [thunk, router];
//   const composeEnhancers = (() => {
//     const compose_ = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
//     if (process.env.NODE_ENV === 'development' && compose_) {
//       return compose_({ actionCreators });
//     }
//     return compose;
//   })();
//   const enhancer = composeEnhancers(applyMiddleware(...middlewares), persistState());
//   const rootReducer = combineReducers(reducers);
//   return createStore(rootReducer, initialState, enhancer);
// }
"use strict";
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlbmRlcmVyL29sZC9zdG9yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IGNyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUsIGNvbWJpbmVSZWR1Y2VycywgY29tcG9zZSB9IGZyb20gJ3JlZHV4Jztcbi8vIGltcG9ydCB7IGNvbm5lY3RSb3V0ZXIsIHJvdXRlck1pZGRsZXdhcmUsIHB1c2ggfSBmcm9tICdjb25uZWN0ZWQtcmVhY3Qtcm91dGVyJztcbi8vIGltcG9ydCBwZXJzaXN0U3RhdGUgZnJvbSAncmVkdXgtbG9jYWxzdG9yYWdlJztcbi8vIGltcG9ydCB0aHVuayBmcm9tICdyZWR1eC10aHVuayc7XG5cbi8vIGltcG9ydCB1c2VyIGZyb20gJy4vcmVkdWNlcnMvdXNlcic7XG4vLyBpbXBvcnQgdXNlckFjdGlvbnMgZnJvbSAnLi9hY3Rpb25zL3VzZXInO1xuXG4vLyBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb25maWd1cmVTdG9yZShpbml0aWFsU3RhdGUsIHJvdXRlckhpc3RvcnkpIHtcbi8vICAgY29uc3Qgcm91dGVyID0gcm91dGVyTWlkZGxld2FyZShyb3V0ZXJIaXN0b3J5KTtcblxuLy8gICBjb25zdCBhY3Rpb25DcmVhdG9ycyA9IHtcbi8vICAgICAuLi51c2VyQWN0aW9ucyxcbi8vICAgICBwdXNoLFxuLy8gICB9O1xuXG4vLyAgIGNvbnN0IHJlZHVjZXJzID0ge1xuLy8gICAgIHJvdXRlcjogY29ubmVjdFJvdXRlcihyb3V0ZXJIaXN0b3J5KSxcbi8vICAgICB1c2VyLFxuLy8gICB9O1xuXG4vLyAgIGNvbnN0IG1pZGRsZXdhcmVzID0gW3RodW5rLCByb3V0ZXJdO1xuXG4vLyAgIGNvbnN0IGNvbXBvc2VFbmhhbmNlcnMgPSAoKCkgPT4ge1xuLy8gICAgIGNvbnN0IGNvbXBvc2VfID0gd2luZG93ICYmIHdpbmRvdy5fX1JFRFVYX0RFVlRPT0xTX0VYVEVOU0lPTl9DT01QT1NFX187XG4vLyAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnICYmIGNvbXBvc2VfKSB7XG4vLyAgICAgICByZXR1cm4gY29tcG9zZV8oeyBhY3Rpb25DcmVhdG9ycyB9KTtcbi8vICAgICB9XG4vLyAgICAgcmV0dXJuIGNvbXBvc2U7XG4vLyAgIH0pKCk7XG5cbi8vICAgY29uc3QgZW5oYW5jZXIgPSBjb21wb3NlRW5oYW5jZXJzKGFwcGx5TWlkZGxld2FyZSguLi5taWRkbGV3YXJlcyksIHBlcnNpc3RTdGF0ZSgpKTtcbi8vICAgY29uc3Qgcm9vdFJlZHVjZXIgPSBjb21iaW5lUmVkdWNlcnMocmVkdWNlcnMpO1xuXG4vLyAgIHJldHVybiBjcmVhdGVTdG9yZShyb290UmVkdWNlciwgaW5pdGlhbFN0YXRlLCBlbmhhbmNlcik7XG4vLyB9XG4iXSwiZmlsZSI6InJlbmRlcmVyL29sZC9zdG9yZS5qcyJ9
