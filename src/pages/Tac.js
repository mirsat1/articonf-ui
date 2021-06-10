import React, { useContext, useState, useEffect } from 'react'
import Axios from 'axios'
import { Context } from '../Context'
import NotProvider from '../components/NotProvider'
import { Button, Dimmer, Loader, Grid, Segment, Label, Form, Popup} from 'semantic-ui-react'

export default function Tac() {
    const { role, userUID, client } = useContext(Context)
    const [ucName, setUcName] = useState("")
    const [tableName, setTableName] = useState("")
    const [layerName, setLayerName] = useState("Impact_Layer")
    const [reqType, setReqType] = useState("nodes")
    const [port, setPort] = useState("30101")
    const [token, setToken] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [index, setIndex] = useState("")
    const [fieldName, setFieldName] = useState("")
    const [fieldType, setFieldType] = useState("text")
    const [dateFormat, setDateFormat] = useState("")

    const arr = [{price: 15, geolocation_longitude: 10, geolocation_latitude: 15}, {price: 15, geolocation_longitude: 10, geolocation_latitude: 15}, {price: 15, geolocation_longitude: 10, geolocation_latitude: 15}]

    const newArr = arr.map(k => {
        const location = k
        location.geo = {lat: k.geolocation_latitude, lon: k.geolocation_longitude}
        return location
    })

    console.log(newArr)

    const UCProvider = (RegExp("UCprovider").test(role))

    // function esAggs() {
    //     client.search({
    //         index: 'smart_smart_energy_solar_production_layer_nodes',
    //         body: {
    //             "query": {
    //                 "match": {
    //                     "Postcode": postCode
    //                 }
    //             },
    //             "size": 0,
    //             "aggs": {
    //                 "sum_production": { "sum": { "field": "Solar_Production_kWh" } }
    //             }
    //         }
    //     })
    //         .then(
    //             body => { setProduction(body.aggregations.sum_production.value) }, 
    //             error => { alert(error.message) })
        
    //     client.search({
    //         index: 'smart_smart_energy_heating_consumtion_layer_nodes',
    //         body: {
    //             // "query": {
    //             //     "match": {
    //             //         "Postcode": postCode
    //             //     }
    //             // },
    //             "size": 0,
    //             "aggs": {
    //                 "sum_consumption": { "sum": { "field": "Heating_Consumption_kWh" } }
    //             }
    //         }
    //     })
    //         .then(
    //             body => { setHeatingConsumption(body.aggregations.sum_consumption.value) },
    //             error => { alert(error.message) }
    //         )
    //     client.search({
    //         index: 'smart_smart_energy_energy_consumtion_layer_nodes',
    //         body: {
    //             // "query": {
    //             //     "match": {
    //             //         "Postcode": postCode
    //             //     }
    //             // },
    //             "size": 0,
    //             "aggs": {
    //                 "sum_consumption": { "sum": { "field": "Energy_Consumption_kWh" } }
    //             }
    //         }
    //     })
    //         .then(
    //             body => { setEnergyConsumption(body.aggregations.sum_consumption.value) },
    //             error => { alert(error.message) }
    //         )       
    // }

    useEffect(() => {
        setIsLoading(true)
        Axios.get(`https://articonf2.firebaseio.com/user_profile/${userUID}/smart_token/token.json`)
        .then(res => {
            setIsLoading(false)
            if(res.data) {
                setToken(res.data)
                console.log(res)
            }
        })
        .catch(e => {
            setIsLoading(false)
            console.log(e)
        })
        if (reqType === "nodes") {
            setPort("30101")
        } else if (reqType === "clusters") {
            setPort("30103")
        } else {
            console.log("Cant find request type!")
        }
    }, [userUID, reqType])
    

    function createNewIndex(e) {
        e.preventDefault();
        setIsLoading(true)
        client.indices.create({
            index: index
        }, function(error, response) {
            if (error) {
                setIsLoading(false)
                console.log(error)
            } else {
                setIsLoading(false)
                console.log(response)
            }
        })
        e.target.reset()
    }
    // 30101 |||| 30103
    async function ingestApiToES(e) {
        // e.preventDefault();
        setIsLoading(true)
        try {
            const response = await Axios({
                method: "get",
                url: `https://articonf1.itec.aau.at:${port}/api/use-cases/${ucName}/tables/${tableName}/layers/${layerName}/${reqType}`,
                headers: { "Content-Type": "application/json", "Authorization": token }
            })
            const newArr = response.data.map(k => {
                const oldObj = k
                oldObj.location = {lat: k.geolocation_latitude, lon: k.geolocation_longitude}
                return oldObj
            })
            for (var i = 0; i < newArr.length; i++ ) {
                client.create({
                    index: "use-cases", // name your index
                    type: "_doc", // describe the data thats getting created
                    id: i, // increment ID every iteration
                    body: newArr[i] // *** THIS ASSUMES YOUR DATA FILE IS FORMATTED LIKE SO: [{prop: val, prop2: val2}, {prop:...}, {prop:...}]
                }, function(error, response) {
                    if (error) {
                    console.error(error);
                    setIsLoading(false)
                    return;
                    }
                    else {
                    setIsLoading(false)
                    console.log(response);  //  I don't recommend this but I like having my console flooded with stuff.  It looks cool.  Like I'm compiling a kernel really fast.
                }
                });
            }
        } catch (e) {
            console.error(e)
        }
        // e.target.reset()
    }

    function deleteIndex(e) {
        e.preventDefault();
        setIsLoading(true)
        client.indices.delete({
            index: index
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
        e.target.reset()
    }

    function putMappings(e) {
        setIsLoading(true)
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
                console.error(error)
                return
            } else {
                setIsLoading(false)
                console.log(response)
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
            {isLoading && <Dimmer active>
                <Loader size='massive'>Loading</Loader>
            </Dimmer>}
            <Grid>
                <Grid.Column>
                    <Segment raised>
                        <Label as='a' color='black' ribbon>
                        SMART Data
                        </Label><br /><br />
                        <Label color='red' horizontal ribbon>
                            Ingest data from SMART
                        </Label><br /><br />
                        <Form onSubmit={ingestApiToES}>
                            <Form.Field>
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
                            <Button type="submit" floated="right">Ingest Data</Button>
                        </Form>
                        <br /><br />
                    </Segment>
                </Grid.Column>
            </Grid>
            <Grid columns={2}>
                <Grid.Column>
                    <Segment raised>
                        <Label as='a' color='black' ribbon>
                        Index
                        </Label><br /><br />
                        <Label color='red' horizontal ribbon>
                            Create new index
                        </Label><br /><br />
                        <Form onSubmit={createNewIndex}>
                            <Form.Field>
                                <input style={{marginBottom: "0.4em"}} onChange={e => setIndex(e.target.value)} placeholder="Enter the name of the new index" required/>
                            </Form.Field>
                            <Button type="submit" floated="right">Create Index</Button>
                        </Form>
                        <br /><br />
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment raised>
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
                            <Button type="submit" floated="right">Delete Index</Button>
                        </Form>
                        <br /><br />
                    </Segment>
                </Grid.Column>
            </Grid>
            <Grid>
                <Grid.Column>
                    <Segment raised>
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
                            <Button type="submit" floated="right">Add mapping</Button>
                        </Form>
                        <br /><br />
                    </Segment>
                </Grid.Column>
            </Grid>

        </div> :
        <NotProvider />
   )
}