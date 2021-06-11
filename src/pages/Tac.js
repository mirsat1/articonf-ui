import React, { useContext, useState, useEffect } from 'react'
import Axios from 'axios'
import { Context } from '../Context'
import NotProvider from '../components/NotProvider'
import { Button, Dimmer, Loader, Grid, Segment, Label, Form, Popup, Icon, Message} from 'semantic-ui-react'
import useRequestInfo from '../hooks/useRequestInfo'
import useToggler from '../hooks/useToggler'

export default function Tac() {
    const { role, userUID, client } = useContext(Context)
    const [ucName, setUcName] = useState("")
    const [tableName, setTableName] = useState("")
    const [layerName, setLayerName] = useState("Impact_Layer")
    const [reqType, setReqType] = useState("nodes")
    const [port, setPort] = useState("30101")
    const [token, setToken] = useState(null)
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
    const [fieldName, setFieldName] = useState("")
    const [fieldType, setFieldType] = useState("text")
    const [dateFormat, setDateFormat] = useState("")
    const [indexCreated, onIndexCreated] = useRequestInfo("")
    const [ingest, onIngest] = useRequestInfo("")
    const [additionalSettings, toggle] = useToggler(false)
    const [delIndex, onDelIndex] = useRequestInfo("")
    const [mappings, onMappings] = useRequestInfo("")

    const UCProvider = (RegExp("UCprovider").test(role))


    useEffect(() => {
        setIsLoading(true)
        Axios.get(`https://articonf2.firebaseio.com/user_profile/${userUID}/smart_token/token.json`)
        .then(res => {
            setIsLoading(false)
            if(res.data) {
                setToken(res.data)
            } else {
                setHasError({isError: true, errorMessage: "Got empty token! Try getting a new one from SMART"})
            }
        })
        .catch(err => {
            setIsLoading(false)
            if (err.response) {
                setHasError({isError: true, errorMessage: "Token not loaded, reson: " + err.response.data.error})
            }  else {
                setHasError({isError: true, errorMessage: err.message})
            }
        })
        if (reqType === "nodes") {
            setPort("30101")
        } else if (reqType === "clusters") {
            setPort("30103")
        } else {
            console.log("Cant find request type!")
        }
    }, [userUID, reqType])

    function createTacIndex() {
        setIsLoading(true)
        setHasError({isError: false})
        Axios({
            method: "PUT", 
            url: `http://localhost:9200/${index}`,
            data: createIndex,
            headers: { "Content-Type": "application/json" }
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
    
    // async function ingestSmartToTac() {
    //     // setIsLoading(true)
    //     setHasError({isError: false})
    //     try {
    //         const response = await Axios({
    //             method: "get",
    //             url: `https://articonf1.itec.aau.at:${port}/api/use-cases/${ucName}/tables/${tableName}/layers/${layerName}/${reqType}`,
    //             headers: { "Content-Type": "application/json", "Authorization": token }
    //         })
    //         const newArr = response.data.map(k => {
    //             const oldObj = k
    //             oldObj.location = {lat: k.geolocation_latitude, lon: k.geolocation_longitude}
    //             return oldObj
    //         })
    //         // for (var ix = 0; ix < newArr.length; ix = ix + 2) {
    //         //     newArr.splice(ix, 0, { "index" : { "_index" : index, "_id" : ix } })
    //         // }
    //         // console.log(newArr)
    //         for (var i = 0; i < newArr.length; i++ ) {
    //             Axios({
    //                 method: "POST",
    //                 url: `http://localhost:9200/${index}/_doc/${i}`,
    //                 data: newArr[i],
    //                 headers: { "Content-Type": "application/json" }
    //             }).then(console.log(`Ingested: ${i}`))
    //             .catch(err => {
    //                 console.log(err)
    //             })
    //         }
    //         setIsLoading(false)
    //         setHasError({isError: false})
    //         onIngest("Success")
    //         setTimeout(() => onIngest(""), 3000)
    //     } catch (err) {
    //         setIsLoading(false)
    //         setHasError({isError: true, errorMessage: err.response.data})
    //         onIngest("Failed")
    //         setTimeout(() => onIngest(""), 3000)
    //         console.log(err)
    //     }
    // }
    async function ingestApiToES(e) {
        // e.preventDefault();
        setIsLoading(true)
        setHasError({isError: false})
        try {
            const response = await Axios({
                method: "get",
                url: `https://articonf1.itec.aau.at:${port}/api/use-cases/${ucName}/tables/${tableName}/layers/${layerName}/${reqType}`,
                headers: { "Content-Type": "application/json", "Authorization": token }
            })
            if (response.data.length === 0) {
                    setHasError({isError: true, errorMessage: "Recived empty object from smart!"})
                    setIsLoading(false)
                    onIngest("Failed")
                    setTimeout(() => onIngest(""), 3000)
            }
            const newArr = response.data.map(k => {
                const oldObj = k
                oldObj.location = {lat: k.geolocation_latitude, lon: k.geolocation_longitude}
                return oldObj
            })
            for (var i = 0; i < newArr.length; i++ ) {
                client.create({
                    index: index, // name your index
                    type: "_doc", // describe the data thats getting created
                    id: i, // increment ID every iteration
                    body: newArr[i] // *** THIS ASSUMES YOUR DATA FILE IS FORMATTED LIKE SO: [{prop: val, prop2: val2}, {prop:...}, {prop:...}]
                }, function(error, response) {
                    if (error) {
                    setHasError({...hasError, errorMessage: error.message})
                    setIsLoading(false)
                    onIngest("Failed")
                    setTimeout(() => onIngest(""), 3000)
                    console.log("error in loop", error)
                    return;
                    }
                    else {
                        console.log(response)
                    setIsLoading(false)
                    onIngest("Success")
                    setTimeout(() => onIngest(""), 3000)
                    // console.log(response);  //  I don't recommend this but I like having my console flooded with stuff.  It looks cool.  Like I'm compiling a kernel really fast.
                }
                });
            }
        } catch (e) {
            setIsLoading(false)
            setHasError({isError: true, errorMessage: e.message})
            onIngest("Failed")
            setTimeout(() => onIngest(""), 3000)
        }
        // e.target.reset()
    }

    function deleteIndex() {
        setIsLoading(true)
        setHasError({isError: false})
        client.indices.delete({
            index: index
        }, (err, response) => {
            if (err) {
                setIsLoading(false)
                setHasError({isError: true, errorMessage: err.message})
                onDelIndex("Failed")
                setTimeout(() => onDelIndex(""), 3000)
                return
            } else {
                setIsLoading(false)
                setHasError({isError: false})
                onDelIndex("Success")
                setTimeout(() => onDelIndex(""), 3000)
            }
        })
    }

    function putMappings(e) {
        setIsLoading(true)
        setHasError({isError: false})
        client.indices.putMapping({
            index: index,
            body: {
                "properties": {
                    [fieldName]: {
                        "type": fieldType
                    }
                }
            }
        }, (error, response) => {
            if (error) {
                setIsLoading(false)
                setHasError({isError: true, errorMessage: error.message})
                onMappings("Failed")
                setTimeout(() => onMappings(""), 3000)
                return
            } else {
                setIsLoading(false)
                setHasError({isError: false})
                onMappings("Success")
                setTimeout(() => onMappings(""), 3000)
            }
        })
    }

    function putDateMappings(e) {
        setIsLoading(true)
        client.indices.putMapping({
            index: index,
            body: {
                "properties": {
                    [fieldName]: {
                        "type": fieldType,
                        "format": dateFormat
                    }
                }
            }
        }, (error, response) => {
            if (error) {
                setIsLoading(false)
                console.error(error)
                return
            } else {
                setIsLoading(false)
                console.log(response)
            }
        })
    }

    //   console.log("Production", production)
    //   console.log("Energy Consumption", energyConsumption)
    //   console.log("Heating Consumption", heatingConsumption)
    //   console.log("Energy ROI", energyRoi)
    //   console.log("Heating ROI", heatRoi)
   return (
        UCProvider ?
        <div className="theBody">
            <h1>Tool for Analitycs and Cognition</h1>
            {isLoading && <Dimmer active>
                <Loader size='massive'>Loading</Loader>
            </Dimmer>}
            {hasError.isError && <Message color="red">{hasError.errorMessage && hasError.errorMessage}</Message>}
            <Grid columns={2}>
                <Grid.Column>
                    <Segment style={{height: "100%"}} raised>
                        <Label as='a' color='black' ribbon>
                        Index
                        </Label><br /><br />
                        <Label color='red' horizontal ribbon>
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
                        <Label as='a' color='black' ribbon="right">
                        Index
                        </Label><br /><br />
                        <Label color='red' horizontal ribbon="right">
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
                        <Label as='a' color='black' ribbon>
                        SMART Data
                        </Label><br /><br />
                        <Label color='red' horizontal ribbon>
                            Ingest data from SMART
                        </Label><br /><br />
                        <Form onSubmit={ingestApiToES}>
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
                                    </Grid.Column>
                                    <Grid.Column width={3}>
                                        <Button floated="right" type="submit" style={{marginBottom: "0.4em"}}>Ingest data</Button>
                                    </Grid.Column>
                                </Grid>
                            </Form.Field>
                        </Form>
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment style={{height: "100%"}} raised>
                        <Label as='a' color='black' ribbon>
                        Mappings
                        </Label><br /><br />
                        <Label color='red' horizontal ribbon>
                            Setup mappings
                        </Label><br /><br />
                        <Form onSubmit={() => {
                            if (fieldType === "date") {
                                putDateMappings()
                            } else {
                                putMappings()
                            }
                        }}>
                            <Form.Field>
                                <input style={{marginBottom: "0.4em"}} onChange={e => setIndex(e.target.value)} placeholder="Enter the name of the index" required/>
                                <input style={{marginBottom: "0.4em"}} onChange={e => setFieldName(e.target.value)} placeholder="Enter the name of the field" required/>
                                <select style={{marginBottom: "0.4em"}} onChange={e => setFieldType(e.target.value)} defaultValue="text">
                                    <option value="text">Text</option>
                                    <option value="geo_point">Geo point</option>
                                    <option value="date">Date</option>
                                </select>
                                {fieldType === "date" && 
                                    <div>
                                        <input style={{marginBottom: "0.4em"}} onChange={e => setDateFormat(e.target.value)} placeholder="Enter the date format" required/>
                                        <Popup content='Click the button to see date formats' trigger={<Button as='a' icon='question' href="https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-date-format.html" target="_blank"/>} />
                                        </div>
                                }
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
            </Grid>

        </div> :
        <NotProvider />
   )
}