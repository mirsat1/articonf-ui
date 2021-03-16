import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../Context'
import axios from 'axios'
import YAML from 'js-yaml'
import firebase from "firebase/app";
import { Grid, Label, Segment, Input, Button, Form } from 'semantic-ui-react'
import Loader from 'react-loader-spinner'

export default function UserConfig() {
    const { userUID, defaultTicConfig } = useContext(Context)
    const [ticConfig, setTicConfig] = useState(defaultTicConfig)
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        
        // axios.get("https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/bityoga/fabric_as_code/master/group_vars/all.yml")
        axios.get(`https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`)
            .then(res => {
                setIsLoading(false)
                setTicConfig(YAML.load(res.data))
                if(!res.data) setTicConfig(defaultTicConfig)
            })
            .catch(e => {
                setIsLoading(false)
                setHasError(true)
                setErrorMessage("We were not able to fetch your TIC configuration, so we are assigning you with the default TIC configuration")
                setTicConfig(defaultTicConfig)
                console.log(e)
            })
            return function cleanup() {
                setTicConfig(undefined)
            }
            
    }, [userUID, defaultTicConfig])

    async function updateToDB() {
        setIsLoading(true)
        await firebase.database().ref('user_profile/' + userUID).update({
            user_config: YAML.dump(ticConfig)
          })
        setIsLoading(false)
    }

    async function restoreDefaultsToDB() {
        setIsLoading(true)
        setTicConfig(defaultTicConfig)
        await firebase.database().ref('user_profile/' + userUID).update({
            user_config: YAML.dump(ticConfig)
          })
        setIsLoading(false)
    }
    console.log("TIC Config: ", ticConfig)

    return(
        <div className="theBody">
            <h1>TIC Config</h1>
            <h2>{hasError && errorMessage}</h2>
            <Form onSubmit={updateToDB}>
                <Grid columns={1}>
                    <Grid.Column>
                        <Segment raised>
                            <Label as='a' color='black' ribbon>
                            Organization
                            </Label><br /><br />
                            <Label color='red' horizontal ribbon>
                                Organization Details
                            </Label><br /><br />
                            <Form.Field>{ticConfig && <Input label='Name' placeholder={defaultTicConfig.org.name} onChange={e => setTicConfig({...ticConfig, org: {...ticConfig.org, name: e.target.value}})}/>}</Form.Field>
                                <Form.Field>{ticConfig && <Input label='Unit' placeholder={defaultTicConfig.org.unit} onChange={e => setTicConfig({...ticConfig, org: {...ticConfig.org, unit: e.target.value}})}/>}</Form.Field>
                                <Form.Field>{ticConfig && <Input label='Admin username' placeholder={defaultTicConfig.admin_user} onChange={e => setTicConfig({...ticConfig, admin_user: e.target.value})}/>}</Form.Field>
                                <Form.Field>{ticConfig && <Input label='Admin password' placeholder={defaultTicConfig.admin_password} onChange={e => setTicConfig({...ticConfig, admin_password: e.target.value})}/>}</Form.Field>
                                <br /><br />
                        </Segment>
                    </Grid.Column>
                </Grid>
                <Grid columns={2}>
                    <Grid.Column>
                        <Segment raised>
                            <Label as='a' color='black' ribbon>
                            Certificate Authorities
                            </Label><br /><br />
                            <Label color='red' horizontal ribbon>
                                ORGCA
                            </Label><br /><br />
                                <Form.Field>{ticConfig && <Input label='User Name' placeholder={defaultTicConfig.orgca_user} onChange={e => setTicConfig({...ticConfig, orgca_user: e.target.value})}/>}</Form.Field>
                                <Form.Field>{ticConfig && <Input label='Password' placeholder={defaultTicConfig.orgca_password} onChange={e => setTicConfig({...ticConfig, orgca_password: e.target.value})}/>}</Form.Field>
                                <Form.Field>{ticConfig && <Input label='Port' type="number" placeholder={defaultTicConfig.orgca.port} onChange={e => setTicConfig({...ticConfig, orgca: {...ticConfig.orgca, port: e.target.value}})}/>}</Form.Field>
                                <br /><br />
                        </Segment>
                        
                    </Grid.Column>

                    <Grid.Column>
                        <Segment raised>
                            <Label as='a' color='black' ribbon="right">
                            Certificate Authorities
                            </Label><br /><br />
                            <Label color='red' ribbon="right">
                                TLSCA
                            </Label><br /><br />
                                <Form.Field>{ticConfig && <Input label='User Name' placeholder={defaultTicConfig.tlsca_user} onChange={e => setTicConfig({...ticConfig, tlsca_user: e.target.value})}/>}</Form.Field>
                                <Form.Field>{ticConfig && <Input label='Password' placeholder={defaultTicConfig.tlsca_password} onChange={e => setTicConfig({...ticConfig, tlsca_password: e.target.value})}/>}</Form.Field>
                                <Form.Field>{ticConfig && <Input label='Port' type="number" placeholder={defaultTicConfig.tlsca.port} onChange={e => setTicConfig({...ticConfig, tlsca: {...ticConfig.tlsca, port: e.target.value}})}/>}</Form.Field>
                                <br /><br />
                        </Segment>
                    </Grid.Column>
                </Grid>
                <Grid columns={2}>
                    <Grid.Column>
                        <Segment raised>
                            <Label as='a' color='black' ribbon>
                            Peers
                            </Label><br /><br />
                            <Label color='red' horizontal ribbon>
                                Peer1
                            </Label><br /><br />
                                <Form.Field>{ticConfig && <Input label='User Name' placeholder={defaultTicConfig.peer1_user} onChange={e => setTicConfig({...ticConfig, peer1_user: e.target.value})}/>}</Form.Field>
                                <Form.Field>{ticConfig && <Input label='Password' placeholder={defaultTicConfig.peer1_password} onChange={e => setTicConfig({...ticConfig, peer1_password: e.target.value})}/>}</Form.Field>
                                <Form.Field>{ticConfig && <Input label='Port' type="number" placeholder={defaultTicConfig.peer1.port} onChange={e => setTicConfig({...ticConfig, peer1: {...ticConfig.peer1, port: e.target.value}})}/>}</Form.Field>
                                <Form.Field>{ticConfig && <Input label='Leader' placeholder={defaultTicConfig.peer1.leader} onChange={e => setTicConfig({...ticConfig, peer1: {...ticConfig.peer1, leader: e.target.value}})}/>}</Form.Field>
                                <Form.Field>{ticConfig && <Grid columns={2}><Grid.Column width={3}><Label size="large">Database Type</Label></Grid.Column><Grid.Column width={13}><select id="lang" onChange={e => setTicConfig({...ticConfig, peer1: {...ticConfig.peer1, dbtype: e.target.value}})}>
                                                                <option value="goleveldb">goleveldb</option>
                                                                <option value="mongoDB">mongoDB</option>
                                                                <option value="SQLite">SQLite</option>
                                                            </select></Grid.Column></Grid>}</Form.Field>
                                <Form.Field>{ticConfig && <Input label='CA Name' placeholder={defaultTicConfig.orgca_user} onChange={e => setTicConfig({...ticConfig, peer1: {...ticConfig.peer1, leader: e.target.value}})}/>}</Form.Field>
                                <Form.Group inline>
                                    <Label size="large">Peer type</Label>
                                    <label>Anchor<input
                                        type='radio'
                                        name='peer1type'
                                        value='anchor'
                                        checked={ticConfig.peer1.type === 'anchor'}
                                        onChange={(e) => setTicConfig({...ticConfig, peer1: {...ticConfig.peer1, type: e.target.value}})}
                                    /></label>
                                    <label>Endorser<input
                                        type='radio'
                                        name='peer1type'
                                        value='endorser'
                                        checked={ticConfig.peer1.type === 'endorser'}
                                        onChange={(e) => setTicConfig({...ticConfig, peer1: {...ticConfig.peer1, type: e.target.value}})}
                                    /></label>
                                    <label>Committer<input
                                        type='radio'
                                        name='peer1type'
                                        value='committer'
                                        checked={ticConfig.peer1.type === 'committer'}
                                        onChange={(e) => setTicConfig({...ticConfig, peer1: {...ticConfig.peer1, type: e.target.value}})}
                                    /></label>
                                    </Form.Group>
                                <br />
                        </Segment>
                        
                    </Grid.Column>

                    <Grid.Column>
                    <Segment raised>
                            <Label as='a' color='black' ribbon>
                            Peers
                            </Label><br /><br />
                            <Label color='red' horizontal ribbon>
                                Peer2
                            </Label><br /><br />
                                <Form.Field>{ticConfig && <Input label='User Name' placeholder={defaultTicConfig.peer2_user} onChange={e => setTicConfig({...ticConfig, peer2_user: e.target.value})}/>}</Form.Field>
                                <Form.Field>{ticConfig && <Input label='Password' placeholder={defaultTicConfig.peer2_password} onChange={e => setTicConfig({...ticConfig, peer2_password: e.target.value})}/>}</Form.Field>
                                <Form.Field>{ticConfig && <Input label='Port' type="number" placeholder={defaultTicConfig.peer2.port} onChange={e => setTicConfig({...ticConfig, peer2: {...ticConfig.peer2, port: e.target.value}})}/>}</Form.Field>
                                <Form.Field>{ticConfig && <Input label='Leader' placeholder={defaultTicConfig.peer2.leader} onChange={e => setTicConfig({...ticConfig, peer2: {...ticConfig.peer2, leader: e.target.value}})}/>}</Form.Field>
                                <Form.Field>{ticConfig && <Grid columns={2}><Grid.Column width={3}><Label size="large">Database Type</Label></Grid.Column><Grid.Column width={13}><select id="lang" onChange={e => setTicConfig({...ticConfig, peer2: {...ticConfig.peer2, dbtype: e.target.value}})}>
                                                                <option value="goleveldb">goleveldb</option>
                                                                <option value="mongoDB">mongoDB</option>
                                                                <option value="SQLite">SQLite</option>
                                                            </select></Grid.Column></Grid>}</Form.Field>
                                <Form.Field>{ticConfig && <Input label='CA Name' placeholder={defaultTicConfig.orgca_user} onChange={e => setTicConfig({...ticConfig, peer2: {...ticConfig.peer2, leader: e.target.value}})}/>}</Form.Field>
                                <Form.Group inline>
                                    <Label size="large">Peer type</Label>
                                    <label>Anchor<input
                                        type='radio'
                                        name='peer2type'
                                        value='anchor'
                                        checked={ticConfig.peer2.type === 'anchor'}
                                        onChange={(e) => setTicConfig({...ticConfig, peer2: {...ticConfig.peer2, type: e.target.value}})}
                                    /></label>
                                    <label>Endorser<input
                                        type='radio'
                                        name='peer2type'
                                        value='endorser'
                                        checked={ticConfig.peer2.type === 'endorser'}
                                        onChange={(e) => setTicConfig({...ticConfig, peer2: {...ticConfig.peer2, type: e.target.value}})}
                                    /></label>
                                    <label>Committer<input
                                        type='radio'
                                        name='peer2type'
                                        value='committer'
                                        checked={ticConfig.peer2.type === 'committer'}
                                        onChange={(e) => setTicConfig({...ticConfig, peer2: {...ticConfig.peer2, type: e.target.value}})}
                                    /></label>
                                    </Form.Group>
                                <br />
                        </Segment>
                    </Grid.Column>
                </Grid>
                <div style={{paddingTop: "1.3em", paddingBottom: "1.3em"}}><Button type="submit" onClick={updateToDB}>Save changes</Button> <Button floated="right" type="submit" onClick={restoreDefaultsToDB}>Restore default</Button></div>
                {isLoading && <h4>Updating... <Loader type="ThreeDots" color="#08335e" height={50} width={50}/></h4>}
            </Form>
            {/* <button onClick={updateToDB}>Update to DB</button>
            <button onClick={setTicConfig({tlsca_password: "newPWD"})}>Change PW</button> */}
            </div>
    )
}