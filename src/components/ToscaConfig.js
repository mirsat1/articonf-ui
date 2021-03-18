import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../Context'
import firebase from "firebase/app";
import axiosBase from '../axios/axios-base'
// import YAML from 'js-yaml'
import JSONPretty from 'react-json-prettify'
import { Button, Form, Input, Label, Grid, Segment } from 'semantic-ui-react'
import Loader from 'react-loader-spinner'


export default function ToscaConfig() {
    const { userUID } = useContext(Context)
    const [toscaLoaded, setToscaLoaded] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [vmProperties, setVmProperties] = useState({disk_size: "40000 MB", mem_size: "4000 MB", num_cores: 2, os_distro: "Ubuntu", os_version: "18.04", user_name: "vm_user"})
    const vmName = toscaLoaded && `compute_${toscaLoaded.topology_template.node_templates.topology.requirements.length}`
    useEffect( () => {
        // axiosBase('https://raw.githubusercontent.com/qcdis-sdia/sdia-tosca/master/examples/mog.yaml')
        axiosBase.get(`user_profile/${userUID}/tosca_config.json`)
            .then(r => {
                setToscaLoaded(r.data)
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
            tosca_config: toscaLoaded
          })
        setIsLoading(false)
    }
    function addVm() {
        // let vmName = `compute_${toscaLoaded.topology_template.node_templates.topology.requirements.length}`
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
                                disk_size: vmProperties.disk_size,
                                mem_size: vmProperties.mem_size,
                                num_cores: vmProperties.num_cores,
                                os_distro: vmProperties.os_distro,
                                os_version: vmProperties.os_version,
                                user_name: vmProperties.user_name
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
        const formData = new FormData();
        formData.append(`${userUID}`, JSON.stringify(toscaLoaded))
        // console.log(formData.get(`${userUID}`))

    }
    function removeVm() {
        // let vmName = `compute_${toscaLoaded.topology_template.node_templates.topology.requirements.length}`
        // delete toscaLoaded.topology_template.node_templates[vmName]
        // toscaLoaded.topology_template.node_templates.topology.requirements.pop()
        // console.log("This should delete a vm", toscaLoaded)
        // console.log("This should delete a vm", toscaLoaded.topology_template.node_templates.topology.requirements)
        const updatedArr = toscaLoaded.topology_template.node_templates.topology.requirements
        if(updatedArr.length > 1) {
           updatedArr.pop() 
           delete toscaLoaded.topology_template.node_templates[`compute_${updatedArr.length}`]
        }
        else alert("There must be one virtual machine in the tosca")
        setToscaLoaded({...toscaLoaded, topology_template: {...toscaLoaded.topology_template, node_templates: {...toscaLoaded.topology_template.node_templates, topology:{...toscaLoaded.topology_template.node_templates.topology, requirements: updatedArr}}}})
        
        // console.log(toscaLoaded.topology_template.node_templates)
        // console.log(updatedArr)
    }
    toscaLoaded && console.log("TOSCA", toscaLoaded)
    return(
        <div className="theBody">
            <h1>TOSCA Configuration</h1>
            <span>{isLoading && "Loading..."}</span>
            <Form onSubmit={addVm}>
                <Segment style={{margin: "1.2em"}}>
                    <Label color="black" ribbon>Virtual machine properties</Label><br />
                    <br />
                    <Form.Field>
                        <Input label="Username" placeholder={vmProperties.user_name} onChange={e => setVmProperties({...vmProperties, user_name: e.target.value})} />
                    </Form.Field>
                    <Form.Group inline > 
                        <Input label="Disck size" placeholder={vmProperties.disk_size} onChange={e => setVmProperties({...vmProperties, disk_size: e.target.value})} />
                        <Input label="Memory size" placeholder={vmProperties.mem_size} onChange={e => setVmProperties({...vmProperties, mem_size: e.target.value})} />
                        <Input label="Number of cores" type="number" placeholder={vmProperties.num_cores} onChange={e => setVmProperties({...vmProperties, num_cores: e.target.value})} />
                    </Form.Group>
                    <Form.Group inline>
                        <Grid columns={2}><Grid.Column width={5}><Label size="large">Operating system</Label></Grid.Column><Grid.Column width={10}><select id="os_distro" onChange={e => setVmProperties({...vmProperties, os_distro: e.target.value})}>
                            <option value="Ubuntu">Ubuntu</option>
                            </select></Grid.Column></Grid>
                        <Grid columns={2}><Grid.Column width={5}><Label size="large">Operating system version</Label></Grid.Column><Grid.Column width={7}><select id="os_version" onChange={e => setVmProperties({...vmProperties, os_version: e.target.value})}>
                            <option value="18.04">18.04</option>
                        </select></Grid.Column></Grid>
                    </Form.Group>
                    <Button type="submit">Add virtual machine</Button>
                    {isLoading && <h4>Updating... <Loader type="ThreeDots" color="#08335e" height={50} width={50}/></h4>}
                </Segment>
            </Form>
            <Button floated="right" onClick={removeVm}>Remove last virtual machine</Button> 
            <Button onClick={updateToscaToDB}>Save Changes</Button>
            {isLoading && <h4>Updating... <Loader type="ThreeDots" color="#08335e" height={50} width={50}/></h4>}
            <JSONPretty json={toscaLoaded} />
        </div>
    )
}