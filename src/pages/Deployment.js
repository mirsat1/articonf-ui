import React, { useContext } from "react"
import {Link} from "react-router-dom"
import {Context} from "../Context"
import Loader from 'react-loader-spinner'
import { Button, Icon } from "semantic-ui-react"
import CopyToClipboard from "../components/CopyToClipboard"
// import axios from "../axios-conf"


function Deployment() {
    
    
    const {
        plannedToscaTemplate,
        provisionToscaTemplate,
        planToscaBtn,
        provisionToscaBtn,
        isLoading,
        deploymentLoading,
        platformDeployer,
        deployedToscaId,
        timeRemaining,
        isTimeRemaining,
        cancelRequest
    } = useContext(Context)

    const hours = Math.floor(timeRemaining / 60 / 60)
    const minutes = Math.floor(timeRemaining / 60) - (hours * 60)
    const secounds = timeRemaining % 60
    
    function downloadTxtFile() {
        const element = document.createElement("a");
        const file = new Blob([document.getElementById('toBeDownloaded').innerHTML], {type: 'text/plain;charset=utf-8'});
        element.href = URL.createObjectURL(file);
        element.download = "myArticonfIDs.html";
        document.body.appendChild(element);
        element.click();
    }

    const bottomText = <div>
            {deploymentLoading && (isTimeRemaining ? 
                        <div>
                            <h3>
                                The server needs 15 to 25 minutes to deploy the platform. Please wait<br />Time elapsed: {hours}h:{minutes}m:{secounds}s
                            </h3>
                            <Loader
                                type="Watch"
                                color="#08335e"
                                height={100}
                                width={100}
                            />
                        </div> 
                    :
                    alert(`The software is deployed with ID: ${deployedToscaId}`))}
            {   
                plannedToscaTemplate &&
                <div>
                    <h1>Planned tosca topology template ID: {plannedToscaTemplate}</h1><br />
                    <CopyToClipboard name="Plan ID" inputValue={plannedToscaTemplate} />
                </div>
            }
            {
                provisionToscaTemplate &&
                <div>
                <h1>Provisioned tosca topology template ID: {provisionToscaTemplate}</h1><br />
                <CopyToClipboard name="Provision ID" inputValue={provisionToscaTemplate} />  
                </div>
            }
            {
                deployedToscaId &&
                <div>
                   <h1>Deployment ID: {deployedToscaId}</h1>
                    <CopyToClipboard name="Deployment ID" inputValue={deployedToscaId} /> 
                </div>
            }
        </div>

    const disabler = !plannedToscaTemplate || provisionToscaTemplate || isLoading ? true : false
    const deploymentDisabler = deployedToscaId || !provisionToscaTemplate || deploymentLoading ? true : false
    const plannerDisabler = plannedToscaTemplate || isLoading ? true : false
    const downloadDisabler = plannedToscaTemplate || provisionToscaTemplate || deployedToscaId ? false : true

    return (
        <div className="theBody">
            <div><strong>Instructions how to deploy the platform and the application:</strong><br />
                <h3>Tutorial video for deployment: <a href="https://youtu.be/2J_b4oVjWgs" target="_blank" rel="noopener noreferrer">Introduction to ARTICONF and deploying the platform (using the CONF tool)</a></h3>
                <h3>Plan the Infrastructure</h3>
                <p>To deploy our platform first press the "Plan" button so CONF will generate an optimal virtual infrastructure on the Cloud.  After the planning phase 
                    is finished you will get back an ID of the planned virtual infrastructure.</p> 
                <h3>Provision the Infrastructure</h3>
                <p>To provision the virtual infrastructure you will need to press the "Provision" button. By clicking the "Provision" button CONF will create the virtual 
                    infrastructure. This process takes around 1-3 minutes.</p>
                <h3>Deploy the Platform</h3>
                <p>In this stage you need to press the "Deploy" button to call the CONF API that will deploy the ARTICONF platform and return a deployment ID. This process 
                    takes around 15 minutes</p>
                <h3>Cancel all requests</h3>
                <p><strong>If by any chance you need to leave or refresh this UI and the process is already in progress, please press this button to clear the virtual infrastructure.</strong>
                </p>
                <h3>Interact with the Deployment</h3>
                <p>After you have finished with deployment and you've got an ID, which you can use to <Link to="/beta/testing/deployed">find your deployment.</Link></p>
                <p>After the deployment is over you will see 4 icons: </p><br />
                <ul>
                    <li>HyperLedger explorer</li>
                    <li>Portainer</li>
                    <li>Swarm Visualizer</li>
                    <li>Sample bank application</li>
                </ul>
                <p>Further instructions will be presented at that page. If you already have a deployment ID you can use it <Link to="/beta/testing/deployed">here.</Link></p>
                <p><strong>Tip: When you get your IDs, store them somewhere or you can download them by using the "Download ID's" button presented bellow. So when you come back 
                    to our platform you can navigate directly <Link to="/beta/testing/deployed">here.</Link> and just enter them to continue with your work.</strong></p>       
            </div>
            <div style={{textAlign: "center", paddingBottom: "20px"}}>
            <Button onClick={planToscaBtn} disabled={plannerDisabler} data-testid="planBtnDplPg">Plan</Button>
            {plannedToscaTemplate ? <Icon name="arrow alternate circle right" size="big"></Icon> : <Icon name="arrow alternate circle right outline" size="big"/>}
            <Button onClick={provisionToscaBtn} disabled={disabler}>Provision</Button> 
            {provisionToscaTemplate ? <Icon name="arrow alternate circle right" size="big"></Icon> : <Icon name="arrow alternate circle right outline" size="big"/>}
            <Button onClick={platformDeployer} disabled={deploymentDisabler}>Deploy</Button>
            <Button icon labelPosition="left" color="red" onClick={cancelRequest}><Icon name="cancel"/>Cancel all requests</Button>
            </div>
            <div style={{textAlign: "center"}}>
                {
                isLoading ? 
                <div>
                  <h3>Just a moment please! The request is beeing processed in the server.
                    <Loader
                        type="ThreeDots"
                        color="#08335e"
                        height={50}
                        width={50}
                    />
                  </h3>
                </div>
                : 
                bottomText
                }
                 
            </div>
                <div style={{textAlign: "center"}}>
                <pre><p id="toBeDownloaded" style={{display: "none"}}>
                    Planned tosca topology template ID: {plannedToscaTemplate}<br />
                    Provisioned tosca topology template ID: {provisionToscaTemplate}<br />
                    Deployment ID: {deployedToscaId}
                </p> 
                </pre>  
                <Button onClick={downloadTxtFile} disabled={downloadDisabler}>Download ID's</Button> 
            </div>
            {/* <div className="login-form">
                {
                    !name
                    &&
                    <Form onSubmit={e => setUserName(uname)}>
                        <Form.Field>
                            <Input action={<Button type="submit">SET your name</Button>} placeholder="Name" onChange={e => setUName(e.target.value)}/>
                            <Label pointing style={{textAlign: "start"}}>Enter your name here if you want to save your ID's on our database</Label>
                        </Form.Field>
                    </Form>
                }
                <Button onClick={saveIds} disabled={!name}>Save</Button>
            </div> */}
            {/* <div className="deployLinks">
                <Link to="/beta/testing/"><Button icon labelPosition="left"><Icon name="home"/>Home</Button></Link>
                <Link to="/beta/testing/dashboard"><Button icon labelPosition="left"><Icon name="setting"/>Advanced configuration</Button></Link>
                <Link to="/beta/testing/contact"><Button icon labelPosition="left"><Icon name="mail"/>Contact Us</Button></Link>
            </div> */}
            {/* 
            timeRemaining !== 0 ? 
                    `The server needs time to deploy the platfrom so please wait: ${Math.floor(timeRemaining / 60)}:${timeRemaining - minutes * 60} until deployed`
                    :
                    `The software is deployed with id: ${plannedToscaTemplate}`
            */}
            
        </div>
    )
}

export default Deployment