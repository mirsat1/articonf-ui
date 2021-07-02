import React, { useContext, useState } from "react"
import {Link} from "react-router-dom"
import { Context } from "../Context"
import { Sidebar, Menu, Icon, Button, Image , Sticky} from "semantic-ui-react"
import useToggler from "../hooks/useToggler"
import app from "../firebase"
// import firebase from "firebase/app";
// import logo from "../articonf-logo.jpg"

export default function Header() {
    const {currentUser, usersRef, initialiseIdsOnSignOut, role} = useContext(Context)
    const [activeMenuItem, setActiveMenuItem] = useState('home')
    const [showMenu, toggleMenu] = useToggler(true)
    const UCProvider = (RegExp("UCprovider").test(role))

    const handleItemClick = (e, { name }) => setActiveMenuItem(name)
    // const countDown = count === 0 ? 0 : count - 1
    return (
        <div>
            <Sticky> 
                <Menu pointing secondary style={{backgroundColor: "white"}}>
                    <Menu.Item>
                        <Button
                        style={{backgroundColor: "rgb(25, 114, 245)", color: "white"}}
                        content="Expand"
                        icon='sidebar'
                        onClick={toggleMenu}
                        floated="left"
                        size="massive"
                        />
                    </Menu.Item>
                    <Link to="/beta/testing">
                        <Menu.Item
                            name='home'
                            active={activeMenuItem === 'home'}
                            onClick={handleItemClick}
                        />
                    </Link>
                    <Link to="/beta/testing/contact">
                    <Menu.Item
                        name='Message us'
                        active={activeMenuItem === 'Message us'}
                        onClick={handleItemClick}
                    />
                    </Link>
                    {currentUser ?
                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='me'
                            active={activeMenuItem === 'me'}
                            onClick={handleItemClick}
                        >
                            {currentUser && 
                        <Link to="/beta/testing/userprofile">
                            <Image 
                                src={currentUser.photoURL ? currentUser.photoURL : process.env.PUBLIC_URL + "/images/defaultProfile.png"} 
                                avatar
                                verticalAlign="middle"
                            />
                            {currentUser.email}
                        </Link>}
                        </Menu.Item>
                    </Menu.Menu> :
                    <Menu.Menu position='right'>
                        <Link to="/login">
                            <Menu.Item
                                name='Sign In'
                                active={activeMenuItem === 'Sign In'}
                                onClick={handleItemClick}
                            />
                        </Link>
                    </Menu.Menu> 
                    } 
                </Menu>
            </Sticky>
            {/* <div className="container blue circleBehind">
                <Button
                    style={{backgroundColor: "rgb(25, 114, 245)", color: "white", position: "sticky"}} 
                    content='Toggle menu' 
                    icon={showMenu ? 'left arrow' : 'right arrow'} 
                    labelPosition={showMenu ? 'left' : 'right'} 
                    onClick={toggleMenu}
                    floated="left"
                />
                <Link to="/beta/testing" style={{textAlign: "center"}}><Image src="https://i.imgur.com/tgkmCTc.png"/></Link>
                {currentUser && 
                <Link to="/beta/testing/userprofile" className="a">
                    <Image 
                        src={currentUser.photoURL ? currentUser.photoURL : process.env.PUBLIC_URL + "/images/defaultProfile.png"} 
                        avatar
                        style={{height: "50px", width: "50px"}}
                    />
                    {currentUser.email}
                </Link>}
                <Link to="/beta/testing"className="a" title="navHome">Home</Link>
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
                }
            </div> */}
            <Sidebar
                style={{backgroundColor: "#2a388f", zIndex: "9999"}}
                as={Menu}
                animation={"push"}
                direction={"left"}
                icon='labeled'
                vertical
                visible={showMenu}
            >
                <Link to="/beta/testing"className="a" title="navHome">
                    <Menu.Item as='a' style={{color: "white"}} icon="home">
                        <Icon name='home' />
                        Home
                    </Menu.Item>
                </Link>
                {UCProvider && <Link to="/beta/testing/deploy" className="a" title="deployLink">
                        <Menu.Item as='a' style={{color: "white"}}>
                            <Icon name='cloud upload' />
                            Deploy
                        </Menu.Item>
                    </Link>}
                {UCProvider && <Link to="/beta/testing/dashboard" className="a" title="deployLink">
                    <Menu.Item as='a' style={{color: "white"}}>
                        <Icon name='wrench' />
                        Advance <br />Configuration
                    </Menu.Item>
                </Link>}
                {UCProvider && <Link to="/beta/testing/deployed" className="a" title="deployLink">
                    <Menu.Item as='a' style={{color: "white"}}>
                        <Icon name='lab' />
                        Find & Test<br />Topology<br />
                    </Menu.Item>
                </Link>}
                <Link to="/beta/testing/bank"className="a" title="navHome">
                    <Menu.Item as='a' style={{color: "white"}}>
                        <Icon name='chart pie' />
                        Analitycs<br /> & <br />Visualisations
                    </Menu.Item>
                </Link>
                <Link to="/beta/testing/monitoring"className="a" title="navHome">
                    <Menu.Item as='a' style={{color: "white"}}>
                        <Icon name='chart line' />
                        Monitoring
                    </Menu.Item>
                </Link>
                <Link to="/beta/testing/contact"className="a" title="navHome">
                    <Menu.Item as='a' style={{color: "white"}}>
                        <Icon name='paper plane' />
                        Contact Us
                    </Menu.Item>
                </Link>
                <Link to="/beta/testing/userprofile"className="a" title="navHome">
                    <Menu.Item as='a' style={{color: "white"}}>
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
                    <Menu.Item as='a' style={{color: "white"}}>
                        <Icon name='power' />
                        Sign Out
                    </Menu.Item>
                </Link>
                :
                <Link to="/login" className="a">
                    <Menu.Item as='a' style={{color: "white"}}>
                        <Icon name='power'/>
                        Sign In
                    </Menu.Item>
                </Link>
                }
                <Menu.Item as='a' onClick={toggleMenu} style={{color: "white"}}>
                    <Icon name='angle double left' />
                    Collapse menu
                </Menu.Item>
            </Sidebar>

        </div>
    )
}