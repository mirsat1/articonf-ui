import React, { memo, useEffect } from "react"
import { Route, useHistory } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Dashboard from "./pages/Dashboard"
import Deploy from "./pages/Deploy"
import Deployer from "./pages/Deployer"
import Deployed from "./pages/Deployed"
import ContactUs from "./pages/ContactUs"
import Home from "./pages/Home"
import PrivateRoute from "./PrivateRoute"
import Login from "./pages/Login"
import UserProfile from "./pages/UserProfile"
import SingUp from "./pages/SingUp"
import TokenBank from "./pages/TokenBank"
import Monitoring from "./pages/Monitoring"
import UserConfig from './components/UserConfig'
import ToscaConfig from './components/ToscaConfig'
import Heap from "reactjs-heap"
import { Button } from "semantic-ui-react"
import Smart from "./pages/Smart"
import Tac from "./pages/Tac"

function App() {
  let history = useHistory();

  // Initialise heap analitycs
  Heap.initialize('3168635468');
  
  // When the app is loaded, sets up crisp chat
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
    <div className="pageContainer">
      <Header />
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute exact path="/articonf-ui" component={Home} />
      <PrivateRoute exact path="/beta/testing" component={Home} />
      <PrivateRoute exact path="/beta/testing/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/beta/testing/deploy" component={Deploy} />
      <PrivateRoute exact path="/beta/testing/deploy/deployment" component={Deployer} />
      <PrivateRoute exact path="/beta/testing/deployed" component={Deployed} />
      <PrivateRoute exact path="/beta/testing/smart" component={Smart} />
      <PrivateRoute exact path="/beta/testing/tac" component={Tac} />
      <PrivateRoute exact path="/beta/testing/bank" component={TokenBank} />
      <PrivateRoute exact path="/beta/testing/monitoring" component={Monitoring} />
      <PrivateRoute exact path="/beta/testing/userprofile" component={UserProfile} />
      <PrivateRoute exact path="/beta/testing/userconfigtic" component={UserConfig} />
      <PrivateRoute exact path="/beta/testing/userconfigtosca" component={ToscaConfig} />
      <Route exact path="/beta/testing/contact" component={ContactUs} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/singup" component={SingUp} />
      <Footer />
      <Button circular icon='angle left' size="massive" onClick={() => history.goBack()} style={{margin: "0.8em", backgroundColor: "rgb(25, 114, 245)", color: "white", bottom: "0", left: "0", position: "fixed", zindex: "9999"}} />
    </div>
  )
}

export default memo(App)
