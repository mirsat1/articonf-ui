import React, { useContext, useState, useEffect } from 'react'
import Axios from 'axios'
import tacApi from '../axios/axios-tac'
import { Context } from '../Context'
import app from '../firebase'
import NotProvider from '../components/NotProvider'
import { Button, Dimmer, Loader, Grid, Segment, Label, Form, Icon, Message, Dropdown, Divider } from 'semantic-ui-react'
import useRequestInfo from '../hooks/useRequestInfo'
import useToggler from '../hooks/useToggler'
import CryptoJS from 'crypto-js'

export default function Tac() {
    const { role, userUID, tacToken, smartToken, getSmartTacTokens } = useContext(Context)
    const [ucName, setUcName] = useState("")
    const [tableName, setTableName] = useState("")
    const [layerName, setLayerName] = useState("Impact_Layer")
    const [reqType, setReqType] = useState("nodes")
    const [port, setPort] = useState("30101")
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState({isError: false, errorMessage: null})
    const [index, setIndex] = useState("")
    const [createIndex, setCreateIndex] = useState({
        settings: {
            index: {
              number_of_shards: 1,  
              number_of_replicas: 1 
            }
          }
    })
    const [dateFieldName, setDateFieldName] = useState("")
    const [dateFieldMappings, setDateFieldMappings] = useState({
        properties: {}
    })
    const [numOfDateFields, setNumOfDateFields] = useState(1)
    const [indexCreated, onIndexCreated] = useRequestInfo("")
    const [ingest, onIngest] = useRequestInfo("")
    const [numOfIngests, setNumOfIngests] = useState(0)
    const [numOfFailIngests, setNumOfFailIngests] = useState(0)
    const [ingestLength, setIngestLength] = useState(0)
    const [ingestedDocs, setIngestedDocs] = useState(0)
    const [additionalSettings, toggle] = useToggler(false)
    const [showCreateUser, toggleCreateUsser] = useToggler(false)
    const [showChangeUser, toggleChangeUser] = useToggler(false)
    const [delIndex, onDelIndex] = useRequestInfo("")
    const [mappings, onMappings] = useRequestInfo("")
    const [dateMappings, onDateMappings] = useRequestInfo("")
    const [tacCreateUser, onTacCreateUser] = useRequestInfo("")
    const [tacChangeUser, onTacChangeUser] = useRequestInfo("")
    const [numOfFields, setNumOfFields] = useState(1)
    const [mappingFieldName, setMappingFieldName] = useState(null)
    const [mappingBody, setMappingBody] = useState({
        properties: {}
    })
    const [secret, setSecret] = useState("")
    const [tacUserName, setTacUserName] = useState(null)
    const [tacUserPassword, setTacUserPassword] = useState(null)
    const [tacUserRole, setTacUserRole] = useState([])
    const [tacUserEmail, setTacUserEmail] = useState(null)
    const [tacUserFullName, setTacUserFullName] = useState(null)

    console.log(tacUserRole)

    const UCProvider = (RegExp("UCprovider").test(role))
    const dateInEpochSeconds = new Date().getTime()
    // const TAC_API_KEY=process.env.REACT_APP_TAC_ADM_API_KEY
    // let encoded = window.btoa(TAC_API_KEY)
    // let auth = 'Basic ' + encoded
    // tacApi.defaults.headers.common['Authorization'] = auth;
    
    // Encrypt
    // var ciphertext = CryptoJS.AES.encrypt('secret_key_to_be_encrypted', 'string that will give access to decription').toString();
 
    // Decrypt
    // var bytes  = CryptoJS.AES.decrypt('string_to_be_decripted', 'string that will give access to decription');
    // var originalText = bytes.toString(CryptoJS.enc.Utf8);
    


    function numOfMap(num) {
        let content = []
        for (var i = 0; i < num; i++) {
            content.push(<div><input style={{marginBottom: "0.4em"}} onChange={e => setMappingFieldName(e.target.value)} placeholder="Enter the name of the field" required/>
            <select style={{marginBottom: "0.4em"}} onChange={e => {setMappingBody({...mappingBody, properties: {...mappingBody.properties, [mappingFieldName]: {type: e.target.value}}})}}>
                <option>--Select the type of mappings--</option>
                <option value="binary">Binary</option>
                <option value="boolean">Boolean</option>
                <option value="keyword">Keyword</option>
                <option value="long">Long</option>
                <option value="double">Double</option>
                <option value="ip">IP</option>
                <option value="text">Text</option>
                <option value="geo_point">Geo points</option>
            </select></div>)
        }
        return content
    }

    function numOfDateMap(num) {
        let content = []
        for (var i = 0; i < num; i++) {
            content.push(<div><input style={{marginBottom: "0.4em"}} onChange={e => setDateFieldName(e.target.value)} placeholder="Enter the name of the date field" required/>
            <input style={{marginBottom: "0.4em"}} onChange={e => setDateFieldMappings({...dateFieldMappings, properties: {...dateFieldMappings.properties, [dateFieldName]: {type: "date", format: e.target.value}}})} placeholder="Enter the date field format" required/></div>)
        }
        return content
    }

    useEffect(() => {
        getSmartTacTokens()
        if (reqType === "nodes") {
            setPort("30101")
        } else if (reqType === "clusters") {
            setPort("30103")
        } else {
            console.log("Cant find request type!")
        }
    }, [reqType, getSmartTacTokens])

    async function changeTacUser() {
        setIsLoading(true)
        setHasError({isError: false})
        await app.database().ref('user_profile/' + userUID + '/tac_token').update({
            token: tacUserName + ':' + tacUserPassword,
            tac_username: tacUserName
        }).then(() => {
            setIsLoading(false)
            setHasError({isError: false, errorMessage: "Success!"})
            onTacChangeUser("Success")
            setTimeout(() => onTacChangeUser(""), 3000)
        }).catch(err => {
            onTacChangeUser("Failed")
            setTimeout(() => onTacChangeUser(""), 3000)
            if (err.response) {
                setHasError({isError: true, errorMessage: err.response.data.error.reason})
            }  else {
                setHasError({isError: true, errorMessage: err.message})
            }
        })
        getSmartTacTokens()
    }

    async function createTacUser() {
        setIsLoading(true)
        setHasError({isError: false})
        await Axios.get('https://articonf2.firebaseio.com/tac_token.json')
            .then(res => {
                console.log("Secret res: ", res)
                const bytes  = CryptoJS.AES.decrypt(res.data.token, secret);
                const originalText = bytes.toString(CryptoJS.enc.Utf8);
                const enc = window.btoa(originalText)
                const auth = 'Basic ' + enc
                console.log("Original Txt: ", originalText)
                const userBody = {
                    password : tacUserPassword,
                    roles : tacUserRole,
                    full_name : tacUserFullName,
                    email : tacUserEmail
                }
                tacApi({
                    method: "POST",
                    url: `_security/user/${tacUserName}`,
                    data: userBody,
                    headers: { "Content-Type": "application/json", "Authorization": auth }
                })
                    .then(async res => {
                        setIsLoading(false)
                        setHasError({isError: false, errorMessage: "Success!"})
                        onTacCreateUser("Success")
                        setTimeout(() => onTacCreateUser(""), 3000)
                        await app.database().ref('user_profile/' + userUID + '/tac_token').update({
                            token: tacUserName + ':' + tacUserPassword,
                            tac_username: tacUserName
                        })
                        getSmartTacTokens()
                    })
                    .catch(err => {
                        setIsLoading(false)
                        onTacCreateUser("Failed")
                        setTimeout(() => onTacCreateUser(""), 3000)
                        if (err.response) {
                            setHasError({isError: true, errorMessage: err.response.data.error.reason})
                        }  else {
                            setHasError({isError: true, errorMessage: err.message})
                        }
                    })
            })
            .catch(err => console.log(err))
    }


    function createTacIndex() {
        setIsLoading(true)
        setHasError({isError: false})
        console.log(tacToken)
        tacApi({
            method: "PUT", 
            url: `ui-${index}`,
            data: createIndex,
            headers: { "Content-Type": "application/json", "Authorization": tacToken}
        })
        .then(res => {
            setIsLoading(false)
            setHasError({isError: false})
            onIndexCreated("Success")
            setTimeout(() => onIndexCreated(""), 3000)
        })
        .catch(err => {
            setIsLoading(false)
            if (err.response) {
                setHasError({isError: true, errorMessage: err.response.data.error.reason})
            }  else {
                setHasError({isError: true, errorMessage: err.message})
            }
            onIndexCreated("Failed")
            setTimeout(() => onIndexCreated(""), 3000)
        })
    }    

    // function createNewIndex(e) {
    //     e.preventDefault();
    //     setIsLoading(true)
    //     client.indices.create({
    //         index: index
    //     }, function(error, response) {
    //         if (error) {
    //             setIsLoading(false)
    //             console.log(error)
    //         } else {
    //             setIsLoading(false)
    //             console.log(response)
    //         }
    //     })
    //     e.target.reset()
    // }
    // 30101 |||| 30103

    const timer = ms => new Promise(res => setTimeout(res, ms))
    
    async function ingestSmartToTac() {
        setIsLoading(true)
        setHasError({isError: false})
        setNumOfIngests(0)
        setNumOfFailIngests(0)
        setIngestedDocs(0)
        try {
            const response = await Axios({
                method: "get",
                url: `https://articonf1.itec.aau.at:${port}/api/use-cases/${ucName}/tables/${tableName}/layers/${layerName}/${reqType}`,
                headers: { "Content-Type": "application/json", "Authorization": smartToken }
            })
            if (response) {
                onIngest("Success")
                setTimeout(() => onIngest(""), 3000)
            }
            if (response.data.length === 0) {
                setHasError({isError: true, errorMessage: "Recived empty object from smart!"})
                setIsLoading(false)
                onIngest("Failed")
                setTimeout(() => onIngest(""), 3000)
            }
            const newArr = response.data.map(k => {
                const oldObj = k
                oldObj.location = {lat: k.geolocation_latitude, lon: k.geolocation_longitude}
                oldObj.ingestionTimestamp = dateInEpochSeconds
                return oldObj
            })
            setIngestLength(newArr.length)
            for (var i = 0; i < newArr.length; i++ ) { 
                tacApi({
                    method: "POST",
                    url: `ui-${index}/_doc/${newArr[i].UniqueID}`,
                    data: newArr[i],
                    headers: { "Content-Type": "application/json" }
                }).then(() => {
                    setIsLoading(false)
                    setHasError({...hasError, isError: false})
                    setNumOfIngests(prev => prev + 1)
                })
                .catch(err => {
                    if (err.response) {
                        setHasError({isError: true, errorMessage: err.response.data.error.reason})
                    }  else {
                        setHasError({isError: true, errorMessage: err.message})
                    }
                    setIsLoading(false)
                    setNumOfFailIngests(prev => prev + 1)
                })
                setIngestedDocs(prev => prev + 1)
                await timer(15)
            }
        } catch (e) {
            setIsLoading(false)
            setHasError({isError: true, errorMessage: e.message})
            onIngest("Failed")
            setTimeout(() => onIngest(""), 3000)
        }
    }


    // async function ingestApiToES(e) {
    //     // e.preventDefault();
    //     setIsLoading(true)
    //     setHasError({isError: false})
    //     try {
    //         const response = await Axios({
    //             method: "get",
    //             url: `https://articonf1.itec.aau.at:${port}/api/use-cases/${ucName}/tables/${tableName}/layers/${layerName}/${reqType}`,
    //             headers: { "Content-Type": "application/json", "Authorization": token }
    //         })
    //         if (response.data.length === 0) {
    //                 setHasError({isError: true, errorMessage: "Recived empty object from smart!"})
    //                 setIsLoading(false)
    //                 onIngest("Failed")
    //                 setTimeout(() => onIngest(""), 3000)
    //         }
    //         const newArr = response.data.map(k => {
    //             const oldObj = k
    //             oldObj.location = {lat: k.geolocation_latitude, lon: k.geolocation_longitude}
    //             return oldObj
    //         })
    //         for (var i = 0; i < newArr.length; i++ ) {
    //             client.create({
    //                 index: index, // name your index
    //                 type: "_doc", // describe the data thats getting created
    //                 id: i, // increment ID every iteration
    //                 body: newArr[i] // *** THIS ASSUMES YOUR DATA FILE IS FORMATTED LIKE SO: [{prop: val, prop2: val2}, {prop:...}, {prop:...}]
    //             }, function(error, response) {
    //                 if (error) {
    //                 setHasError({...hasError, errorMessage: error.message})
    //                 setIsLoading(false)
    //                 onIngest("Failed")
    //                 setTimeout(() => onIngest(""), 3000)
    //                 // console.log("error in loop", error)
    //                 return;
    //                 }
    //                 else {
    //                 setIsLoading(false)
    //                 onIngest("Success")
    //                 setTimeout(() => onIngest(""), 3000)
    //                 // console.log(response);  //  I don't recommend this but I like having my console flooded with stuff.  It looks cool.  Like I'm compiling a kernel really fast.
    //             }
    //             });
    //         }
    //     } catch (e) {
    //         setIsLoading(false)
    //         setHasError({isError: true, errorMessage: e.message})
    //         onIngest("Failed")
    //         setTimeout(() => onIngest(""), 3000)
    //     }
    //     // e.target.reset()
    // }


    function deleteIndex() {
        setIsLoading(true)
        setHasError({isError: false})
        tacApi({
            method: "DELETE",
            url: `ui-${index}`,
            headers: { "Content-Type": "application/json" }
        })
        .then(() => {
            setIsLoading(false)
            setHasError({isError: false})
            onDelIndex("Success")
            setTimeout(() => onDelIndex(""), 3000)
        })
        .catch(err => {
            setIsLoading(false)
            if (err.response) {
                setHasError({isError: true, errorMessage: err.response.data.error.reason})
            }  else {
                setHasError({isError: true, errorMessage: err.message})
            }
            onDelIndex("Failed")
            setTimeout(() => onDelIndex(""), 3000)
        })
    }

    function putMappings(e) {
        setIsLoading(true)
        setHasError({isError: false})
        tacApi({
            method: "PUT",
            url: `ui-${index}/_mapping`,
            data: mappingBody,
            headers: { "Content-Type": "application/json" }
        })
        .then(() => {
            setIsLoading(false)
            setHasError({isError: false})
            onMappings("Success")
            setTimeout(() => onMappings(""), 3000)
        })
        .catch(err => {
            setIsLoading(false)
            if (err.response) {
                setHasError({isError: true, errorMessage: err.response.data.error.reason})
            }  else {
                setHasError({isError: true, errorMessage: err.message})
            }
            onMappings("Failed")
            setTimeout(() => onMappings(""), 3000)
        })
    }

    function putDateMappings() {
        setIsLoading(true)
        setHasError({isError: false})
        tacApi({
            method: "PUT",
            url: `ui-${index}/_mapping`,
            data: dateFieldMappings,
            headers: { "Content-Type": "application/json" }
        })
        .then(() => {
            setIsLoading(false)
            setHasError({isError: false})
            onDateMappings("Success")
            setTimeout(() => onDateMappings(""), 3000)
        })
        .catch(err => {
            setIsLoading(false)
            if (err.response) {
                setHasError({isError: true, errorMessage: err.response.data.error.reason})
            }  else {
                setHasError({isError: true, errorMessage: err.message})
            }
            onDateMappings("Failed")
            setTimeout(() => onDateMappings(""), 3000)
        })

    }

    // function putDateMappings(e) {
    //     setIsLoading(true)
    //     client.indices.putMapping({
    //         index: index,
    //         body: {
    //             "properties": {
    //                 [fieldName]: {
    //                     "type": fieldType,
    //                     "format": dateFormat
    //                 }
    //             }
    //         }
    //     }, (error, response) => {
    //         if (error) {
    //             setIsLoading(false)
    //             console.error(error)
    //             return
    //         } else {
    //             setIsLoading(false)
    //             console.log(response)
    //         }
    //     })
    // }

   return (
        UCProvider ?
        <div className="theBody">
            <h1>Tool for Analitycs and Cognition</h1>
            <Dropdown button icon='setting' simple text="TAC User" className='button icon' labeled>
                <Dropdown.Menu>
                <Dropdown.Header icon='user' content='Configure TAC user'/>
                <Dropdown.Divider />
                <Dropdown.Item onClick={toggleCreateUsser} icon='add user' text='Create new TAC user' />
                <Dropdown.Item onClick={toggleChangeUser} icon='refresh' text='Change TAC user' />
                </Dropdown.Menu>
            </Dropdown>
            <Divider />
            {isLoading && <Dimmer active>
                <Loader size='massive'>Loading</Loader>
            </Dimmer>}
            {hasError.isError && <Message color="red">{hasError.errorMessage && hasError.errorMessage}</Message>}
            {showCreateUser &&
                <Grid>
                    <Grid.Column>
                        <Segment style={{height: "100%"}} raised>
                            <Button style={{marginBottom: "0.6em"}} onClick={toggleCreateUsser} floated="right" circular icon="close" color="red"/>
                            <Label as='a' color='black'>
                            Create new tac user and token
                            </Label><br /><br />
                            <Label color='red'>
                                Create new user
                            </Label><br /><br />
                            <Form onSubmit={createTacUser}>
                                <Form.Field>
                                    <input style={{marginBottom: "0.4em"}} onChange={e => setSecret(e.target.value)} placeholder="SECRET!" required/>
                                </Form.Field>
                                <Form.Field>
                                    <input style={{marginBottom: "0.4em"}} onChange={e => setTacUserName(e.target.value)} placeholder="Username" required/>
                                </Form.Field>
                                <Form.Field>
                                    <input style={{marginBottom: "0.4em"}} onChange={e => setTacUserPassword(e.target.value)} type="password" placeholder="Password" required/>
                                </Form.Field>
                                <Form.Field>
                                    <input style={{marginBottom: "0.4em"}} onChange={e => setTacUserEmail(e.target.value)} type="email" placeholder="Email" required/>
                                </Form.Field>
                                <Form.Field>
                                    <input style={{marginBottom: "0.4em"}} onChange={e => setTacUserFullName(e.target.value)} placeholder="Full name" required/>
                                </Form.Field>
                                <Form.Field>
                                    {role === "UCprovider" && 
                                    <select style={{marginBottom: "0.4em"}} onChange={e => setTacUserRole([e.target.value])}>
                                        <option>--Select tac role--</option>
                                        <option value="uc-admin">Admin</option>
                                        <option value="uc-user">Use-case user</option>
                                    </select>
                                    }
                                    {role === "UCprovider1" && 
                                    <select style={{marginBottom: "0.4em"}} onChange={e => setTacUserRole([e.target.value])}>
                                        <option>--Select tac role--</option>
                                        <option value="uc-cj-admin">Admin</option>
                                        <option value="uc-cj-user">Use-case user</option>
                                    </select >
                                    }
                                    {role === "UCprovider2" && 
                                    <select style={{marginBottom: "0.4em"}} onChange={e => setTacUserRole([e.target.value])}>
                                        <option>--Select tac role--</option>
                                        <option value="uc-se-admin">Admin</option>
                                        <option value="uc-se-user">Use-case user</option>
                                    </select>
                                    }
                                    {role === "UCprovider3" && 
                                    <select style={{marginBottom: "0.4em"}} onChange={e => setTacUserRole([e.target.value])}>
                                        <option>--Select tac role--</option>
                                        <option value="uc-vo-admin">Admin</option>
                                        <option value="uc-vo-user">Use-case user</option>
                                    </select>
                                    }
                                    {role === "UCprovider4" && 
                                    <select style={{marginBottom: "0.4em"}} onChange={e => setTacUserRole([e.target.value])}>
                                        <option>--Select tac role--</option>
                                        <option value="uc-cs-admin">Admin</option>
                                        <option value="uc-cs-user">Use-case user</option>
                                    </select>
                                    }
                                </Form.Field>
                                <Button style={{marginBottom: "0.6em"}} type="submit" floated="right">Create TAC user</Button>
                            </Form>
                                {tacCreateUser === "Failed" && <Message color='red'><Icon name="thumbs down outline" />{tacCreateUser}</Message>}
                                {tacCreateUser === "Success" && <Message color='yellow'><Icon name="thumbs up outline" />{tacCreateUser}</Message>}
                        </Segment>
                    </Grid.Column>
            </Grid>}
            {showChangeUser &&
                <Grid>
                    <Grid.Column>
                        <Segment style={{height: "100%"}} raised>
                            <Button style={{marginBottom: "0.6em"}} onClick={toggleChangeUser} floated="right" circular icon="close" color="red"/>
                            <Label as='a' color='black'>
                            Change
                            </Label><br /><br />
                            <Label color='red'>
                                Change TAC user
                            </Label><br /><br />
                            <Form onSubmit={changeTacUser}>
                                <Form.Field>
                                    <input style={{marginBottom: "0.4em"}} onChange={e => setTacUserName(e.target.value)} placeholder="Username" required/>
                                </Form.Field>
                                <Form.Field>
                                    <input style={{marginBottom: "0.4em"}} onChange={e => setTacUserPassword(e.target.value)} type="password" placeholder="Password" required/>
                                </Form.Field>
                                <Button style={{marginBottom: "0.6em"}} type="submit" floated="right">Change TAC user</Button>
                            </Form>
                                {tacChangeUser === "Failed" && <Message color='red'><Icon name="thumbs down outline" />{tacChangeUser}</Message>}
                                {tacChangeUser === "Success" && <Message color='yellow'><Icon name="thumbs up outline" />{tacChangeUser}</Message>}
                        </Segment>
                    </Grid.Column>
            </Grid>}
            <Grid columns={2}>
                <Grid.Column>
                    <Segment style={{height: "100%"}} raised>
                        <Label as='a' color='black'>
                        Index
                        </Label><br /><br />
                        <Label color='red'>
                            Create new index
                        </Label><br /><br />
                        <Form onSubmit={createTacIndex}>
                            <Form.Field>
                                <input style={{marginBottom: "0.4em"}} onChange={e => setIndex(e.target.value)} placeholder="Enter the name of the new index" required/>
                            </Form.Field>
                            {additionalSettings && 
                            <div>
                                <Form.Field>
                                <input style={{marginBottom: "0.4em"}} type="number" onChange={e => setCreateIndex({...createIndex, settings: {...createIndex.settings, number_of_shards: e.target.value}})} placeholder="Number of shards" required/>
                                </Form.Field>
                                <Form.Field>
                                <input style={{marginBottom: "0.4em"}} type="number" onChange={e => setCreateIndex({...createIndex, settings: {...createIndex.settings, number_of_replicas: e.target.value}})} placeholder="Number of replicas" required/>
                                </Form.Field>
                            </div>
                            }
                            <Button type="submit" floated="right">Create Index</Button>
                        </Form>
                            <Button icon labelPosition="left" onClick={toggle}>
                                {!additionalSettings && <Icon name="angle down" />}
                                {additionalSettings && <Icon name="angle up" />}
                                Additional Settings
                            </Button>
                            {indexCreated === "Failed" && <Message color='red'><Icon name="thumbs down outline" />{indexCreated}</Message>}
                            {indexCreated === "Success" && <Message color='yellow'><Icon name="thumbs up outline" />{indexCreated}</Message>}
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment style={{height: "100%"}} raised>
                        <Label as='a' color='black'>
                        Index
                        </Label><br /><br />
                        <Label color='red'>
                            Delete an index
                        </Label><br /><br />
                        <Form onSubmit={deleteIndex}>
                            <Form.Field>
                                <input style={{marginBottom: "0.4em"}} onChange={e => setIndex(e.target.value)} placeholder="Enter the name of the index" required/>
                            </Form.Field>
                            <Grid columns={2}>
                                <Grid.Column width={13}>
                                    {delIndex === "Failed" && <Message color='red'><Icon name="thumbs down outline" />{delIndex}</Message>}
                                    {delIndex === "Success" && <Message color='yellow'><Icon name="thumbs up outline" />{delIndex}</Message>}
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <Button floated="right" type="submit" style={{marginBottom: "0.4em"}}>Delete Index</Button>
                                </Grid.Column>
                            </Grid>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
            <Grid columns={2}>
                <Grid.Column>
                    <Segment style={{height: "100%"}} raised>
                        <Label as='a' color='black'>
                        Mappings
                        </Label><br /><br />
                        <Label color='red'>
                            Setup mappings
                        </Label><br /><br />
                        <Form onSubmit={putMappings}>
                            <Form.Field>
                                <input style={{marginBottom: "0.4em"}} onChange={e => setIndex(e.target.value)} placeholder="Enter the name of the index" required/>
                                <input style={{marginBottom: "0.4em"}} onChange={e => setNumOfFields(e.target.value)} placeholder="Enter the how much fields you want to map" type="number" required/>
                                {numOfMap(numOfFields)}
                            </Form.Field>
                            <Grid columns={2}>
                                <Grid.Column width={13}>
                                    {mappings === "Failed" && <Message color='red'><Icon name="thumbs down outline" />{mappings}</Message>}
                                    {mappings === "Success" && <Message color='yellow'><Icon name="thumbs up outline" />{mappings}</Message>}
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <Button floated="right" type="submit" style={{marginBottom: "0.4em"}}>Add mappings</Button>
                                </Grid.Column>
                            </Grid>
                        </Form>
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment style={{height: "100%"}} raised>
                        <Label as='a' color='black'>
                            Date Mappings
                        </Label><br /><br />
                        <Label color='red'>
                            Setup date mappings
                        </Label><br /><br />
                        <Form onSubmit={putDateMappings}>
                            <Form.Field>
                                <input style={{marginBottom: "0.4em"}} onChange={e => setIndex(e.target.value)} placeholder="Enter the name of the index" required/>
                                <input style={{marginBottom: "0.4em"}} onChange={e => setNumOfDateFields(e.target.value)} placeholder="Enter the how much fields you want to map" type="number" required/>
                                {numOfDateMap(numOfDateFields)}
                            </Form.Field>
                            <Grid columns={2}>
                                <Grid.Column width={13}>
                                    {dateMappings === "Failed" && <Message color='red'><Icon name="thumbs down outline" />{dateMappings}</Message>}
                                    {dateMappings === "Success" && <Message color='yellow'><Icon name="thumbs up outline" />{dateMappings}</Message>}
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <Button floated="right" type="submit" style={{marginBottom: "0.4em"}}>Add dates mappings</Button>
                                </Grid.Column>
                            </Grid>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
            <Segment style={{height: "100%"}} raised>
                <Label as='a' color='black'>
                SMART Data
                </Label><br /><br />
                <Label color='red'>
                    Ingest data from SMART
                </Label><br /><br />
                <Form onSubmit={ingestSmartToTac}>
                    <Form.Field>
                        <input style={{marginBottom: "0.4em"}} onChange={e => setIndex(e.target.value)} placeholder="Enter the name of the index where the data you want to be ingested" required/>    
                        <input style={{marginBottom: "0.4em"}} onChange={e => setUcName(e.target.value)} placeholder="Enter the name of the use-case" required/>
                        <input style={{marginBottom: "0.4em"}} onChange={e => setTableName(e.target.value)} placeholder="Enter the name of the table" required/>
                        <select style={{marginBottom: "0.4em"}} onChange={e => setLayerName(e.target.value)} defaultValue="Impact_Layer">
                            <option value="Impact_Layer">Impact Layer</option>
                            <option value="Informative_Layer">Informative Layer</option>
                            <option value="Location_Layer">Location Layer</option>
                            <option value="Object_Type_Layer">ObjectType Layer</option>
                            <option value="Price_Layer">Price Layer</option>
                            <option value="Tag_Layer">Tag Layer</option>
                            <option value="Trust_Layer">Trust Layer</option>
                            <option value="Video_Age_Layer">Video Age Layer</option>
                        </select>
                        <select style={{marginBottom: "0.4em"}} onChange={e => setReqType(e.target.value)} defaultValue="nodes">
                            <option value="nodes">Nodes</option>
                            <option value="clusters">Clusters</option>
                        </select>
                    </Form.Field>
                    <Form.Field>
                        <Grid columns={2}>
                            <Grid.Column width={13}>
                                {ingest === "Failed" && <Message color='red'><Icon name="thumbs down outline" />{ingest}</Message>}
                                {ingest === "Success" && <Message color='yellow'><Icon name="thumbs up outline" />{ingest}</Message>}
                                {
                                    (numOfIngests || numOfFailIngests) !== 0 &&
                                    <div>
                                        <Message color='yellow'><Icon name="thumbs up outline" />Succeded: {numOfIngests}</Message>
                                        <Message color='red'><Icon name="thumbs down outline" />Failed: {numOfFailIngests}</Message>
                                        <Message><Icon name="info" />If you change this tab, the proccess of ingestion will go a lot slower!</Message>
                                    </div>
                                }
                                <p>Documents to be ingested in TAC: {ingestLength}</p><p>Ingested documents to TAC: {ingestedDocs}</p>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Button floated="right" type="submit" style={{marginBottom: "0.4em"}}>Ingest data</Button>
                            </Grid.Column>
                        </Grid>
                    </Form.Field>
                </Form>
            </Segment>
        </div> :
        <NotProvider />
   )
}