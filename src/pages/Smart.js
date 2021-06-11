import React, { useContext, useEffect, useState } from 'react'
import NotProvider from '../components/NotProvider'
import axios from 'axios'
import firebase from 'firebase/app'
import { Context } from '../Context'
import { Button, Form, Icon, Grid, Segment, Label, Dimmer, Loader, Message } from "semantic-ui-react"
import CopyToClipboard from '../components/CopyToClipboard'
import useToggler from '../hooks/useToggler'
import useRequestInfo from '../hooks/useRequestInfo'

export default function Smart() {
    // context states and etc
    const { role, userUID } = useContext(Context)

    // states
    const [loading, setLoading] = useState(false)
    const [hasError, setHasError] = useState({isError: false, errorMessage: null})
    const [smartUser, setSmartUser] = useState({username: "", password: ""})
    const [token, setToken] = useState("")
    const [ucName, setUcName] = useState("")
    const [mapping, setMapping] = useState({
        external: null,
        internal: ""
    })
    const [tableName, setTableName] = useState("")
    const [table, setTable] = useState({
        mappings: {
            dough: "",
            name: ""
        },
        name: ""
    })
    const [show, toggle] = useToggler(false)
    const [tokenCreated , setTokenCreated] = useState(false)
    const [tokenSucces, onTokenSucces] = useRequestInfo("")
    const [ucSucces, onUcSucces] = useRequestInfo("")
    const [mappingSucces, onMappingSucces] = useRequestInfo("")
    const [tableSucces, onTableSucces] = useRequestInfo("")

    // Use case provider role checkup
    const UCProvider = (RegExp("UCprovider").test(role))

    // Get 
    useEffect(() => {
        setLoading(true)
        setHasError({isError: false})
        axios.get(`https://articonf2.firebaseio.com/user_profile/${userUID}/smart_token/token.json`)
        .then(res => {
            setLoading(false)
            if(res.data) {
                setToken(res.data)
            } else {
                setHasError({isError: true, errorMessage: "Got empty token! Try getting a new one from SMART"})
            }
        })
        .catch(err => {
            setLoading(false)
            if (err.response) {
                setHasError({isError: true, errorMessage: "Token not loaded, reson: " + err.response.data.error})
            }  else {
                setHasError({isError: true, errorMessage: err.message})
            }
        })
    }, [userUID])
    // console.log("Token: ", token)

    async function createToke() {
        setLoading(true)
        setHasError({isError: false})
        await axios({
            method: "POST",
            url: "https://articonf1.itec.aau.at:30401/api/tokens",
            data: smartUser,
            headers: { "Content-Type": "application/json" }
        })
            .then(res => {
                setLoading(false)
                setHasError({isError: false, errorMessage: "Success!"})
                onTokenSucces("Success")
                setTimeout(() => onTokenSucces(""), 3000)
                setToken('Bearer ' + res.data)
                firebase.database().ref('user_profile/' + userUID + '/smart_token').set({
                    token: 'Bearer ' + res.data.token
                })
                setTokenCreated(true)
            })
            .catch(err => {
                setLoading(false)
                onTokenSucces("Failed")
                setTimeout(() => onTokenSucces(""), 3000)
                if (err.response) {
                    err.response.data.detail ? setHasError({isError: true, errorMessage: err.response.data.detail}) : setHasError({isError: true, errorMessage: err.response.data})
                }  else {
                    setHasError({isError: true, errorMessage: err.message})
                }
            })
    }

    function createUseCase() {
        setLoading(true)
        setHasError({isError: false})
        const reqBody = {
            "name": ucName
        }
        axios({
            method: "POST",
            url: "https://articonf1.itec.aau.at:30420/api/use-cases",
            data: reqBody,
            headers: { "Content-Type": "application/json", "Authorization": token }
        })
            .then(res => {
                setLoading(false)
                onUcSucces("Success")
                setTimeout(() => onUcSucces(""), 3000)
                setHasError({isError: false})

                console.log(res)
            })
            .catch(err => {
                setLoading(false)
                onUcSucces("Failed")
                setTimeout(() => onUcSucces(""), 3000)
                if (err.response) {
                    err.response.data.detail ? setHasError({isError: true, errorMessage: err.response.data.detail}) : setHasError({isError: true, errorMessage: err.response.data})
                }  else if (err.request) {
                } else {
                    setHasError({isError: true, errorMessage: err.message})
                }
            })
    }

    function createMapping() {
        setLoading(true)
        setHasError({isError: false})
        axios({
            method: "put",
            url: `https://articonf1.itec.aau.at:30420/api/use-cases/${ucName}/tables/${tableName}/mapping`,
            data: mapping,
            headers: { "Content-Type": "application/json", "Authorization": token }
        })
            .then(res => {
                setLoading(false)
                setHasError({isError: false})
                onMappingSucces("Success")
                setTimeout(() => onMappingSucces(""), 3000)
                console.log(res)
            })
            .catch(err => {
                setLoading(false)
                if (err.response) {
                    err.response.data.detail ? setHasError({isError: true, errorMessage: err.response.data.detail}) : setHasError({isError: true, errorMessage: err.response.data})
                }  else {
                    setHasError({isError: true, errorMessage: err.message})
                }
                onMappingSucces("Failed")
                setTimeout(() => onMappingSucces(""), 3000)
            })
    }

    function createTable() {
        setLoading(true)
        setHasError({isError: false})
        axios({
            method: "POST",
            url: `https://articonf1.itec.aau.at:30420/api/use-cases/${ucName}/tables`,
            data: table,
            headers: { "Content-Type": "application/json", "Authorization": token }
        })
            .then(res => {
                setLoading(false)
                setHasError({isError: false})
                onTableSucces("Success")
                setTimeout(() => onTableSucces(""), 3000)
                console.log(res)
                console.log(res)
            })
            .catch(err => {
                setLoading(false)
                if (err.response) {
                    err.response.data.detail ? setHasError({isError: true, errorMessage: err.response.data.detail}) : setHasError({isError: true, errorMessage: err.response.data})
                }  else {
                    setHasError({isError: true, errorMessage: err.message})
                }
                onTableSucces("Failed")
                setTimeout(() => onTableSucces(""), 3000)
            })
    }

    // console.log("Table: ", table)
    // console.log("Mappings: ", mapping)


    return (
        UCProvider ?
        <div className="theBody">
            <h1>Semantic Model with self-adaptive and Autonomous Relevant Technology Tool</h1>
            {hasError.isError && <Message color="red">{hasError.errorMessage}</Message>}
            {
                loading 
                &&
                <div>
                <h3>Loading <Dimmer active>
                        <Loader size='massive'>Loading</Loader>
                    </Dimmer>
                </h3>  
                </div>
            }
            {!show && (token === "" ? "It seems that you are missing a SMART token! You need to" : "You already have a SMART token, but you can always") }
            {!show && <Button onClick={toggle}>{token ? "Create a new" : "Get a new"} SMART token</Button>}
            {
                show &&
                <div>
                    <Segment>
                        <Form onSubmit={createToke}>
                            <Form.Field>
                            <input style={{marginBottom: "0.4em"}} onChange={e => setSmartUser({...smartUser, username: e.target.value})} placeholder="Username" required/>
                            </Form.Field>
                            <Form.Field>
                            <input style={{marginBottom: "0.4em"}} onChange={e => setSmartUser({...smartUser, password: e.target.value})} type="password" placeholder="Password" required/>
                            </Form.Field>
                            <Grid columns={2}>
                                <Grid.Column width={13}>
                                    {tokenSucces === "Failed" && <Message color='red'><Icon name="thumbs down outline" />{tokenSucces}</Message>}
                                    {tokenSucces === "Success" && <Message color='yellow'><Icon name="thumbs up outline" />{tokenSucces}</Message>}
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <Button floated="right" type="submit" style={{marginBottom: "0.4em"}}>Create new token for SMART</Button>
                                </Grid.Column>
                            </Grid>
                        </Form>
                    </Segment>
                    <Button icon labelPosition='left' color="red" onClick={() => {toggle(); setTokenCreated(false)}}>
                        <Icon name='cancel' />
                        Cancel creation
                    </Button>
                    <CopyToClipboard name="Smart token" inputValue={token} />
                    {tokenCreated && <h4>Token successfully created!</h4>}
                </div>
            }
            {
                token &&
                <div>
                    <Grid>
                    <Grid.Column>
                        <Segment raised>
                            <Label as='a' color='black' ribbon>
                            Use-case
                            </Label><br /><br />
                            <Label color='red' horizontal ribbon>
                                Register a new use-case in the SMART tool
                            </Label><br /><br />
                            <Form onSubmit={createUseCase}>
                                <Form.Field>
                                    <input style={{marginBottom: "0.4em"}} onChange={e => setUcName(e.target.value)} placeholder="Enter the name of the new use-case" required/>
                                </Form.Field>
                                <Grid columns={2}>
                                    <Grid.Column width={13}>
                                        {ucSucces === "Failed" && <Message color='red'><Icon name="thumbs down outline" />{ucSucces}</Message>}
                                        {ucSucces === "Success" && <Message color='yellow'><Icon name="thumbs up outline" />{ucSucces}</Message>}
                                    </Grid.Column>
                                    <Grid.Column width={3}>
                                        <Button floated="right" type="submit" style={{marginBottom: "0.4em"}}>Create new use-case</Button>
                                    </Grid.Column>
                                </Grid>
                            </Form>
                        </Segment>
                    </Grid.Column>
                </Grid>
                <Grid columns={2}>
                        <Grid.Column>
                            <Segment raised>
                                <Label as='a' color='black' ribbon>
                                Table
                                </Label><br /><br />
                                <Form onSubmit={createTable}>
                                    <Label color='red' horizontal ribbon>
                                        Create mappings for the new table
                                    </Label><br /><br />
                                    <Form.Field>
                                        <input style={{marginBottom: "0.4em"}} onChange={e => setTable({...table, mappings: {...table.mappings, dough: e.target.value}})} placeholder="Enter path of the mapping" required/>
                                    </Form.Field>
                                    <Form.Field>
                                        <input style={{marginBottom: "0.4em"}} onChange={e => setTable({...table, mappings: {...table.mappings, name: e.target.value}})} placeholder="Enter the name of mapping" required/>
                                    </Form.Field>
                                    <Label color='red' horizontal ribbon>
                                        Add neme of the new table
                                    </Label><br /><br />
                                    <Form.Field>
                                        <input style={{marginBottom: "0.4em"}} onChange={e => setTable({...table, name: e.target.value})} placeholder="Enter the name for the table" required/>
                                    </Form.Field>
                                    <Form.Field>
                                        <input style={{marginBottom: "0.5em"}} onChange={e => setUcName(e.target.value)} placeholder="Enter the name of the use-case wher you wish to create the table" required/>
                                    </Form.Field>
                                    <Grid columns={2}>
                                        <Grid.Column width={13}>
                                            {tableSucces === "Failed" && <Message color='red'><Icon name="thumbs down outline" />{tableSucces}</Message>}
                                            {tableSucces === "Success" && <Message color='yellow'><Icon name="thumbs up outline" />{tableSucces}</Message>}
                                        </Grid.Column>
                                        <Grid.Column width={3}>
                                            <Button floated="right" type="submit" style={{marginBottom: "0.4em"}}>Create new table</Button>
                                        </Grid.Column>
                                    </Grid>
                                </Form>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment raised>
                                <Label as='a' color='black' ribbon="right">
                                Mappings
                                </Label><br /><br />
                                <Label color='red' ribbon="right">
                                    Table name
                                </Label><br /><br />
                                <Form onSubmit={createMapping}>
                                    <Form.Field>
                                        <input onChange={e => setTableName(e.target.value)} placeholder="Enter the name of the table you want to add new mapping" required/>
                                    </Form.Field>
                                    <Form.Field>
                                        <input style={{marginBottom: "0.4em"}} onChange={e => setUcName(e.target.value)} placeholder="Enter the name of the use-case wher you wish to create the mappins" required/>
                                    </Form.Field>
                                    <Label color='red' ribbon="right">
                                        Mapping names
                                    </Label><br /><br />
                                    <Form.Field>
                                        <input style={{marginBottom: "0.4em"}} onChange={e => setMapping({...mapping, internal: e.target.value})} placeholder="Enter the key name" required/>
                                    </Form.Field>
                                    <Form.Field>
                                        <input style={{marginBottom: "0.4em"}} onChange={e => setMapping({...mapping, external: e.target.value})} placeholder="Enter the key value" required/>
                                    </Form.Field>
                                    <Grid columns={2}>
                                        <Grid.Column width={13}>
                                            {mappingSucces === "Failed" && <Message color='red'><Icon name="thumbs down outline" />{mappingSucces}</Message>}
                                            {mappingSucces === "Success" && <Message color='yellow'><Icon name="thumbs up outline" />{mappingSucces}</Message>}
                                        </Grid.Column>
                                        <Grid.Column width={3}>
                                            <Button floated="right" type="submit" style={{marginBottom: "0.4em"}}>Add mapping</Button>
                                        </Grid.Column>
                                    </Grid>
                                </Form>
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </div>}
        </div>
        :
        <NotProvider />
    )
}