import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ContextProvider} from "./Context"
import {BrowserRouter as Router} from "react-router-dom"
import * as serviceWorker from './serviceWorker';
import axios from "axios"
import 'semantic-ui-css/semantic.min.css'
// import https from "https"

// const proxyurl = "https://damp-coast-51800.herokuapp.com/"
// const url = "http://fry.lab.uvalight.net:30000/manager/"
// *****************************************************************************
//                          new CONF endpoint                                  *
// *****************************************************************************
// axios.defaults.baseURL = ("https://conf.lab.uvalight.net:30001/orchestrator/")
axios.defaults.baseURL = ("https://conf.lab.uvalight.net:30002/orchestrator/")
// const agent = new https.Agent({
//   rejectUnauthorized: false,
// })

let encoded = window.btoa('articonf_ui:NzA4ZDA1ZWNjNTc0NTIxNGI0NjM2OWQ5')
let auth = 'Basic ' + encoded
axios.defaults.headers.common['Authorization'] = auth;

ReactDOM.render(
  <ContextProvider>
    <Router>
        <App />
    </Router>
  </ContextProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
