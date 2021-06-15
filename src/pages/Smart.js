import React, { useContext, useEffect, useState } from 'react'
import NotProvider from '../components/NotProvider'
import axios from 'axios'
import firebase from 'firebase/app'
import { Context } from '../Context'
import { Button, Form, Icon, Grid, Segment, Label, Dimmer, Loader, Message, Input } from "semantic-ui-react"
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
        mappings: {},
        name: null
    })
    const [mapLen, setMapLen] = useState(1)
    const [numOfKeys, setNumOfKeys] = useState(1)
    const [keyName, setKeyName] = useState("")
    const [show, toggle] = useToggler(false)
    const [tokenCreated , setTokenCreated] = useState(false)
    const [tokenSucces, onTokenSucces] = useRequestInfo("")
    const [ucSucces, onUcSucces] = useRequestInfo("")
    const [layerSuccess, onLayerSuccess] = useRequestInfo("")
    const [mappingSucces, onMappingSucces] = useRequestInfo("")
    const [tableSucces, onTableSucces] = useRequestInfo("")
    const [useCases, setUseCases] = useState(null)
    const [layer, setLayer] = useState({
        cluster_properties: [],
          name: null,
          properties: [],
          table: null,
          use_case: null
    })
    const [clusterProp, setClusterProp] = useState("")
    const [layerProp, setLayerProp] = useState("")

    // function that will create as many form fields as the users enters in the input bellow and also will create object!!
    function numOfMap(num) {
        let content = []
        for (var i = 0; i < num; i++) {
            content.push(<Grid columns={2}>
                            <Grid.Column><input style={{marginBottom: "0.4em"}} onChange={e => setKeyName(e.target.value)} placeholder="Key" required/></Grid.Column>
                            <Grid.Column><input style={{marginBottom: "0.4em"}} onChange={e => setTable({...table, mappings: {...table.mappings, [keyName]: e.target.value}})} placeholder="Value" required/></Grid.Column>
                        </Grid>)
        }
        return content
    }

    function numOfMap2(num) {
        let content = []
        for (var i = 0; i < num; i++) {
            content.push(<Grid columns={2}>
                            <Grid.Column><input style={{marginBottom: "0.4em"}} onChange={e => setMapping({...mapping, internal: e.target.value})} placeholder="Key" required/></Grid.Column>
                            <Grid.Column><input style={{marginBottom: "0.4em"}} onChange={e => setMapping({...mapping, external: e.target.value})} placeholder="Value" required/></Grid.Column>
                        </Grid>)
        }
        return content
    }

    console.log("layer: ", layer)
    console.log("use-case-name: ", ucName)
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
                console.log(res.data)
                axios({
                    method: "GET",
                    url: 'https://articonf1.itec.aau.at:30420/api/use-cases',
                    headers: { "Content-Type": "application/json", "Authorization": res.data }
                })
                .then(res => {
                    setLoading(false)
                    setHasError({isError: false})
                    setUseCases(res.data)
                })
                .catch(err => {
                    setLoading(false)
                    if (err.response) {
                        err.response.data.detail ? setHasError({isError: true, errorMessage: err.response.data.detail}) : setHasError({isError: true, errorMessage: err.response.data})
                    }  else {
                        setHasError({isError: true, errorMessage: err.message})
                    }
                })
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
    // console.log("Use-Cases: ", useCases)

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

    function createLayer() {
        setLoading(true)
        setHasError({isError: false})
        axios({
            method: "POST",
            url: `https://articonf1.itec.aau.at:30420/api/layers`,
            data: layer,
            headers: { "Content-Type": "application/json", "Authorization": token }
        })
            .then(res => {
                setLoading(false)
                setHasError({isError: false})
                onLayerSuccess("Success")
                setTimeout(() => onLayerSuccess(""), 3000)
            })
            .catch(err => {
                setLoading(false)
                if (err.response) {
                    err.response.data.detail ? setHasError({isError: true, errorMessage: err.response.data.detail}) : setHasError({isError: true, errorMessage: err.response.data})
                }  else {
                    setHasError({isError: true, errorMessage: err.message})
                }
                onLayerSuccess("Failed")
                setTimeout(() => onLayerSuccess(""), 3000)
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
                    <Segment style={{height: "100%"}} >
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
                        <Segment style={{height: "100%"}} raised>
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
                            <Segment style={{height: "100%"}} raised>
                                <Label as='a' color='black' ribbon>
                                Table
                                </Label><br /><br />
                                <Form onSubmit={createTable}>
                                    <Label color='red' horizontal ribbon>
                                        Create mappings for the new table
                                    </Label><br /><br />
                                    <Form.Field>
                                        <input style={{marginBottom: "0.6em"}} onChange={e => setMapLen(e.target.value)} type="number" min="1" placeholder="How many fields do you want to create?"/>
                                        {numOfMap(mapLen)}
                                    </Form.Field>
                                    <Label color='red' horizontal ribbon>
                                        Add neme of the new table
                                    </Label><br /><br />
                                    <Form.Field>
                                        <input style={{marginBottom: "0.4em"}} onChange={e => setTable({...table, name: e.target.value})} placeholder="Enter the name for the table" required/>
                                    </Form.Field>
                                    <Form.Field>
                                        <select style={{marginBottom: "0.4em"}} onChange={e => setUcName(e.target.value)}>
                                            {useCases && useCases.map(element => <option value={element.name}>{element.name}</option>)}
                                        </select>
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
                            <Segment style={{height: "100%"}} raised>
                                <Label as='a' color='black' ribbon="right">
                                Mappings
                                </Label><br /><br />
                                <Label color='red' ribbon="right">
                                    Table name
                                </Label><br /><br />
                                <Form onSubmit={createMapping}>
                                    <Form.Field>
                                        <select style={{marginBottom: "0.4em"}} onChange={e => setUcName(e.target.value)}>
                                            {useCases && useCases.map(element => <option value={element.name}>{element.name}</option>)}
                                        </select>
                                    </Form.Field>
                                    <Form.Field>
                                        <input onChange={e => setTableName(e.target.value)} placeholder="Enter the name of the table you want to add new mapping" required/>
                                    </Form.Field>
                                    <Label color='red' ribbon="right">
                                        Mapping names
                                    </Label><br /><br />
                                    <input style={{marginBottom: "0.6em"}}  type="number" min="1" onChange={e => setNumOfKeys(e.target.value)} placeholder="Enter how many fields you want to map in the table" />
                                    {numOfMap2(numOfKeys)}
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
                    <Segment raised>
                                <Label as='a' color='black' ribbon="left">
                                Layers
                                </Label><br /><br />
                                <Label color='red' ribbon="left">
                                    Cluster properties
                                </Label><br /><br />
                                <p>Cluster properties added: {layer.cluster_properties.length}</p>
                                <Input style={{marginBottom: "0.4em", width: "100%"}} action={<Button onClick={(e) => {layer.cluster_properties.push(clusterProp); setClusterProp("")}} icon="add"/>} placeholder="Add cluster propertie" value={clusterProp} onChange={e => setClusterProp(e.target.value)}/><br />
                                <Label color='red' ribbon="left">
                                    Properties
                                </Label><br /><br />
                                <p>Properties added: {layer.properties.length}</p>
                                <Input style={{marginBottom: "0.4em", width: "100%"}} action={<Button onClick={(e) => {layer.properties.push(layerProp); setLayerProp("")}} icon="add"/>} placeholder="Add propertie" value={layerProp} onChange={e => setLayerProp(e.target.value)}/><br />
                                <Label color='red' ribbon="left">
                                    Table and Use case
                                </Label><br /><br />
                                <Form onSubmit={createLayer}>
                                    <Form.Field>
                                        <input style={{marginBottom: "0.4em"}} onChange={e => setLayer({...layer, name: e.target.value})} placeholder="Enter the name of the layer" required/>
                                    </Form.Field>
                                    <Form.Field>
                                        <select style={{marginBottom: "0.4em"}} onChange={e => setLayer({...layer, use_case: e.target.value})}>
                                            {useCases && useCases.map(element => <option value={element.name}>{element.name}</option>)}
                                        </select>
                                    </Form.Field>
                                    <Form.Field>
                                        <input onChange={e => setLayer({...layer, table: e.target.value})} placeholder="Enter the name of the table you want to add new layer" required/>
                                    </Form.Field>
                                    <Grid columns={2}>
                                        <Grid.Column width={13}>
                                            {layerSuccess === "Failed" && <Message color='red'><Icon name="thumbs down outline" />{layerSuccess}</Message>}
                                            {layerSuccess === "Success" && <Message color='yellow'><Icon name="thumbs up outline" />{layerSuccess}</Message>}
                                        </Grid.Column>
                                        <Grid.Column width={3}>
                                            <Button floated="right" type="submit" style={{marginBottom: "0.4em"}}>Add layer</Button>
                                        </Grid.Column>
                                    </Grid>
                                </Form>
                            </Segment>
                </div>}
        </div>
        :
        <NotProvider />
    )
}