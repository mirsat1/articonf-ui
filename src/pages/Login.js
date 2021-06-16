import React, { useCallback, useContext, useEffect, useState } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../firebase";
import firebase from "firebase/app";
// import axiosBase from "../axios/axios-base"
import { Context } from "../Context";
import { Link } from "react-router-dom";
import { Button, Form } from 'semantic-ui-react'
import ResetPassword from "../components/ResetPassword";
import Loader from 'react-loader-spinner'
import useToggler from "../hooks/useToggler";

const Login = ({ history }) => {
  // const [userLogged, setUserLogged] = useState(null)
  // useEffect(() => {
  //   axiosBase.get('/user.json')
  //     .then(response => setUserLogged(response.data.isLogged))
  //     .catch(err => console.log(err))
  //   return function cleanup() {
  //     setIsLogging(false)
  //   }
  // }, [])
  const [userCount, setUserCount] = useState(null)
  const [hasError, setHasError] = useState("")
  const [show, toggle] = useToggler(false)
  
  useEffect(() => {
    const usersRef = firebase.database().ref('users/')
    usersRef.once("value")
    .then(snapshot => {
      let a = snapshot.numChildren()
      setUserCount(a)
    })
  }, [])
  const [isLogging, setIsLogging] = useState(false)
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      setIsLogging(true)
      const { email, password } = event.target.elements;
      try {
        // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/beta/testing");
      } catch (error) {
        setHasError(error.message)
        setIsLogging(false)
      }
    },
    [history]
  );

  const { currentUser } = useContext(Context);

  if (currentUser) {
    return <Redirect to="/beta/testing" />;
  }

  return (
    <div className="theBody" style={{textAlign: "center"}}>
      <div className="login-form">
        <h1 style={{textAlign: "center"}} title="loginPageTitle">Log in page</h1>
        <Form onSubmit={handleLogin} title="loginForm">
          <Form.Field>
            <label>
              Email
              <input name="email" type="email" placeholder="Email" />
            </label>
          </Form.Field>
          <Form.Field>
            <label>
            Password
            <input name="password" type="password" placeholder="Password" />
          </label>
          </Form.Field>
          
          <Button type="submit" disabled={userCount >= 9} title="loginButton">Log in</Button>
        </Form>
      <Button floated="left" onClick={toggle}>Forgot password?</Button><br />
      </div>
      {show && <ResetPassword />}
      {
        isLogging 
        &&
        <div>
          <h3>Logging in <Loader
            type="ThreeDots"
            color="#08335e"
            height={50}
            width={50}
          />
          </h3>  
        </div>
      }
      {
        hasError
        &&
        <div>
          <h3 data-testid="errorMsg">
            {hasError}
          </h3>
        </div>
      }
      <h3 style={{textAlign: "center"}}><Link to="/singup">Please sign up here!</Link></h3>
      <h3>Since we are still in early beta, only 8 user at the same time can use the platform</h3>
      <h3>Users logged at this time: {userCount - 1}</h3>
    </div>
  );
};

export default withRouter(Login);