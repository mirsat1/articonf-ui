import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { Context } from "../Context";
import { Button, Form } from 'semantic-ui-react'

export default function Role() {
    const { setUpRole } = useContext(Context)
    const [role, setRole] = useState("UCuser1")
    const [key, setKey] = useState("")
    const [keyID, setKeyID] = useState("")
    const UCProvider = role === "UCprovider1" || role === "UCprovider2" || role === "UCprovider3" || role === "UCprovider4"

    useEffect(() => {
        if (UCProvider) {
          axios.get(`https://articonf2.firebaseio.com/uc_provider/${role}.json`)
            .then(res => setKeyID(res.data.key))
        }
      }, [UCProvider, role])

    //   console.log("KeyID: ", keyID)
    
    function onRoleSubmit() {
        if (UCProvider) {
            if (key === keyID) {
                setUpRole(role)
            } else alert("Wrong key!")
        } else setUpRole(role)
    }
    return (
        <div className="theBody" style={{textAlign: "center"}}>
            <div className="login-form">
                <h1 style={{textAlign: "center"}}>Select your role</h1>
                <Form onSubmit={onRoleSubmit}>
                    <Form.Field>
                        <label>
                            Role
                        </label>
                        <select onChange={e => setRole(e.target.value)} defaultValue="UCuser1">
                            <option value="UCuser1">Use case user - Crowd journalism</option>
                            <option value="UCuser2">Use case user - Smart energy</option>
                            <option value="UCuser3">Use case user - Video opinion</option>
                            <option value="UCuser4">Use case user - Car shariing</option>
                            <option value="UCprovider1">Use case provider - Crowd journalism</option>
                            <option value="UCprovider2">Use case provider - Smart energy</option>
                            <option value="UCprovider3">Use case provider - Video opinion</option>
                            <option value="UCprovider4">Use case provider - Car shariing</option>
                        </select>
                    </Form.Field>
                    {UCProvider && <Form.Field>
                        <label>
                        Unique key
                        <input onChange={e => setKey(e.target.value)} name="password" type="password" placeholder="Unique key" />
                    </label>
                    </Form.Field>}

                    <Button type="submit">Submit role</Button>
                </Form>
            </div>
        </div>
    )
}