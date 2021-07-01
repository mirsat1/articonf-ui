import React, { useContext, useState } from 'react'
import { Context } from "../Context"
import firebase from "firebase/app"
import { Button, Segment, Image, Grid, Header, Icon } from "semantic-ui-react"

import useToggler from '../hooks/useToggler'
import UserProfileSetup from '../components/UserProfileSetup'
import TopologyInfo from '../components/TopologyInfo'
import Role from "../components/Role"


export default function UserProfile() {
    const { userEmail, id, plannedToscaTemplate, provisionToscaTemplate, deployedToscaId, setUpRole, role, userUID } = useContext(Context)
    const [show, toggler] = useToggler(false)
    const [cursor, setCursor] = useState("arrow")
    const UCProvider = (RegExp("UCprovider").test(role))
    const user = firebase.auth().currentUser
    
    async function resetRole() {
        await firebase.database().ref('user_profile/' + userUID + '/role').remove()
        setUpRole(null)
    }

    console.log(user.emailVerified)
    // function handleChange() {
    //     setResponse({...response, admin_user: "newAdmin"})
    //     console.log("Hande Change has been called!")
    // }
    return(
        <div className="theBody">
           <Grid columns={2}>
               <Grid.Column width={14}>
                    <Segment>
                        <h1>Your profile</h1><br />
                        <p style={{fontSize: '16px'}}><strong>Email: </strong>{userEmail}</p>
                        <p style={{fontSize: '16px'}}><strong>Username: </strong>{user.displayName}</p>
                        <p style={{fontSize: '16px'}}><strong>Email Verified: </strong>{user.emailVerified ? "Yes" : "No"}</p>
                        <p style={{fontSize: '16px'}}><strong>Role: </strong>{UCProvider ? 'dApp provider' : (role && 'dApp consumer')}{!role && 'You need to assign role!'}</p>
                        <Button onClick={toggler}>Setup profile</Button>
                        {show && 
                        <div>
                            <UserProfileSetup toggle={toggler}/>
                            <Segment>
                                <Header as="a" style={{cursor: cursor, marginRight: "0.4em"}} onMouseEnter={() => setCursor("pointer")} onMouseLeave={() => setCursor("arrow")} onClick={resetRole}>
                                    <Icon.Group size="huge">
                                        <Icon name='user'/>
                                        <Icon corner color="teal" name='refresh'/>
                                    </Icon.Group>
                                    Reset role
                                </Header>
                            </Segment>
                            {!role && <Role />}
                        </div>}
                    </Segment>
               </Grid.Column>
               <Grid.Column width={2}>
                   <Segment style={{height: "100%"}}>
                        <Image src={user.photoURL ? user.photoURL : process.env.PUBLIC_URL + "/images/defaultProfile.png"} size='small' circular />
                   </Segment>
               </Grid.Column>
           </Grid>
            <Segment>
            <h3>Your ID's:</h3>
                <p style={{fontSize: '16px'}}><strong>TOSCA ID: </strong>{id ? id : "You are missing one"}</p>
                <p style={{fontSize: '16px'}}><strong>Planned topology template ID: </strong>{plannedToscaTemplate ? plannedToscaTemplate : "You are missing one"}</p>
                <p style={{fontSize: '16px'}}><strong>Provisioned topology template ID: </strong>{provisionToscaTemplate ? provisionToscaTemplate : "You are missing one!"}</p>
                <p style={{fontSize: '16px'}}><strong>Deployed topology template ID: </strong>{deployedToscaId ? deployedToscaId : "You are missing one!"}</p>
            </Segment>
          <TopologyInfo />  
        </div>
    )
}