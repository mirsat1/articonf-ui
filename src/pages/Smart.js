import React, { useContext, useEffect, useState } from 'react'
import NotProvider from '../components/NotProvider'
import axios from 'axios'
import firebase from 'firebase/app'
import { Context } from '../Context'
import { Button, Icon } from "semantic-ui-react"
import CopyToClipboard from '../components/CopyToClipboard'
import Loader from 'react-loader-spinner'
import useToggler from '../hooks/useToggler'
import BaseStorageTst from '../components/BaseStorageTst'

export default function Smart() {
    // context states and etc
    const { role, userUID } = useContext(Context)

    // states
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState("")
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
console.log("Token: ", token)

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
                setToken('Bearer ' + res.data.token)
                firebase.database().ref('user_profile/' + userUID + '/smart_token').set({
                    token: 'Bearer ' + res.data.token
                })
                setTokenCreated(true)
            })
            .catch(e => console.log(e))
    }


    return (
        UCProvider ?
        <div className="theBody">
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
            <BaseStorageTst />
        </div>
        :
        <NotProvider />
    )
}