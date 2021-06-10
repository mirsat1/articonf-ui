import React, { useContext, memo, useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import axiosBase from "../axios/axios-base"
import {Context} from "../Context"
import JSONPretty from 'react-json-prettify'
import CustomTheme from 'react-json-prettify/dist/themes/arduinoLight'
import YAML from 'js-yaml'
import { Divider, Button, Segment, Grid, Label } from 'semantic-ui-react'
import NotProvider from "../components/NotProvider"


function Dashboard() {
  const {
    userUID,
    role
  } = useContext(Context)

  const [ticConfig, setTicConfig] = useState(null)
  const [toscaConfig, setToscaConfig] = useState(null)
  const UCProvider = (RegExp("UCprovider").test(role))

  useEffect(() => {
    axiosBase.get(`user_profile/${userUID}.json`)
        .then(res => {
            setTicConfig(res.data.user_config)
            setToscaConfig(res.data.tosca_config)
        }
        )
        .catch(err => console.log(err))
  }, [userUID])

  return (
    !UCProvider ?
    <NotProvider /> :
    <div className="theBody" data-testid="dashPage">
      <h1>Advanced Configuration</h1>
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

export default memo(Dashboard)