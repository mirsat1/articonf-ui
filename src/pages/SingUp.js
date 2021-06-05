import React, { useCallback, useEffect, useState } from "react";
import { withRouter } from "react-router";
import app from "../firebase";
import firebase from "firebase/app";
import axios from "axios"
import { Link } from "react-router-dom";
import { Button, Form } from 'semantic-ui-react'
import Loader from 'react-loader-spinner'

const SignUp = ({ history }) => {
  const [isRegistering, setIsRegistering] = useState(false)
  const [role, setRole] = useState("UCuser1")
  const [key, setKey] = useState("")
  const [keyID, setKeyID] = useState("")
  const UCProvider = role === "UCprovider1" || role === "UCprovider2" || role === "UCprovider3" || role === "UCprovider4"
  useEffect(() => {
    if (UCProvider) {
      axios.get(`https://articonf2.firebaseio.com/uc_provider/${role}.json`)
        .then(res => setKeyID(res.data.key))
    }
  }, [UCProvider, role])

  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    setIsRegistering(true)
    const { email, password } = event.target.elements;
    if (UCProvider) {
      if (key === keyID) {
        try {
          await app
              .auth()
              .createUserWithEmailAndPassword(email.value, password.value)
              .then(regUser => {
                firebase.database().ref('user_profile/' + regUser.user.uid).set({
                  role: role
                })
              })
              history.push("/beta/testing");
        } catch (error) {
          alert(error);
          setIsRegistering(false)
        }
      } else {
        alert("Wrong key!")
        setIsRegistering(false)
      }
    } else {
      try {
        await app
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value)
            .then(regUser => {
              firebase.database().ref('user_profile/' + regUser.user.uid).set({
                role: role
              })
            })
            history.push("/beta/testing");
      } catch (error) {
        alert(error);
        setIsRegistering(false)
      }
    }
    // try {
    //   await app
    //       .auth()
    //       .createUserWithEmailAndPassword(email.value, password.value)
    //       .then(regUser => {
    //         firebase.database().ref('user_profile/' + regUser.user.uid).set({
    //           role: role
    //         })
    //       })
    //       history.push("/beta/testing");
    // } catch (error) {
    //   alert(error);
    //   setIsRegistering(false)
    // }
  }, [history, role, UCProvider, key, keyID]);

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
        <h1 style={{textAlign: "center"}}>Register account</h1>
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
          <Form.Field>
            <label>
              Role
            </label>
            <select onChange={e => setRole(e.target.value)} defaultValue="UCuser1">
              <option value="UCprovider1">Use case provider - Crowd journalism</option>
              <option value="UCprovider2">Use case provider - Smart energy</option>
              <option value="UCprovider3">Use case provider - Video opinion</option>
              <option value="UCprovider4">Use case provider - Car shariing</option>
              <option value="UCuser1">Use case user - Crowd journalism</option>
              <option value="UCuser2">Use case user - Smart energy</option>
              <option value="UCuser3">Use case user - Video opinion</option>
              <option value="UCuser4">Use case user - Car shariing</option>
            </select>
          </Form.Field>
          {UCProvider && <Form.Field>
                        <label>
                        Unique key
                        <input onChange={e => setKey(e.target.value)} name="key" type="text" placeholder="Unique key" />
                    </label>
                    </Form.Field>}
          
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
      <h3 style={{textAlign: "center"}}><Link to="/login">Go to login page</Link></h3>
    </div>
  );
};

export default withRouter(SignUp);