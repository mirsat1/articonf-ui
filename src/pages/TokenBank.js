import React, { useContext, useState } from 'react'
import { Button, Input } from 'semantic-ui-react'
import {Context} from "../Context"
import Iframe from "react-iframe"
import elasticsearch from "elasticsearch"
// import Popup from 'reactjs-popup';
import JSONPretty from 'react-json-prettify'
import 'reactjs-popup/dist/index.css';

function TokenBank() {
    const {amountLayer} = useContext(Context)
    
    const [postCode, setPostCode] = useState("")
    const [production, setProduction] = useState(null)
    const [energyConsumption, setEnergyConsumption] = useState(null)
    const [heatingConsumption, setHeatingConsumption] = useState(null)
    const energyRoi = energyConsumption && (production / energyConsumption) * 100
    const heatRoi = heatingConsumption && (production / heatingConsumption) * 100
    
    const client = new elasticsearch.Client({
        host: "localhost:9200",
        auth: "elastic:mirsat"
    })

    client.ping({
        // ping usually has a 3000ms timeout
        requestTimeout: 1000
      }, function (error) {
        if (error) {
          console.trace('elasticsearch cluster is down!');
        } else {
          console.log('All is well');
        }
      });

      function esAggs() {
        client.search({
            index: 'smart_smart_energy_solar_production_layer_nodes',
            body: {
                "query": {
                    "match": {
                        "Postcode": postCode
                    }
                },
                "size": 0,
                "aggs": {
                    "sum_production": { "sum": { "field": "Solar_Production_kWh" } }
                }
            }
          })
            .then(
                body => { setProduction(body.aggregations.sum_production.value) }, 
                error => { alert(error.message) })
        
        client.search({
            index: 'smart_smart_energy_heating_consumtion_layer_nodes',
            body: {
                // "query": {
                //     "match": {
                //         "Postcode": postCode
                //     }
                // },
                "size": 0,
                "aggs": {
                    "sum_consumption": { "sum": { "field": "Heating_Consumption_kWh" } }
                }
            }
        })
            .then(
                body => { setHeatingConsumption(body.aggregations.sum_consumption.value) },
                error => { alert(error.message) }
            )
        client.search({
            index: 'smart_smart_energy_energy_consumtion_layer_nodes',
            body: {
                // "query": {
                //     "match": {
                //         "Postcode": postCode
                //     }
                // },
                "size": 0,
                "aggs": {
                    "sum_consumption": { "sum": { "field": "Energy_Consumption_kWh" } }
                }
            }
        })
            .then(
                body => { setEnergyConsumption(body.aggregations.sum_consumption.value) },
                error => { alert(error.message) }
            )       
      }

    //   console.log("Production", production)
    //   console.log("Energy Consumption", energyConsumption)
    //   console.log("Heating Consumption", heatingConsumption)
    //   console.log("Energy ROI", energyRoi)
    //   console.log("Heating ROI", heatRoi)
    
    return (
        <div className="theBody">
            <div>
                <h3>Token bank dashboard:</h3><br />
                <Iframe src="http://15.237.93.29:8081/app/kibana#/dashboard/2a8485d0-3bf0-11eb-b59a-fbbddab9db15?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3A'2019-12-31T04%3A16%3A47.619Z'%2Cto%3A'2020-10-25T09%3A32%3A04.809Z'))" height="2100px" width="100%" frameBorder="0"></Iframe>
                {/* <Popup
                    trigger={<button className="button"> Get SMART Clustered Data </button>}
                    modal
                    nested
                >
                    {close => (
                    <div className="modal">
                        <button className="close" onClick={close}>
                        &times;
                        </button>
                        <div className="header"> Chose Layer </div>
                        <div className="content">
                        {' '}
                        Amount layer is for something something 123 123 321 312
                        <br />
                        Transaction layer is for something that thing and 321 123
                        </div>
                        <div className="actions">
                        
                            <button className="button" onClick={getAmountLayer} disabled={true}> Trigger </button>
                        
                        <button
                            className="button"
                            onClick={() => {
                            console.log('modal closed ');
                            close();
                            }}
                        >
                            close modal
                        </button>
                        </div>
                    </div>
                    )}
                </Popup> */}
                <h5 style={{display: amountLayer ? "block" : "none"}}>Amount layer clusters: <JSONPretty json={amountLayer}/></h5>
                {(energyConsumption || heatingConsumption) && <Input onChange={e => setPostCode(e.target.value)} action={<Button onClick={esAggs} type='submit'>Calculate ROI</Button>} placeholder='Enter your UniqueID' />}
                {   
                    (energyConsumption || heatingConsumption) &&
                    <div>
                        <h3>Your Return of investment is: {energyRoi}$</h3>
                        <h3>Your Return of investment is: {heatRoi}$</h3>
                    </div>
                }  
            </div>
        </div>
    )
}

export default TokenBank
// function TokenBank() {
//     const [user, setUser] = useState({userName: "", tokens: 100})
//     const [fromUser, setFromUser] = useState()
//     const [toUser, setToUser] = useState()
//     const [tokenAmount, setTokenAmount] = useState()

//     const [show, toggle] = useToggler()

//     function handleChange(event) {
//         const {name, value} = event.target
//         setUser(prevInputData => ({...prevInputData, [name]: value}))
//     }

//     function transferTokens() {
        
//         // setUser(prev => ({...prev, tokens: prev.tokens - tokenAmount}))
//         setUser(prevTo => {
//             if(prevTo.userName === toUser) {
//                 return {...prevTo, tokens: prevTo.tokens + tokenAmount}
//             }
//             return {...prevTo, tokens: prevTo.tokens - tokenAmount}
//         })
//     }
    
//     return (
//        <div className="theBody" style={{textAlign: "center"}}>
//            <Header as='h1'>Please use the token bank ONLY IF you have deployed the platform.</Header>
//            <div className="bank">               
//                 <Form>
//                     <Label as='a' image>
//                         <img src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' alt=""/>
//                         {user.userName ? user.userName : "Registered User Name"}
//                     </Label><br />
//                     <Header as="h3">
//                         <Icon name="euro sign"/>
//                         Token amount: {user.userName && (show && user.tokens)}
//                     </Header>
//                     <Form.Field>
//                         <input type='text' placeholder='User Name' name="userName" value={user.userName} onChange={handleChange}/>
//                         <Label pointing>Please enter your User Name</Label>
//                     </Form.Field>
//                     <Button onClick={toggle}>Check Balance</Button>
//                     <Header as="h3">
//                         Transfer Amount: {tokenAmount}
//                         {tokenAmount && <Icon name="bitcoin" />}
//                     </Header>
//                     <Header as="h3">
//                         {fromUser} <Icon name="forward" size="big"/>{toUser}
//                     </Header>
//                     <Form.Group widths='equal'>
//                         <Form.Input
//                             placeholder='From'
//                             onChange={e => setFromUser(e.target.value)}
//                         />
//                         <Form.Input
//                             placeholder='To'
//                             onChange={e => setToUser(e.target.value)}
//                         />
//                     </Form.Group>
//                     <Form.Field>
//                         <input type='number' placeholder='Amount' onChange={e => setTokenAmount(e.target.value)}/>
//                         <Label pointing>Please enter the amount of tokens you want to transfer</Label>
//                     </Form.Field>
//                     <Button onClick={transferTokens}>Transfer</Button>
//                 </Form>
//             </div>
//        </div> 
//     )
// }

// export default TokenBank