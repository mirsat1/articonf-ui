import React, { useCallback, useState } from "react";
import { withRouter } from "react-router";
import app from "../firebase";
import { Link } from "react-router-dom";
import { Button, Form } from 'semantic-ui-react'
import Loader from 'react-loader-spinner'

const SignUp = ({ history }) => {
  const [isRegistering, setIsRegistering] = useState(false)
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    setIsRegistering(true)
    const { email, password } = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      history.push("/beta/testing");
    } catch (error) {
      alert(error);
      setIsRegistering(false)
    }
  }, [history]);

  // return (
  //   <div>
  //     <h1>Sign up</h1>
  //     <form onSubmit={handleSignUp}>
  //       <label>
  //         Email
  //         <input name="email" type="email" placeholder="Email" />
  //       </label>
  //       <label>
  //         Password
  //         <input name="password" type="password" placeholder="Password" />
  //       </label>
  //       <button type="submit">Sign Up</button>
  //     </form>
  //   </div>
  // );
  return (
    <div className="theBody" style={{textAlign: "center"}}>
      <div className="login-form">
        <h1 style={{textAlign: "center"}}>Log in</h1>
        <Form onSubmit={handleSignUp}>
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
          
          <Button type="submit">Sign Up</Button>
        </Form>
      </div>
      {
        isRegistering 
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
      <h3 style={{textAlign: "center"}}><Link to="/beta/login">Go to login page</Link></h3>
    </div>
  );
};

export default withRouter(SignUp);