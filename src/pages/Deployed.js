import React, { useContext, useState } from "react"
import { Context } from "../Context"
import Loader from 'react-loader-spinner'
import JSONPretty from 'react-json-prettify'
import useToggler from "../hooks/useToggler"
import CopyToClipboard from "../components/CopyToClipboard"
import { Header, Icon, Button, Input, Form } from 'semantic-ui-react'

function Deployed() {
    const {
        isLoading, 
        isDeleted, 
        findDeployed, 
        deployment, 
        deleteProvision, 
        setPlanId, 
        setProvisionId, 
        setDeploymentId,
        plannedToscaTemplate,
        provisionToscaTemplate,
        deployedToscaId,
        setDeletedId,
        findDeleted,
        deleted,
        initialiseIds
    } = useContext(Context)
    
    const [show, toggle] = useToggler()
    const [showDeployed, toggleShow] = useToggler()
    const [showDeleted, toggleDeleted] = useToggler()
    const [showDialog, toggleDialog] = useToggler()
    const [planerId, setPlanerId] = useState()
    const [provisionerId, setProvisionerId] = useState()
    const [deployerId, setDeployerId] = useState()
    const [deleterId, setDeleterId] = useState()
    const [message, setMessage] = useState("")
    const [yesDisabler, setYesDisabler] = useState(false)


    //<JSONPretty json={deployment.topology_template.node_templates.tic.attributes.service_urls}/>
    const hyperLedger = deployment && JSON.stringify(deployment.topology_template.node_templates.tic.attributes.service_urls[0])
    const hyperLedgerLink = deployment && hyperLedger.substring(1, hyperLedger.length-1)
    const portainer = deployment && JSON.stringify(deployment.topology_template.node_templates.tic.attributes.service_urls[1])
    const portainerLink = deployment && portainer.substring(1, hyperLedger.length-1)
    const blockChain = deployment && JSON.stringify(deployment.topology_template.node_templates.tic.attributes.service_urls[2])
    const blockChainLink = deployment && blockChain.substring(1, hyperLedger.length-1)

    function eraser() {
        setYesDisabler(true)
        initialiseIds()
        setMessage("Erased!")
        setTimeout(() => {
            toggleDialog()
            setYesDisabler(false)
            setMessage("")
        }, 3000) 
    }
    
    return (
        <div className='theBody'>
            <div className='deployed'>
                <h1>Find deployed topology template by ID</h1>
                <Button onClick={toggle} disabled={!deployment}>{show ? "Hide" : "Show"} links</Button>
                <Button onClick={findDeployed} disabled={!deployedToscaId}>Find deployed topology</Button>
                <Button onClick={toggleShow} disabled={!deployment}>{showDeployed ? "Hide" : "Show"} Deployment</Button>
                <Button onClick={deleteProvision} disabled={!provisionToscaTemplate}>Delete provisioned topology</Button>
                <Button onClick={findDeleted} disabled={!isDeleted}>Find deleted provision</Button>
                <Button onClick={toggleDeleted} disabled={!deleted}>{showDeleted ? "Hide" : "Show"} deleted provision</Button> 
                <h5 style={{display: isDeleted ? "block" : "none", marginBottom: "40px"}}><CopyToClipboard name="Deleted ID" inputValue={isDeleted}/></h5>
            {
                isLoading 
                && 
                <h3>
                   Just a moment please! The request is beeing processed in the server.
                   <Loader
                    type="Watch"
                    color="#08335e"
                    height={100}
                    width={100}
                    /> 
                </h3>
                 
            }
            {
                !show 
                && 
                <div>
                    <Header as="a" href={hyperLedgerLink} icon>
                        <Icon>
                        <img src="https://www.gemsdigitalmedia.com/wp-content/uploads/2019/01/Hyperledger-icon.png" alt="HyperLedger" height="100" width="100"/>
                        </Icon>
                        HyperLedger explorer
                        <Header.Subheader>
                        Click this icont to go to hyperledger explorer
                        </Header.Subheader>
                    </Header><i className="ri-arrow-right-circle-fill ri-fw ri-3x"></i>
                    <Header as="a" href={portainerLink} icon>
                        <Icon>
                        <img src="https://avatars2.githubusercontent.com/u/22225832?s=280&v=4" alt="portainer" height="100" width="100"/>
                        </Icon>
                        Portainer
                        <Header.Subheader>
                        Click this icont to go to portainer
                        </Header.Subheader>
                    </Header><i className="ri-arrow-right-circle-fill ri-fw ri-3x"></i>
                    <Header as="a" href={blockChainLink} icon>
                        <Icon>
                            <img src="https://www.uokpl.rs/fpng/f/29-292865_black-blockchain-icon.png" alt="blockchain" height="100" width="100"/>
                        </Icon>
                        BlockChain explorer
                        <Header.Subheader>
                        Click this icont to go to blockchain explorer
                        </Header.Subheader>
                    </Header><i className="ri-arrow-right-circle-fill ri-fw ri-3x"></i>
                    <Header as="a" href={blockChainLink} icon>
                        <Icon name="bitcoin" height="100" width="100" />
                        Token bank
                        <Header.Subheader>
                        Click this icont to go to token bank sample app
                        </Header.Subheader>
                    </Header>
                </div> 
            }
            <div className="login-form">
                <div style={{display: !plannedToscaTemplate ? "block" : "none"}}>
                    <Form onSubmit={e => setPlanId(planerId)}>
                        <Form.Field>
                            <label style={{textAlign: "start"}}>Enter planned ID here</label>
                            <Input action={<Button type="submit">SET PLAN ID</Button>} placeholder="Plan ID" onChange={e => setPlanerId(e.target.value)}/>
                        </Form.Field>
                    </Form>
                </div>
                <div style={{display: !provisionToscaTemplate ? "block" : "none"}}>
                    <Form onSubmit={e => setProvisionId(provisionerId)}>
                            <Form.Field>
                                <label style={{textAlign: "start"}}>Enter provision ID here</label>
                                <Input action={<Button type="submit">SET PROVISION ID</Button>} placeholder="Provision ID" onChange={e => setProvisionerId(e.target.value)}/>
                            </Form.Field>
                        </Form>  
                </div>
                <div style={{display: !deployedToscaId ? "block" : "none"}}>
                    <Form onSubmit={e => setDeploymentId(deployerId)}>
                        <Form.Field>
                            <label style={{textAlign: "start"}}>Enter deployment ID here</label>
                            <Input action={<Button type="submit">SET DEPLOYMENT ID</Button>} placeholder="Deployment ID" onChange={e => setDeployerId(e.target.value)}/>
                        </Form.Field>
                    </Form>
                </div>
                <div style={{display : !isDeleted ? "block" : "none"}}>
                    <Form onSubmit={e => setDeletedId(deleterId)}>
                        <Form.Field>
                            <label style={{textAlign: "start"}}>Enter deleted ID here</label>
                            <Input action={<Button type="submit">SET DELETED ID</Button>} placeholder="Deleted ID" onChange={e => setDeleterId(e.target.value)}/>
                        </Form.Field>
                    </Form>
                </div>          
            </div>        
            {
                showDeployed
                &&
                <h5 style={{textAlign: "start"}}>Deployment: <JSONPretty json={deployment}/></h5>
            }
            {
                showDeleted
                &&
                <h5 style={{textAlign: "start"}}>Deleted provision: <JSONPretty json={deleted}/></h5>
            }
            <br />
            <Button icon labelPosition="left" color="red" onClick={toggleDialog} disabled={yesDisabler}><Icon name="cancel"/>Initialize all ID's</Button>
            {
                showDialog
                &&
                <div>
                    <h3>Are you sure you want to erase all your ID's that you have obtained or entered?</h3>
                    <Button onClick={eraser} disabled={yesDisabler}>Yes</Button><Button onClick={toggleDialog} disabled={yesDisabler}>No</Button>
                    <p>{message}</p>
                </div>
            }
            </div>           
        </div>
    )
}

export default Deployed