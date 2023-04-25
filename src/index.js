import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore }
    from '@reduxjs/toolkit';
import bingeitReducer from "./store";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "bootswatch/dist/cyborg/bootstrap.min.css";
import usersReducer from "./users/users-reducer";
const root = ReactDOM.createRoot(document.getElementById("root"));
const store = configureStore({
  reducer: {
    bingeit: bingeitReducer,
    user: usersReducer,
  },
});
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
