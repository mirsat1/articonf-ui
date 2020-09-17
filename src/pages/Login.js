import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../firebase";
import { Context } from "../Context";
import { Link } from "react-router-dom";
import { Button, Form } from 'semantic-ui-react'

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/beta/testing");
      } catch (error) {
        alert(error);
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
      <h3 style={{textAlign: "center"}}><Link to="/beta/testing/contact">You can contact us for beta testing account here by pressing this link</Link></h3>
    </div>
  );
};

export default withRouter(Login);