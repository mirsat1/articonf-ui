import React, { useContext } from 'react'
import { Context } from "../Context"

import TopologyInfo from '../components/TopologyInfo'


export default function UserProfile() {
    const { userEmail, id, plannedToscaTemplate, provisionToscaTemplate, deployedToscaId } = useContext(Context)


    // function handleChange() {
    //     setResponse({...response, admin_user: "newAdmin"})
    //     console.log("Hande Change has been called!")
    // }
    return(
        <div className="theBody">
            <h1>Your profile</h1><br />
            <h4>Email: {userEmail}</h4>
            <h3>Your ID's:</h3>
            <h4>TOSCA ID: {id ? id : "You are missing one"}</h4>
            <h4>Planned topology template ID: {plannedToscaTemplate ? plannedToscaTemplate : "You are missing one"}</h4>
            <h4>Provisioned topology template ID: {provisionToscaTemplate ? provisionToscaTemplate : "You are missing one!"}</h4>
            <h4>Deployed topology template ID: {deployedToscaId ? deployedToscaId : "You are missing one!"}</h4>
            
          <TopologyInfo />  
        </div>
    )
}