import React, { useState } from 'react'
import { Button, Form, Label, Icon, Header } from 'semantic-ui-react'
import useToggler from "../hooks/useToggler"

function TokenBank() {
    const [user, setUser] = useState({userName: "", tokens: 100})
    const [fromUser, setFromUser] = useState()
    const [toUser, setToUser] = useState()
    const [tokenAmount, setTokenAmount] = useState()

    const [show, toggle] = useToggler()

    function handleChange(event) {
        const {name, value} = event.target
        setUser(prevInputData => ({...prevInputData, [name]: value}))
    }

    function transferTokens() {
        
        // setUser(prev => ({...prev, tokens: prev.tokens - tokenAmount}))
        setUser(prevTo => {
            if(prevTo.userName === toUser) {
                return {...prevTo, tokens: prevTo.tokens + tokenAmount}
            }
            return {...prevTo, tokens: prevTo.tokens - tokenAmount}
        })
    }
    
    console.log("User: ", user)
    
    return (
       <div className="theBody" style={{textAlign: "center"}}>
           <Header as='h1'>Please use the token bank ONLY IF you have deployed the platform.</Header>
           <div className="bank">               
                <Form>
                    <Label as='a' image>
                        <img src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' alt=""/>
                        {user.userName ? user.userName : "Registered User Name"}
                    </Label><br />
                    <Header as="h3">
                        <Icon name="euro sign"/>
                        Token amount: {user.userName && (show && user.tokens)}
                    </Header>
                    <Form.Field>
                        <input type='text' placeholder='User Name' name="userName" value={user.userName} onChange={handleChange}/>
                        <Label pointing>Please enter your User Name</Label>
                    </Form.Field>
                    <Button onClick={toggle}>Check Balance</Button>
                    <Header as="h3">
                        Transfer Amount: {tokenAmount}
                        {tokenAmount && <Icon name="bitcoin" />}
                    </Header>
                    <Header as="h3">
                        {fromUser} <Icon name="forward" size="big"/>{toUser}
                    </Header>
                    <Form.Group widths='equal'>
                        <Form.Input
                            placeholder='From'
                            onChange={e => setFromUser(e.target.value)}
                        />
                        <Form.Input
                            placeholder='To'
                            onChange={e => setToUser(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Field>
                        <input type='number' placeholder='Amount' onChange={e => setTokenAmount(e.target.value)}/>
                        <Label pointing>Please enter the amount of tokens you want to transfer</Label>
                    </Form.Field>
                    <Button onClick={transferTokens}>Transfer</Button>
                </Form>
            </div>
       </div> 
    )
}

export default TokenBank