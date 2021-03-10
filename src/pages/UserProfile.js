import React, { useContext, useEffect, useState } from 'react'
import { Context } from "../Context"
import axiosBase from "../axios/axios-base"
import YAML from 'js-yaml'

export default function UserProfile() {
    const { userEmail, plannedToscaTemplate, provisionedToscaTemplate, deployedToscaId, userUID } = useContext(Context)
    const [response, setResponse] = useState({})
    useEffect(() => {
        axiosBase.get(`user_profile/${userUID}/user_config.json`)
            .then(res => setResponse(YAML.load(res.data)))
            .catch(err => console.log(err))
    }, [userUID])
    function handleChange() {
        setResponse({...response, admin_user: "newAdmin"})
        console.log("Hande Change has been called!")
    }
    console.log(response)
    return(
        <div className="theBody">
            <h1>Your profile</h1><br />
            <h4>Email: {userEmail}</h4>
            <h3>Your ID's</h3>
            <h4>Planned topology template ID: {plannedToscaTemplate}</h4>
            <h4>Provisioned topology template ID: {provisionedToscaTemplate}</h4>
            <h4>Deployed topology template ID: {deployedToscaId}</h4>
            <button onClick={() => handleChange()}>Change ADM</button>
        </div>
    )
}