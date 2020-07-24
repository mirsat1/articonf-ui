import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ContextProvider} from "./Context"
import * as serviceWorker from './serviceWorker';
import axios from "axios"
// import https from "https"

// const proxyurl = "https://damp-coast-51800.herokuapp.com/"
// const url = "https://fry.lab.uvalight.net:30001/manager/"
// axios.defaults.baseURL = ("https://fry.lab.uvalight.net:30001/manager/")
// const agent = new https.Agent({
//   rejectUnauthorized: false,
// })

let encoded = window.btoa('articonf_ui:NzA4ZDA1ZWNjNTc0NTIxNGI0NjM2OWQ5')
let auth = 'Basic ' + encoded
axios.defaults.headers.common['Authorization'] = auth;

ReactDOM.render(
  <ContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ContextProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
