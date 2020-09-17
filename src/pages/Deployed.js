import React, { useContext, useEffect, useState } from "react"
import { Context } from "../Context"
import Loader from 'react-loader-spinner'
import JSONPretty from 'react-json-prettify'
import useToggler from "../hooks/useToggler"
import { Header, Icon, Button, Input, Form } from 'semantic-ui-react'
import { Link } from "react-router-dom"

function Deployed() {
    const {
        hasError, 
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
        deployedToscaId
    } = useContext(Context)
    console.log(deployment)
    const [show, toggle] = useToggler()
    const [planerId, setPlanerId] = useState()
    const [provisionerId, setProvisionerId] = useState()
    const [deployerId, setDeployerId] = useState()

    useEffect(() => {
        findDeployed()
        return () => !hasError
    }, [])


    //<JSONPretty json={deployment.topology_template.node_templates.tic.attributes.service_urls}/>
    const hyperLedger = deployment && JSON.stringify(deployment.topology_template.node_templates.tic.attributes.service_urls[0])
    const hyperLedgerLink = deployment && hyperLedger.substring(1, hyperLedger.length-1)
    const portainer = deployment && JSON.stringify(deployment.topology_template.node_templates.tic.attributes.service_urls[1])
    const portainerLink = deployment && portainer.substring(1, hyperLedger.length-1)
    const blockChain = deployment && JSON.stringify(deployment.topology_template.node_templates.tic.attributes.service_urls[2])
    const blockChainLink = deployment && blockChain.substring(1, hyperLedger.length-1)

    return (
        <div className='theBody'>
            <div className='deployed'>
                <h1>Find deployed topology template by ID</h1>
                <Button onClick={toggle} disabled={!deployment}>{show ? "Hide" : "Show"} links</Button>
                <Button onClick={findDeployed} disabled={!deployedToscaId}>Find deployed topology</Button>
                <Button onClick={deleteProvision} disabled={!provisionToscaTemplate}>Delete deployed topology</Button>
                
                
                
            {
                isLoading 
                && 
                <Loader
                    type="Watch"
                    color="#08335e"
                    height={100}
                    width={100}
                /> 
            }
            
            {
                show 
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
                    <Form onSubmit={async e => setDeploymentId(deployerId)}>
                        <Form.Field>
                            <label style={{textAlign: "start"}}>Enter deployment ID here</label>
                            <Input action={<Button type="submit">SET DEPLOYMENT ID</Button>} placeholder="Deployment ID" onChange={e => setDeployerId(e.target.value)}/>
                        </Form.Field>
                    </Form>
                </div>          
            </div>
            {
                hasError
                &&
                <h3 style={{textAlign: "justify"}}>Something went wrong, we are sorry about this! You probably are missing
                    the deployment ID. If you have previously obtained the ID's, please insert them above. And if you do not, please 
                    obtain them <Link to="/beta/testing/deploy/deployment">here</Link>.<br />
                    CAUTION: DO NOT enter false ID's beacause that will erase all your progress that you have made in the deployment so far
                </h3>

            }
            <h5 style={{display: deployment ? "block" : "none", marginBottom: "40px", textAlign: "left"}}>Deployment: <JSONPretty json={deployment}/></h5>
            <h5 style={{display: isDeleted ? "block" : "none", marginBottom: "40px"}}>Deleted ID: {isDeleted}</h5>
            <br />
            </div>           
        </div>
    )
}

export default Deployed