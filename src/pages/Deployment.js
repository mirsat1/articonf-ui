import React, { useContext, useState, useRef } from "react"
import {Link} from "react-router-dom"
import {Context} from "../Context"
import Loader from 'react-loader-spinner'
import { Button, Icon, Input } from "semantic-ui-react"
// import axios from "../axios-conf"


function Deployment() {
    
    
    const {
        plannedToscaTemplate,
        provisionToscaTemplate,
        planToscaBtn,
        provisionToscaBtn,
        hasError,
        isLoading,
        deploymentLoading,
        platformDeployer,
        deployedToscaId,
        timeRemaining,
        isTimeRemaining,
        cancelRequest,
    } = useContext(Context)

    const [copySuccess, setCopySuccess] = useState('')
    const textAreaRef = useRef(null)

    const hours = Math.floor(timeRemaining / 60 / 60)
    const minutes = Math.floor(timeRemaining / 60) - (hours * 60)
    const secounds = timeRemaining % 60

    const bottomText = <div>
            {deploymentLoading && (isTimeRemaining ? 
                        <div>
                            <h3>
                                The server needs around 15 minutes to deploy the platform.<br />Time elapsed: {hours}h:{minutes}m:{secounds}s
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
            <p>Planned tosca topology template ID: {plannedToscaTemplate}</p><br />
            <p>Provisioned tosca topology template ID: {provisionToscaTemplate}</p><br />
            <p>Deployment ID: {deployedToscaId}</p>

        </div>

    const disabler = !plannedToscaTemplate || provisionToscaTemplate ? true : false
    
    function copyToClipboard(e) {
        textAreaRef.current.select();
        document.execCommand('copy');
        // This is just personal preference.
        // I prefer to not show the whole text area selected.
        e.target.focus();
        setCopySuccess('Copied!');
      };

    return (
        <div className="theBody">
            <p><strong>Instructions: </strong>Bellow you can see 3 buttons. The first button is labeled as "Plan" and is the only button 
            that is not disabled initialy. In order to deploy our platfrom first thing you need to do here is to press the "Plan" button.
            When you press this button you will wait a couple of seconds to call an API that will plan and return the ID of the planed 
            topolog template. When the planning process is finished, the "Plan" button will get disabled and the arrow pointing to the
            "Provision" will get filled out, you are ready to start the provisioning. To provision a tosca template you will need to press 
            the "Provison" button. By clicking the "Provision" button you will can an API that will provison an operational ID (Plan Tosca 
            Template. Returns the provision ID). This process takes around 1-3 minutes. When this process is finished the "Provision" button 
            will get disabled, the arrow pointing to the "Deploy" button will get filled out and the "Deploy" button will be enabled for clicking 
            and now you are ready for the last stage which is the deployment. In this stage you need to press the "Deploy" button. By pressin 
            the "Deploy" button you will call an API that will deploy the ARTICONF platfrom and return a deployment ID. This process takes around 
            15 minutes. In order for you to stay on track we have created a timer that will show you how much time has passed since you have started
            the deployment process. When this stage is finished an Alert will show up stating that the software is deployed with an ID of something. 
            After you have finished with deployment and you've got an ID, it is time for you to head to <Link to="/beta/testing/deployed">find 
            your deployment.</Link> Here at this page you can see 2 buttons, if the "Show Links" is disabled you probably do not have a deployment ID. 
            If it is not, you need to press it. After pressin it you will see 3 icons: HyperLedger explorer, Portainer and BlockChain explorer. 
            Further instructions will be presented at that page.</p>
            <p>Bellow the buttons you can see 3 different ID's which are empty. Each one of them will fill out as you go trough the process</p>
            <p><strong>Side note: Beside the 3 main buttons you can see a red button labeled "Cancel all request". If by any chance you need to 
                leave or refresh this UI and the process is already in progress, please press this button because it is not OK to leave our 
                servers hanging. Thank you in advance <Icon name="smile outline" /></strong></p>
            <div style={{textAlign: "center"}}>
            <Button onClick={planToscaBtn} disabled={plannedToscaTemplate}>Plan</Button>
            {plannedToscaTemplate ? <Icon name="arrow alternate circle right" size="big"></Icon> : <Icon name="arrow alternate circle right outline" size="big"/>}
            <Button onClick={provisionToscaBtn} disabled={disabler}>Provision</Button> 
            {provisionToscaTemplate ? <Icon name="arrow alternate circle right" size="big"></Icon> : <Icon name="arrow alternate circle right outline" size="big"/>}
            <Button onClick={platformDeployer} disabled={!provisionToscaTemplate}>Deploy</Button>
            <Button icon labelPosition="left" color="red" onClick={cancelRequest}><Icon name="cancel"/>Cancel all requests</Button>
            </div>
            <h1 style={{textAlign: "center"}}>
                { hasError ? "Sorry about this, but we have encountered an error!" :
                (
                isLoading ? 
                <div>
                  <h3>Just a moment please</h3>
                  <Loader
                    type="Watch"
                    color="#08335e"
                    height={100}
                    width={100}
                />  
                </div>
                : 
                bottomText
                )
                }
                <div className="login-form">
                    <Input
                        action={{
                        color: 'teal',
                        labelPosition: 'right',
                        icon: 'copy',
                        content: 'Copy Planned ID',
                        onClick: copyToClipboard
                        }}
                        ref={textAreaRef}
                        value={plannedToscaTemplate}
                    /><br /><hr />
                    <Input
                        action={{
                        color: 'teal',
                        labelPosition: 'right',
                        icon: 'copy',
                        content: 'Copy Provision ID',
                        onClick: copyToClipboard
                        }}
                        ref={textAreaRef}
                        value={provisionToscaTemplate}
                    /><br /><hr />
                    <Input
                        action={{
                        color: 'teal',
                        labelPosition: 'right',
                        icon: 'copy',
                        content: 'Copy Deployment ID',
                        onClick: copyToClipboard
                        }}
                        ref={textAreaRef}
                        value={deployedToscaId}
                    />
                </div>
                 
            </h1>
            <div className="deployLinks">
                <Link to="/beta/testing/"><Button icon labelPosition="left"><Icon name="home"/>Home</Button></Link>
                <Link to="/beta/testing/dashboard"><Button icon labelPosition="left"><Icon name="setting"/>Advanced configuration</Button></Link>
                <Link to="/beta/testing/contact"><Button icon labelPosition="left"><Icon name="mail"/>Contact Us</Button></Link>
            </div>
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