import React, { useContext } from "react"
import {Link} from "react-router-dom"
import { Context } from "../Context"
import app from "../firebase"
// import logo from "../articonf-logo.jpg"

export default function Header() {
    const {currentUser, deleteProvision} = useContext(Context)
    return (
        <div className="container blue circleBehind">
            <Link to="/beta/testing"className="img"><img src="https://i.imgur.com/tgkmCTc.png" alt="articonflogo" /></Link>
            <Link to="/beta/testing"className="a">Home</Link>
            <Link to="/beta/testing/deploy" className="a">Deploy</Link>
            <Link to="/beta/testing/dashboard" className="a">Advance Configuration</Link>
            <Link to="/beta/testing/deployed" className="a">Find Deployed Topology</Link>
            <Link to="/beta/testing/bank" className="a">Token Bank</Link>
            <Link to="/beta/testing/contact" className="a">Contact Us</Link>
            {currentUser ? 
            <Link to="/login" className="a" onClick={() => {
                app.auth().signOut()
                deleteProvision()
            }}>Sing Out</Link>
            :
            <Link to="/login" className="a">Sing In</Link>
            }
        </div>
    )
}