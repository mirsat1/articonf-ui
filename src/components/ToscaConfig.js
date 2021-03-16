import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../Context'
import firebase from "firebase/app";
import axiosBase from '../axios/axios-base'
import YAML from 'js-yaml'
import tosca from './tosca'
import JSONPretty from 'react-json-prettify'


export default function ToscaConfig() {
    const { userUID } = useContext(Context)
    const [toscaConfig, setToscaConfig] = useState(null)
    const [toscaLoaded, setToscaLoaded] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        axiosBase.get(`user_profile/${userUID}/tosca_config.json`)
            .then(r => setToscaLoaded(YAML.load(r.data)))
            .catch(e => console.log(e))
        setToscaConfig(YAML.dump(tosca))
    }, [userUID])
    async function updateToscaToDB() {
        //================================= OLD TESTING STUFF ==================================================
        // let aFileParts = ['<a id="a"><b id="b">hey!</b></a>']; // an array consisting of a single DOMString
        // let oMyBlob = new Blob([toscaLoaded], {type : 'text/yaml'}); // the blob
        // var formData = new FormData(); // Currently empty
        // formData.append('Tosca', oMyBlob, 'tosca.yaml')
        // formData.getAll('Tosca')
        //=======================================================================================================
        //================ axios post form-data example ========================================================
        // var bodyFormData = new FormData();
        // bodyFormData.append('tosca', toscaConfig); 
        // axiosBase({
        //     method: "post",
        //     url: "axios_posttest.json",
        //     data: bodyFormData,
        //     headers: { "Content-Type": "multipart/form-data" },
        //   })
        //     .then(function (response) {
        //       //handle success
        //       console.log(response);
        //     })
        //     .catch(function (response) {
        //       //handle error
        //       console.log(response);
        //     });
        //=======================================================================================================
        setIsLoading(true)
        await firebase.database().ref('user_profile/' + userUID).update({
            tosca_config: toscaConfig
          })
        setIsLoading(false)
    }
    console.log("TOSCA", toscaLoaded)
    return(
        <div className="theBody">
            Hi! I am the TOSCA Config component
            <button onClick={updateToscaToDB}>Click me to update TOSCA to DB</button>
            <span>{isLoading && "Loading..."}</span>
            <JSONPretty json={toscaConfig} />
        </div>
    )
}