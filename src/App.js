import React, { memo, useEffect } from "react"
import { Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Dashboard from "./pages/Dashboard"
import Deploy from "./pages/Deploy"
import Deployment from "./pages/Deployment"
import Deployed from "./pages/Deployed"
import ContactUs from "./pages/ContactUs"
import Home from "./pages/Home"
import PrivateRoute from "./PrivateRoute"
import Login from "./pages/Login"
// import SingUp from "./pages/SingUp"
import TokenBank from "./pages/TokenBank"
import Heap from "reactjs-heap"

function App() {
  Heap.initialize('3168635468');
  
  useEffect(() => {
    window.$crisp=[];
    window.CRISP_WEBSITE_ID="6d88474b-e371-4d77-bf41-8e0a5500e3d7";
    (function(){
      const d=document;
      const s=d.createElement("script");
      s.src="https://client.crisp.chat/l.js";
      s.async=1;
      d.getElementsByTagName("head")[0].appendChild(s);
    })();
  }, [])
  return (
    <div>
      <Header />
      <PrivateRoute exact path="/beta/testing" component={Home} />
      <PrivateRoute exact path="/beta/testing/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/beta/testing/deploy" component={Deploy} />
      <PrivateRoute exact path="/beta/testing/deploy/deployment" component={Deployment} />
      <PrivateRoute exact path="/beta/testing/deployed" component={Deployed} />
      <PrivateRoute exact path="/beta/testing/bank" component={TokenBank} />
      <Route exact path="/beta/testing/contact" component={ContactUs} />
      <Route exact path="/login" component={Login} />
      {/* <Route exact path="/singup" component={SingUp} /> */}
      <Footer />
    </div>
  )
}

export default memo(App)
