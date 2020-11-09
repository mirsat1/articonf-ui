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
            <div><strong>Instructions:</strong><br />
            <p>How to use (deploy) the platform?</p>
            <p><strong>Step 1: </strong>“Plan”. Please select the "Plan" button to initialize the deployment. Once you press this button, please wait 
            several seconds to call the planning API and to generate the ID of the planned topology template.</p>
            <p><strong>Step 2: </strong>“Provision”. Once the planning process has been finished, the "Provision" button will be activated. Press this 
            button to start with provision of a Tosca template. This process can take up to 3 minutes. Once the provision process is done, a provision ID will be generated.</p> 
            <p><strong>Step 3: </strong>“Deploy”. Once the provision process has been finished, the "Deploy" button will be activated. Press this button 
            to start the last stage in which you will call an API that will deploy the ARTICONF platform and will return a deployment ID. This process can 
            take up to 20 minutes. For user convenience, a  timer will be prompt on the screen, counting the time passed since the start of the deployment 
            phase. Once the deployment is done, an alert will be prompt, stating that the software has been deployed and deployment ID will be generated.</p>   
            <p>Once you are done with the deployment, you can navigate to <Link to="/beta/testing/deployed">find your deployment</Link>. Please proceed to this web page for more details.</p>
            <strong>Note: ”Cancel all request” button. If you need to leave or refresh the UI, but the process is already in progress, please press this 
            button to release the load of our servers and keep them ready for the other users. Thank you in advance!</strong>
            <strong>Tip: Once you get your ID's, please keep a copy of them on some permanent storage, so next time when you use our platform you can 
            proceed to this site and by entering your ID’s you can continue with your work from the point where you stop! You can find "Download ID's" 
            button bellow the obtained ID's. Press this button and it will download the obtained ID's in a HTML file.</strong>        
            </div>
            <div style={{textAlign: "center", paddingBottom: "20px"}}>
            <Button onClick={planToscaBtn} disabled={plannerDisabler}>Plan</Button>
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