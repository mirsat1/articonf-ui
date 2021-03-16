import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../Context'
import firebase from "firebase/app";
import axiosBase from '../axios/axios-base'
import YAML from 'js-yaml'
import JSONPretty from 'react-json-prettify'


export default function ToscaConfig() {
    const { userUID } = useContext(Context)
    const [toscaLoaded, setToscaLoaded] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect( () => {
        // axiosBase('https://raw.githubusercontent.com/qcdis-sdia/sdia-tosca/master/examples/mog.yaml')
        axiosBase.get(`user_profile/${userUID}/tosca_config.json`)
            .then(r => {
                setToscaLoaded(YAML.load(r.data))
            })
            .catch(e => console.log(e))
        
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
        // bodyFormData.append('tosca', toscaLoaded); 
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
        await firebase.database().ref('/user_profile/' + userUID).update({
            tosca_config: YAML.dump(toscaLoaded)
          })
        setIsLoading(false)
    }
    function addVm() {
        let vmName = `compute_${toscaLoaded.topology_template.node_templates.topology.requirements.length}`
        toscaLoaded.topology_template.node_templates.topology.requirements.push({
            vm: {
              capability: "tosca.capabilities.QC.VM",
              node: vmName,
              relationship: "tosca.relationships.DependsOn"
            }
          })
        if(toscaLoaded.topology_template.node_templates !== vmName) setToscaLoaded({
            ...toscaLoaded, topology_template: {
                ...toscaLoaded.topology_template, node_templates: {
                    ...toscaLoaded.topology_template.node_templates, [vmName]: {
                            properties: {
                                disk_size: "40000 MB",
                                mem_size: "4000 MB",
                                num_cores: 2,
                                os_distro: "Ubuntu",
                                os_version: "18.04",
                                user_name: "vm_user"
                                },
                            interfaces: {
                                Standard: {
                                    create: "dumy.yaml"
                                }
                            },
                            type: "tosca.nodes.QC.VM.Compute"
                        }
                    }
                }
            })
    }
    toscaLoaded && console.log("TOSCA", toscaLoaded)
    return(
        <div className="theBody">
            Hi! I am the TOSCA Config component
            <button onClick={updateToscaToDB}>Click me to update TOSCA to DB</button>
            <button onClick={addVm}>Click me to add Virtual machine to the tosca</button>
            <span>{isLoading && "Loading..."}</span>
            <JSONPretty json={toscaLoaded} />
        </div>
    )
}