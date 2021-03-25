import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from "../Context"
import axiosBase from "../axios/axios-base"
import YAML from 'js-yaml'
import JSONPretty from 'react-json-prettify'
import CustomTheme from 'react-json-prettify/dist/themes/arduinoLight'
import { Button, Divider, Grid, Segment, Label } from 'semantic-ui-react'

export default function UserProfile() {
    const { userEmail, plannedToscaTemplate, provisionedToscaTemplate, deployedToscaId, userUID } = useContext(Context)
    const [ticConfig, setTicConfig] = useState(null)
    const [toscaConfig, setToscaConfig] = useState(null)
    useEffect(() => {
        axiosBase.get(`user_profile/${userUID}.json`)
            .then(res => {
                setTicConfig(res.data.user_config)
                setToscaConfig(res.data.tosca_config)
            }
            )
            .catch(err => console.log(err))
    }, [userUID])
    // function handleChange() {
    //     setResponse({...response, admin_user: "newAdmin"})
    //     console.log("Hande Change has been called!")
    // }
    return(
        <div className="theBody">
            <h1>Your profile</h1><br />
            <h4>Email: {userEmail}</h4>
            <h3>Your ID's:</h3>
            <h4>Planned topology template ID: {plannedToscaTemplate ? plannedToscaTemplate : "You are missing one"}</h4>
            <h4>Provisioned topology template ID: {provisionedToscaTemplate ? provisionedToscaTemplate : "You are missing one!"}</h4>
            <h4>Deployed topology template ID: {deployedToscaId ? deployedToscaId : "You are missing one!"}</h4>
            <Link to="/beta/testing/userconfigtic" style={{textAlign: "center"}}><Button>Configure TIC</Button></Link>
            <Link to="/beta/testing/userconfigtosca" style={{textAlign: "center"}}><Button>Configure TOSCA</Button></Link>
            <Segment >
                <Grid columns={2}>
                    <Grid.Column>
                        <Segment>
                            <Label attached='top' size="large">Your TIC configuration: </Label>
                            <JSONPretty theme={CustomTheme} json={YAML.dump(ticConfig)}/>
                        </Segment>  
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>
                            <Label attached='top' size="large">Your TOSCA configuration: </Label>
                            <JSONPretty theme={CustomTheme} json={YAML.dump(toscaConfig)}/>
                        </Segment> 
                    </Grid.Column>
                </Grid>
                <Divider vertical />
            </Segment>
            
        </div>
    )
}