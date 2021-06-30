import React, { useContext, memo} from "react"
import { Link } from 'react-router-dom'
// import axiosBase from "../axios/axios-base"
import {Context} from "../Context"
// import JSONPretty from 'react-json-prettify'
// import CustomTheme from 'react-json-prettify/dist/themes/arduinoLight'
// import YAML from 'js-yaml'
import { Segment, Grid, Header, Icon } from 'semantic-ui-react'
import NotProvider from "../components/NotProvider"


function Dashboard() {
  const {
    role
  } = useContext(Context)

  // const [ticConfig, setTicConfig] = useState(null)
  // const [toscaConfig, setToscaConfig] = useState(null)
  const UCProvider = (RegExp("UCprovider").test(role))

  // useEffect(() => {
  //   axiosBase.get(`user_profile/${userUID}.json`)
  //       .then(res => {
  //           setTicConfig(res.data.user_config)
  //           setToscaConfig(res.data.tosca_config)
  //       }
  //       )
  //       .catch(err => console.log(err))
  // }, [userUID])

  return (
    !UCProvider ?
    <NotProvider /> :
    <div className="theBody" data-testid="dashPage">
      <h1>Advanced Configuration</h1>
      <Grid columns={4}>
        <Grid.Column>
          <Segment placeholder>
            <Link to="/beta/testing/userconfigtic" style={{textAlign: "center"}}>
              <Header as='h1' icon>
                <Icon>
                  <img src={process.env.PUBLIC_URL + "/images/blockChainIcon.png"} alt="TIC" height="100" width="100"/>
                </Icon>
                TIC Settings
                <Header.Subheader>
                  Manage your TIC's configuration.
                </Header.Subheader>
              </Header>
            </Link>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment placeholder>
            <Link to="/beta/testing/userconfigtosca" style={{textAlign: "center"}}>
              <Header as='h1' icon>
                <Icon>
                  <img src={process.env.PUBLIC_URL + "/images/confIcon.png"} alt="CONF" height="100" width="100"/>
                </Icon>
                CONF Settings
                <Header.Subheader>
                  Manage your CONF configuration.
                </Header.Subheader>
              </Header>
            </Link>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment placeholder>
            <Link to="/beta/testing/smart" style={{textAlign: "center"}}>
              <Header as='h1' icon>
                <Icon>
                <img src={process.env.PUBLIC_URL + "/images/smartIcon.png"} alt="SMART" height="100" width="100"/>
                </Icon>
                SMART Settings
                <Header.Subheader>
                  Manage your SMART configuration.
                </Header.Subheader>
              </Header>
            </Link>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment placeholder>
            <Link to="/beta/testing/tac" style={{textAlign: "center"}}>
              <Header as='h1' icon>
                <Icon>
                  <img src={process.env.PUBLIC_URL + "/images/tacIcon.png"} alt="TAC" height="100" width="100"/>
                </Icon>
                TAC Settings
                <Header.Subheader>
                  Manage your TAC configuration.
                </Header.Subheader>
              </Header>
            </Link>
        </Segment>
        </Grid.Column>
      </Grid>
     {/* <Segment >
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
     </Segment> */}
      
    </div>
  )
}

export default memo(Dashboard)