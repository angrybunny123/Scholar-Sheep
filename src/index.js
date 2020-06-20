import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "./store/reducers/auth";
import signupReducer from "./store/reducers/signup";
import quizzesReducer from "./store/reducers/quizzes";

const rootReducer = combineReducers({
  auth: authReducer,
  signup: signupReducer,
  quizzes: quizzesReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const app = (
  //Provider wraps browser router!
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(
  <React.StrictMode>{app}</React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
