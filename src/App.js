import React, { memo } from "react"
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
import SingUp from "./pages/SingUp"
import TokenBank from "./pages/TokenBank"

function App() {
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
      <Route exact path="/singup" component={SingUp} />
      <Footer />
    </div>
  )
}

export default memo(App)
