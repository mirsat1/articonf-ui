import React, {useEffect, useState, useContext} from "react"
import {Link} from "react-router-dom"
import {Context} from "../Context"
import axios from "../axios-conf"

function Deployment() {
    const {provisionToscaTemplate} = useContext(Context)
    const [deployedToscaId, setDeployedToscaId] = useState()
    const [message, setMessage] = useState("")
    
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        }

        axios.get(`deployer/deploy/blah123`, requestOptions)
            .then(result => {
                console.log(result)
                setDeployedToscaId(result.data)
                setMessage("ARTICONF is DEPLOYED")
            })
            .catch(error => {
                console.log('error', error)
                setMessage("Ops something went wrong! If there is no message showing above this error, please contact our developers down in the footer about this!")
                })    
    }, [])

    console.log(deployedToscaId)
    
    return (
        <div className="theBody">
            <h1>{
                !provisionToscaTemplate ? 
                "You are missing a dependency: PROVISION, please visit the advanced CONF configuration and get a PROVISION!" 
                : 
                "This may take up to 15 minutes, please wait until the server deployes the platform! Thank you!"
                }
            </h1>
            <h1>
                {message}
            </h1>
            <div className="deployLinks">
                <Link to="/beta/testing/"><button className="pure-button">Home</button></Link>
                <Link to="/beta/testing/dashboard"><button className="pure-button">Advanced configuration</button></Link>
                <Link to="/beta/testing/contact"><button className="pure-button">Contact Us</button></Link>
            </div>
        </div>
    )
}

export default Deployment