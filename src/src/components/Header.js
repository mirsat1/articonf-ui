import React from "react"
import {Link} from "react-router-dom"
// import logo from "../articonf-logo.jpg"

export default function Header() {
    return (
        <div className="container blue circleBehind">
            <Link to="/beta/testing"className="img"><img src="https://i.imgur.com/tgkmCTc.png" alt="articonflogo" /></Link>
            <Link to="/beta/testing"className="a">Home</Link>
            <Link to="/beta/testing/deploy" className="a">Deploy</Link>
            <Link to="/beta/testing/dashboard" className="a">Advance Configuration</Link>
            <Link to="/beta/testing/contact" className="a">Contact Us</Link>
        </div>
    )
}