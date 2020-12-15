import React, { useContext } from "react"
import {Link} from "react-router-dom"
import { Context } from "../Context"
import app from "../firebase"
// import firebase from "firebase/app";
// import logo from "../articonf-logo.jpg"

export default function Header() {
    const {currentUser, usersRef} = useContext(Context)
    // const countDown = count === 0 ? 0 : count - 1
    return (
        <div className="container blue circleBehind">
            <Link to="/beta/testing"className="img"><img src="https://i.imgur.com/tgkmCTc.png" alt="articonflogo" /></Link>
            <Link to="/beta/testing"className="a">Home</Link>
            <Link to="/beta/testing/deploy" className="a">Deploy</Link>
            <Link to="/beta/testing/dashboard" className="a">Advance Configuration</Link>
            <Link to="/beta/testing/deployed" className="a">Find Deployed Topology</Link>
            <Link to="/beta/testing/bank" className="a">SMART and TAC</Link>
            <Link to="/beta/testing/contact" className="a">Contact Us</Link>
            {currentUser ? 
            <Link to="/login" className="a" onClick={async () => {
                app.auth().signOut()
                usersRef.remove();
            }}>Sign Out</Link>
            :
            <Link to="/login" className="a">Sign In</Link>
            }
        </div>
    )
}