import React, { useContext, useEffect, useState } from 'react'
import { Context } from "../Context"
import axiosBase from "../axios/axios-base"

export default function UserProfile() {
    const { userEmail, plannedToscaTemplate, provisionedToscaTemplate, deployedToscaId, userUID } = useContext(Context)
    const [response, setResponse] = useState(null)
    useEffect(() => {
        axiosBase.get(`users_profile/${userUID}.json`)
            .then(res => setResponse(res.data))
            .catch(err => console.log(err))
    }, [userUID])
    return(
        <div className="theBody">
            <h1>Your profile</h1><br />
            <h4>Email: {userEmail}</h4>
            <h3>Your ID's</h3>
            <h4>Planned topology template ID: {response}</h4>
            <h4>Provisioned topology template ID: {provisionedToscaTemplate}</h4>
            <h4>Deployed topology template ID: {deployedToscaId}</h4>
        </div>
    )
}