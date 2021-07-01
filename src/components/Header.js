import React, { useContext } from "react"
import {Link} from "react-router-dom"
import { Context } from "../Context"
import { Sidebar, Menu, Icon, Button } from "semantic-ui-react"
import useToggler from "../hooks/useToggler"
import app from "../firebase"
// import firebase from "firebase/app";
// import logo from "../articonf-logo.jpg"

export default function Header() {
    const {currentUser, usersRef, initialiseIdsOnSignOut, role} = useContext(Context)
    const [showMenu, toggleMenu] = useToggler(true)
    const UCProvider = (RegExp("UCprovider").test(role))
    // const countDown = count === 0 ? 0 : count - 1
    return (
        <div>
            <div className="container blue circleBehind">
                <Button 
                    content='Toggle menu' 
                    icon={showMenu ? 'left arrow' : 'right arrow'} 
                    labelPosition={showMenu ? 'left' : 'right'} 
                    floated="left" 
                    onClick={toggleMenu} 
                />
                <Link to="/beta/testing" style={{textAlign: "center"}}><img src="https://i.imgur.com/tgkmCTc.png" alt="articonflogo" /></Link>
                {/* <Link to="/beta/testing"className="a" title="navHome">Home</Link>
                {UCProvider && <Link to="/beta/testing/deploy" className="a" title="deployLink">Deploy</Link>}
                {UCProvider && <Link to="/beta/testing/dashboard" className="a">Advance Configuration</Link>}
                {UCProvider && <Link to="/beta/testing/deployed" className="a">Find Deployed Topology</Link>}
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
                } */}
            </div>
            <Sidebar
                as={Menu}
                animation={"push"}
                direction={"left"}
                icon='labeled'
                vertical
                visible={showMenu}
            >
                <Link to="/beta/testing"className="a" title="navHome">
                    <Menu.Item as='a'>
                        <Icon name='home' />
                        Home
                    </Menu.Item>
                </Link>
                {UCProvider && <Link to="/beta/testing/deploy" className="a" title="deployLink">
                        <Menu.Item as='a'>
                            <Icon name='cloud upload' />
                            Deploy
                        </Menu.Item>
                    </Link>}
                {UCProvider && <Link to="/beta/testing/dashboard" className="a" title="deployLink">
                    <Menu.Item as='a'>
                        <Icon name='wrench' />
                        Advance <br />Configuration
                    </Menu.Item>
                </Link>}
                {UCProvider && <Link to="/beta/testing/deployed" className="a" title="deployLink">
                    <Menu.Item as='a'>
                        <Icon name='lab' />
                        Find & Test<br />Topology<br />
                    </Menu.Item>
                </Link>}
                <Link to="/beta/testing/bank"className="a" title="navHome">
                    <Menu.Item as='a'>
                        <Icon name='chart pie' />
                        Analitycs<br /> & <br />Visualisations
                    </Menu.Item>
                </Link>
                <Link to="/beta/testing/monitoring"className="a" title="navHome">
                    <Menu.Item as='a'>
                        <Icon name='chart line' />
                        Monitoring
                    </Menu.Item>
                </Link>
                <Link to="/beta/testing/contact"className="a" title="navHome">
                    <Menu.Item as='a'>
                        <Icon name='paper plane' />
                        Contact Us
                    </Menu.Item>
                </Link>
                <Link to="/beta/testing/userprofile"className="a" title="navHome">
                    <Menu.Item as='a'>
                        <Icon name='user' />
                        User Profile
                    </Menu.Item>
                </Link>
                {currentUser ? 
                <Link to="/login" className="a" onClick={async () => {
                    await app.auth().signOut()
                    initialiseIdsOnSignOut();
                    usersRef.remove();
                }}>
                    <Menu.Item as='a'>
                        <Icon name='power' />
                        Sign Out
                    </Menu.Item>
                </Link>
                :
                <Link to="/login" className="a">
                    <Menu.Item as='a'>
                        <Icon name='power' />
                        Sign In
                    </Menu.Item>
                </Link>
                }
                <Menu.Item as='a' onClick={toggleMenu}>
                    <Icon name='angle double left' />
                    Collapse menu
                </Menu.Item>
            </Sidebar>

        </div>
    )
}