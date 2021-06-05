import React, { useContext, useEffect, useState } from 'react'
import NotProvider from '../components/NotProvider'
import axios from 'axios'
import firebase from 'firebase/app'
import { Context } from '../Context'
import { Button, Form, Icon, Grid, Segment, Label } from "semantic-ui-react"
import CopyToClipboard from '../components/CopyToClipboard'
import Loader from 'react-loader-spinner'
import useToggler from '../hooks/useToggler'

export default function Smart() {
    // context states and etc
    const { role, userUID } = useContext(Context)

    // states
    const [loading, setLoading] = useState(false)
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
    const [tokenCreated, setTokenCreated] = useState(false)

    // Use case provider role checkup
    const UCProvider = role === "UCprovider1" || role === "UCprovider2" || role === "UCprovider3" || role === "UCprovider4"

    // Get 
    useEffect(() => {
        setLoading(true)
        axios.get(`https://articonf2.firebaseio.com/user_profile/${userUID}/smart_token/token.json`)
        .then(res => {
            setLoading(false)
            if(res.data) {
                setToken(res.data)
                console.log(res)
            }
        })
        .catch(e => {
            setLoading(false)
            console.log(e)
        })
    }, [userUID])
    // console.log("Token: ", token)

    async function createToke() {
        const reqBody = {
            "username":"regular@itec.aau.at",
            "password":"2bViezK0Tst2LzsTIXix"
        }
        await axios({
            method: "POST",
            url: "https://articonf1.itec.aau.at:30401/api/tokens",
            data: reqBody,
            headers: { "Content-Type": "application/json" }
        })
            .then(res => {
                setToken('Bearer ' + res.data)
                firebase.database().ref('user_profile/' + userUID + '/smart_token').set({
                    token: 'Bearer ' + res.data.token
                })
                setTokenCreated(true)
            })
            .catch(e => console.log(e))
    }

    function createUseCase(e) {
        e.preventDefault();
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
                console.log(res)
            })
            .catch(e => console.log(e))
        e.target.reset()
    }

    function createMapping(e) {
        e.preventDefault();
        axios({
            method: "put",
            url: `https://articonf1.itec.aau.at:30420/api/use-cases/${ucName}/tables/${tableName}/mapping`,
            data: mapping,
            headers: { "Content-Type": "application/json", "Authorization": token }
        })
            .then(res => {
                console.log(res)
            })
            .catch(e => console.log(e))
        e.target.reset()
    }

    function createTable(e) {
        e.preventDefault();
        axios({
            method: "POST",
            url: `https://articonf1.itec.aau.at:30420/api/use-cases/${ucName}/tables`,
            data: table,
            headers: { "Content-Type": "application/json", "Authorization": token }
        })
            .then(res => {
                console.log(res)
            })
            .catch(e => console.log(e))
        e.target.reset()
    }

    // console.log("Table: ", table)
    // console.log("Mappings: ", mapping)


    return (
        UCProvider ?
        <div className="theBody">
            <h1>Semantic Model with self-adaptive and Autonomous Relevant Technology Tool</h1>
            {
                loading 
                &&
                <div>
                <h3>Loading <Loader
                    type="ThreeDots"
                    color="#08335e"
                    height={50}
                    width={50}
                />
                </h3>  
                </div>
            }
            {!show && (token === "" ? "It seems that you are missing a SMART token! You need to" : "You already have a SMART token, but you can always") }
            {!show && <Button onClick={toggle}>{token ? "Create a new" : "Get a new"} SMART token</Button>}
            {
                show &&
                <div>
                    <Button onClick={createToke} style={{marginBottom: "0.4em"}}>Create new token for SMART</Button>
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
                                <Button type="submit" floated="right">Create new use-case</Button>
                            </Form>
                            <br /><br />
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
                                    <Button type="submit" floated="right">Create new table</Button>
                                </Form>
                                <br /><br />
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
                                    <Button type="submit" floated="right">Add mapping</Button>
                                </Form>
                                <br /><br />
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </div>}
        </div>
        :
        <NotProvider />
    )
}