import React, { useContext } from "react"
import {Link} from "react-router-dom"
import { Context } from "../Context"
import app from "../firebase"
// import firebase from "firebase/app";
// import logo from "../articonf-logo.jpg"

export default function Header() {
    const {currentUser, usersRef, initialiseIdsOnSignOut, role} = useContext(Context)
    const UCProvider = role === "UCprovider1" || role === "UCprovider2" || role === "UCprovider3" || role === "UCprovider4"
    // const countDown = count === 0 ? 0 : count - 1
    return (
        <div className="container blue circleBehind">
            <Link to="/beta/testing"className="img"><img src="https://i.imgur.com/tgkmCTc.png" alt="articonflogo" /></Link>
            <Link to="/beta/testing"className="a" title="navHome">Home</Link>
            {UCProvider && <Link to="/beta/testing/deploy" className="a" title="deployLink">Deploy</Link>}
            {UCProvider && <Link to="/beta/testing/dashboard" className="a">Advance Configuration</Link>}
            {UCProvider && <Link to="/beta/testing/deployed" className="a">Find Deployed Topology</Link>}
            {UCProvider && <Link to="/beta/testing/smart" className="a">SMART</Link>}
            <Link to="/beta/testing/bank" className="a">Analitycs & Visualisations</Link>
            <Link to="/beta/testing/monitoring" className="a">Monitoring</Link>
            <Link to="/beta/testing/contact" className="a" title="contactUs">Contact Us</Link>
            <Link to="/beta/testing/userprofile" className="a" title="contactUs">Your Profile</Link>
            {currentUser ? 
            <Link to="/login" className="a" onClick={async () => {
                await app.auth().signOut()
                initialiseIdsOnSignOut();
                usersRef.remove();
            }}>Sign Out</Link>
            :
            <Link to="/login" className="a">Sign In</Link>
            }
        </div>
    )
}