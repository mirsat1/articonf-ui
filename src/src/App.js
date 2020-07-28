import React, {memo} from "react"
import {Switch, Route} from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Dashboard from "./pages/Dashboard"
import Deploy from "./pages/Deploy"
import Deployment from "./pages/Deployment"
import ContactUs from "./pages/ContactUs"
import Home from "./pages/Home"


function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/beta/testing/">
          <Home />
        </Route>
        <Route exact path="/beta/testing/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/beta/testing/deploy">
          <Deploy />
        </Route>
        <Route exact path="/beta/testing/contact">
          <ContactUs />
        </Route>
        <Route path="/beta/testing/deploy/deployment">
          <Deployment />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default memo(App)
