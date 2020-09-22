import React, { useCallback, useContext, useEffect, useState } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../firebase";
import { Context } from "../Context";
import { Link } from "react-router-dom";
import { Button, Form } from 'semantic-ui-react'
import Loader from 'react-loader-spinner'

const Login = ({ history }) => {
  useEffect(() => {
    return function cleanup() {
      setIsLogging(false)
    }
  }, [])
  const [isLogging, setIsLogging] = useState(false)
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      setIsLogging(true)
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/beta/testing");
      } catch (error) {
        alert(error);
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
        <h1 style={{textAlign: "center"}}>Log in</h1>
        <Form onSubmit={handleLogin}>
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
          
          <Button type="submit">Log in</Button>
        </Form>
      </div>
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
      <h3 style={{textAlign: "center"}}><Link to="/beta/testing/contact">You can contact us for beta testing account here by pressing this link</Link></h3>
    </div>
  );
};

export default withRouter(Login);