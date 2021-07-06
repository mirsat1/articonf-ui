import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context";
import { Sidebar, Menu, Icon, Button, Image, Sticky } from "semantic-ui-react";
import useToggler from "../hooks/useToggler";
import app from "../firebase";
// import firebase from "firebase/app";
// import logo from "../articonf-logo.jpg"

export default function Header() {
  const { currentUser, usersRef, initialiseIdsOnSignOut, role } =
    useContext(Context);
  const [activeMenuItem, setActiveMenuItem] = useState("home");
  const [iconSize, setIconSize] = useState("1em");
  const [size, setSize] = useState("big");
  const [showMenu, toggleMenu, toggleMenuFalse, toggleMenuTrue] =
    useToggler(true);
  const UCProvider = RegExp("UCprovider").test(role);
  const notHomeOrContact =
    activeMenuItem === "home" ||
    activeMenuItem === "Message us" ||
    activeMenuItem === "Sign In"
      ? false
      : true;

  console.log(notHomeOrContact, activeMenuItem);

  function bigMini() {
    setIconSize((prev) => {
      if (prev === "1em") return "0.5em";
      else return "1em";
    });
    setSize((prev) => {
      if (prev === "big") return "small";
      else return "big";
    });
  }

  console.log(iconSize);

  const menuPadding = !showMenu ? "0%" : "7.6%";

  const handleItemClick = (e, { name }) => setActiveMenuItem(name);
  // const countDown = count === 0 ? 0 : count - 1
  // test comment
  return (
    <div>
      <Sticky>
        <Menu
          pointing
          secondary
          style={{ backgroundColor: "white", paddingLeft: menuPadding }}
        >
          {!showMenu && (
            <Menu.Item>
              <Button
                style={{ backgroundColor: "rgb(25, 114, 245)", color: "white" }}
                content="Expand"
                icon="sidebar"
                onClick={() => {
                  toggleMenu();
                  setSize("big");
                  setIconSize("1em");
                }}
                floated="left"
                size="massive"
              />
            </Menu.Item>
          )}
          <Menu.Item
            as={Link}
            to="/beta/testing"
            name="home"
            active={activeMenuItem === "home"}
            onClick={handleItemClick}
          >
            <Image
              src={process.env.PUBLIC_URL + "/images/articonfLogo.png"}
              size="tiny"
            />
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/beta/testing/contact"
            name="Message us"
            active={activeMenuItem === "Message us"}
            onClick={handleItemClick}
          />
          {notHomeOrContact && currentUser && (
            <Menu.Item name={activeMenuItem} active={activeMenuItem} />
          )}
          {currentUser ? (
            <Menu.Menu position="right">
              <Menu.Item
                as={Link}
                to="/beta/testing/userprofile"
                name="User Profile"
                active={activeMenuItem === "User Profile"}
                onClick={handleItemClick}
              >
                {currentUser && (
                  <div>
                    <Image
                      src={
                        currentUser.photoURL
                          ? currentUser.photoURL
                          : process.env.PUBLIC_URL +
                            "/images/defaultProfile.png"
                      }
                      avatar
                      verticalAlign="middle"
                    />
                    {currentUser.email}
                  </div>
                )}
              </Menu.Item>
            </Menu.Menu>
          ) : (
            <Menu.Menu position="right">
              <Menu.Item
                as={Link}
                to="/login"
                name="Sign In"
                active={activeMenuItem === "Sign In"}
                onClick={handleItemClick}
              />
              <Menu.Item
                as={Link}
                to="/singup"
                name="Sign Up"
                active={activeMenuItem === "Sign Up"}
                onClick={handleItemClick}
              />
            </Menu.Menu>
          )}
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
        style={{
          backgroundColor: "#2a388f",
          zIndex: "9999",
          fontSize: iconSize,
        }}
        as={Menu}
        animation={"push"}
        direction={"left"}
        icon="labeled"
        vertical
        visible={showMenu}
        onHide={size === "small" ? toggleMenuTrue : toggleMenuFalse}
      >
        <Menu.Item
          as={Link}
          to="/beta/testing"
          style={{ color: "white" }}
          icon="home"
          name="home"
          active={activeMenuItem === "home"}
          onClick={handleItemClick}
        >
          <Icon name="home" />
          {size === "big" && <div>Home</div>}
        </Menu.Item>
        {UCProvider && (
          <Menu.Item
            as={Link}
            to="/beta/testing/deploy"
            style={{ color: "white" }}
            name="deploy"
            active={activeMenuItem === "deploy"}
            onClick={handleItemClick}
          >
            <Icon name="cloud upload" />
            {size === "big" && <div>Deploy</div>}
          </Menu.Item>
        )}
        {UCProvider && (
          <Menu.Item
            as={Link}
            to="/beta/testing/dashboard"
            style={{ color: "white" }}
            name="Advance Configuration"
            active={activeMenuItem === "Advance Configuration"}
            onClick={handleItemClick}
          >
            <Icon name="wrench" />
            {size === "big" && (
              <div>
                Advance <br />
                Configuration
              </div>
            )}
          </Menu.Item>
        )}
        {UCProvider && (
          <Menu.Item
            as={Link}
            to="/beta/testing/deployed"
            style={{ color: "white" }}
            name="Find and Test Topology"
            active={activeMenuItem === "Find & Test Topology"}
            onClick={handleItemClick}
          >
            <Icon name="lab" />
            {size === "big" && (
              <div>
                Find & Test
                <br />
                Topology
                <br />
              </div>
            )}
          </Menu.Item>
        )}
        <Menu.Item
          as={Link}
          to="/beta/testing/bank"
          style={{ color: "white" }}
          name="Analytics and Visualization"
          active={activeMenuItem === "Analytics and Visualization"}
          onClick={handleItemClick}
        >
          <Icon name="chart pie" />
          {size === "big" && (
            <div>
              Analitycs
              <br /> & <br />
              Visualisations
            </div>
          )}
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/beta/testing/monitoring"
          style={{ color: "white" }}
          name="Monitoring"
          active={activeMenuItem === "Monitoring"}
          onClick={handleItemClick}
        >
          <Icon name="chart line" />
          {size === "big" && <div>Monitoring</div>}
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/beta/testing/contact"
          style={{ color: "white" }}
          name="Message us"
          active={activeMenuItem === "Message us"}
          onClick={handleItemClick}
        >
          <Icon name="paper plane" />
          {size === "big" && <div>Contact Us</div>}
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/beta/testing/userprofile"
          style={{ color: "white" }}
          name="User Profile"
          active={activeMenuItem === "User Profile"}
          onClick={handleItemClick}
        >
          <Icon name="user" />
          {size === "big" && <div>User Profile</div>}
        </Menu.Item>
        {currentUser ? (
          <Menu.Item
            as={Link}
            to="/login"
            onClick={async () => {
              await app.auth().signOut();
              initialiseIdsOnSignOut();
              usersRef.remove();
              setActiveMenuItem("Sign In");
            }}
            style={{ color: "white" }}
          >
            <Icon name="power" />
            {size === "big" && <div>Sign Out</div>}
          </Menu.Item>
        ) : (
          <Menu.Item as={Link} to="/login" style={{ color: "white" }}>
            <Icon name="power" />
            {size === "big" && <div>Sign In</div>}
          </Menu.Item>
        )}
        {size === "big" ? (
          <Menu.Item as="a" onClick={bigMini} style={{ color: "white" }}>
            <Icon name="window minimize" />
            Minimize
          </Menu.Item>
        ) : (
          <Menu.Item as="a" onClick={bigMini} style={{ color: "white" }}>
            <div>
              <Icon name="chevron left" />
              <Icon name="chevron right" />
            </div>
          </Menu.Item>
        )}
        {size === "big" && (
          <Menu.Item as="a" onClick={toggleMenu} style={{ color: "white" }}>
            <Icon name="angle double left" />
            Collapse menu
          </Menu.Item>
        )}
      </Sidebar>
    </div>
  );
}
