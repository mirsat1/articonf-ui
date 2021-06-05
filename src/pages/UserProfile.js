import React, { useContext } from 'react'
import { Context } from "../Context"
import firebase from "firebase/app"
import { Button, Segment } from "semantic-ui-react"

import TopologyInfo from '../components/TopologyInfo'
import Role from "../components/Role"


export default function UserProfile() {
    const { userEmail, id, plannedToscaTemplate, provisionToscaTemplate, deployedToscaId, setUpRole, role, userUID } = useContext(Context)
    const UCProvider = role === "UCprovider1" || role === "UCprovider2" || role === "UCprovider3" || role === "UCprovider4"
    
    async function resetRole() {
        await firebase.database().ref('user_profile/' + userUID + '/role').remove()
        setUpRole(null)
    }
    // function handleChange() {
    //     setResponse({...response, admin_user: "newAdmin"})
    //     console.log("Hande Change has been called!")
    // }
    return(
        <div className="theBody">
            <Segment>
                <h1>Your profile</h1><br />
                <p style={{fontSize: '16px'}}><strong>Email: </strong>{userEmail}</p>
                <p style={{fontSize: '16px'}}><strong>Role: </strong>{UCProvider ? 'dApp provider' : (role && 'dApp consumer')}{!role && 'You need to assign role!'}</p>
                <Button onClick={resetRole}>Reset role</Button>
                {!role && <Role />}
            </Segment>
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