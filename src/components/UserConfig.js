import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../Context'
import axios from 'axios'
import YAML from 'js-yaml'
import firebase from "firebase/app";

export default function UserConfig() {
    const { userUID } = useContext(Context)
    const [ticConfig, setTicConfig] = useState({})

    useEffect(() => {
        axios.get("https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/bityoga/fabric_as_code/master/group_vars/all.yml")
            .then(res => setTicConfig(YAML.load(res.data)))
            .catch(e => console.log(e))
    }, [])

    function updateToDB() {
        firebase.database().ref('user_profile/' + userUID).update({
            user_config: YAML.dump(ticConfig)
          })
    }

    return(
        <div>
            <button onClick={updateToDB}>Update to DB</button>
            {/* <button onClick={setTicConfig({tlsca_password: "newPWD"})}>Change PW</button> */}
            </div>
    )
}