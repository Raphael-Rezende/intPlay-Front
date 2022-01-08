import 'bootstrap/dist/js/bootstrap.bundle.min';
import "antd/dist/antd.css";
import React from 'react';
import ReactDOM from 'react-dom';
//import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
//Wrequire('dotenv').config();
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}
//import * as serviceWorker from "../serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

//serviceWorker.unregister();

