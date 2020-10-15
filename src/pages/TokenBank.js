import React, { useState } from 'react'
import { Button, Input } from 'semantic-ui-react'
import useToggler from "../hooks/useToggler"
import Iframe from "react-iframe"
import elasticsearch from "elasticsearch"

function TokenBank() {
    const [show, toggle] = useToggler()
    const [postCode, setPostCode] = useState("")
    const [production, setProduction] = useState(null)
    const [consumption, setConsumption] = useState(null)
    const roi = consumption && (production / consumption) * 100
    
    const client = new elasticsearch.Client({
        host: "localhost:9200"
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
            index: 'smart_smart_energy_energy_consumtion_layer_nodes',
            body: {
                "query": {
                    "match": {
                        "Postcode": postCode
                    }
                },
                "size": 0,
                "aggs": {
                    "sum_consumption": { "sum": { "field": "Energy_Consumption_kWh" } }
                }
            }
        })
            .then(
                body => { setConsumption(body.aggregations.sum_consumption.value) },
                error => { alert(error.message) }
            )       
      }

      console.log("Production", production)
      console.log("Consumption", consumption)
      console.log("ROI", Math.round(roi))
    
    return (
        <div className="theBody">
            <h3>Work for this UI for SMART and TAC is still in progress. If you want to check SMART and TAC for Smart Energy use case please click the button bellow</h3>
            <Button onClick={toggle}>Check</Button>
            {
                show &&
                <div>
                    <Iframe src="http://localhost:5601/app/kibana#/dashboard/b61ab4a0-0d8f-11eb-82c9-d9cbef764e2b?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-15y%2Cto%3Anow))" height="665px" width="100%"></Iframe>
                    <Input onChange={e => setPostCode(e.target.value)} action={<Button onClick={esAggs} type='submit'>Calculate ROI</Button>} placeholder='Enter your UniqueID' />
                    {roi && <h3>Your Return of investment is: {roi}$</h3>}  
                </div>
            }
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