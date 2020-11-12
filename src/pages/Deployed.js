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
    
    const [showDeployed, toggleShow] = useToggler()
    const [showDeleted, toggleDeleted] = useToggler()
    const [showDialog, toggleDialog] = useToggler()
    const [deleteDialog, toggleDeleteDialog] = useToggler()
    const [instuctions, toggleInstructions] = useToggler()
    const [showVid, toggleShowVid] = useToggler()
    const [planerId, setPlanerId] = useState()
    const [provisionerId, setProvisionerId] = useState()
    const [deployerId, setDeployerId] = useState()
    const [deleterId, setDeleterId] = useState()
    const [message, setMessage] = useState("")
    const [yesDisabler, setYesDisabler] = useState(false)


    //<JSONPretty json={deployment.topology_template.node_templates.tic.attributes.service_urls}/>
    const ip_addr = deployment && JSON.stringify(deployment.topology_template.node_templates.compute.attributes.public_ip)
    const hyperLedgerLink = deployment && "http://" + ip_addr.substring(1, ip_addr.length-1) + ":8090"
    const portainerLink = deployment && "http://" + ip_addr.substring(1, ip_addr.length-1) + ":9000"
    const blockChainLink = deployment && "http://" + ip_addr.substring(1, ip_addr.length-1) + ":9090"
    const tokenBank = deployment && "http://" + ip_addr.substring(1, ip_addr.length-1) + ":3000"
    console.log(ip_addr)
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
            <h1 style={{textAlign: "center"}}>Find deployed topology template by ID</h1>
            <div style={{display: instuctions ? "block" : "none"}}>
               <a style={{fontSize: "1.2em"}} href="https://youtu.be/gdBDajWyUFY" target="_blank" rel="noopener noreferrer">Check out this video tutorial</a>
               <p><strong>Instructions: </strong>After you have deployed ARTICONF platform and got all the ID's or you had them 
               prevously and insrted them trough the form bellow, now you have to click the "Find deployed topology". If everything goes well this button should show 4 icons:<br />
               <strong>Hyperledger Explorer (Blockchain explorer):</strong><br />
               The Hyperledger Explorer service provides visualisations of blockchain metrics like the number of participating nodes, transactions, blocks and chaincodes. 
               The Hyperledger explorer provides an interactive visualisation interface for the deployed blockchain network and is used for both monitoring and verification 
               of the deployed blockchain network.  The Hyperledger explorer service can be accessed via the
               credentials and ports, configured by the DApp explorer or DApp developer during the deployment process. The default credentials for the hyperledger explorer 
               are as follows:<br />
               <ul>
                   <li><strong>port_number: 8090</strong></li>
                   <li>user_name: admin</li>
                   <li>password: adminpw</li>
               </ul><br />
               <p>Video example:<Button onClick={toggleShowVid}>Show Example</Button><br /> <span style={{display: showVid ? "block" : "none"}}><video src={process.env.PUBLIC_URL + "/videos/explorer_transactions_with_comments.mp4"} controls={true} playsInline width="100%"/></span></p>
               <strong>Portainer (Docker Network Management and Monitoring):</strong><br />
               The network management microservice Portainer provides a dynamic overview of all the microservices of the deployed network.  It is useful in monitoring the 
               health of the various microservices deployed. Furthermore, it also provides facilities to dynamically update specific microservices, based upon the business 
               requirements. This is particularly useful in fine‐tuning the microservices (scale up/down) parameters to achieve better performance from the network. This 
               service is accessed by the DApp explorer or DApp developer through the configured port number. The default credentials for the portainer are as follows:<br />
               <ul>
                   <li>port_number: 9000</li>
                   <ol>
                       <li><strong>Create a admin account (Remember the admin username and password for future logins)</strong><br />
                       <img src={process.env.PUBLIC_URL + "/images/portainerlogin.png"} alt="Portainer Login"/>
                       </li>
                       <li><strong> In the next page, click "agent(Connect to a portainer agent tab)"</strong> and configure agent as follows :<br />
                        <ol>
                            <li><strong>agent name: </strong> "agent"</li>
                            <li><strong>end point url:</strong> "tasks.portainer_agent:9001"</li>
                            <li>Click connect</li>
                        </ol>
                       <img src={process.env.PUBLIC_URL + "/images/portaineragent.png"} alt="Portainer Dashboard"/>
                       </li>
                       <li><strong>In the next page, click the agent and now all the services can accessed and monitored.</strong><br />
                       <img src={process.env.PUBLIC_URL + "/images/exploreragent.png"} alt="Portainer Login"/>
                       </li>
                   </ol>
                </ul><br />
                <strong>Docker Swarm Visualizer.</strong><br />
                <strong>Swarm Visualizer</strong> is a fancy tool which visualized the Swarm Cluster setup. It displays containers running on each node in the form of visuals.<br />
                <strong>Bank App</strong><br />
                The Articonf bank app is a simple application to demonstrate the interaction of a web application with the deployed blockchain network with a sample smart contract.
                This application showcases a simple peer to peer money transfer scenario in a bank.
                For  demo purpose,  the bank smart contract is automatically installed along with the deployment process. <strong>The bank smart contract contains two default user 
                assets "demo1" and "demo2" with balance of 1000 each for demo purposes.</strong> New asset will be created for each new user whenever they register.<br />
                <strong>When</strong><br />
                <ol>
                    <li>In login Page, Click Register link and register a new user
                        <ul>
                            <li><strong>Note: </strong>When you register a user, a user asset will be created in blockchain with a default balance of 100.</li>
                            <li>This can be visualised through the hyperledger explorer transaction count, block count increase.</li>
                        </ul>
                    </li>
                    <li>In login Page, Login using the registered credentials.</li>
                </ol><br />
                <strong>Functionalities</strong><br />
                <ul>
                    <li><strong>Get Balance: </strong>Select a user name from the drop down and click "Get Balance" button.</li>
                    <li><strong>Transfer Amount: </strong>
                        <ul>
                            <li>Select "From User" from drop down</li>
                            <li>Select "To User" from drop down</li>
                            <li>Enter Amount to transfe</li>
                            <li>Click Transfer<ul><li><strong>Note:</strong> The transaction is recoreded in blockchain which can be visualised  the hyperledger explorer transaction count, block count increase</li></ul></li>
                        </ul>
                    </li>
                    <li><strong>Query all Assets: </strong>
                        <ul>
                            <li>Click "Query all Assets" from the navbar menu.</li>
                            <li>Click Get all assets.</li>
                            <li>List of all user assets created in the bank smart contract will be retrieved</li>
                        </ul>
                    </li>
                    <li><strong>Query all Assets: </strong>
                        <ul>
                            <li>Click "Query all Assets" from the navbar menu.</li>
                            <li>Select a user name from the drop down.</li>
                            <li>Click "Get Asset History"</li>
                            <li>List of transaction history for the selected user will be retrieved.</li>
                        </ul>
                    </li>
                </ul>
               </p> 
            </div>
            <div className='deployed'>
                <Button onClick={toggleInstructions}>{!instuctions ? "Show" : "Hide"} Instructions</Button>
                <Button onClick={findDeployed} disabled={!deployedToscaId}>Find deployed topology</Button>
                <Button onClick={toggleShow} disabled={!deployment}>{showDeployed ? "Hide" : "Show"} Deployment</Button>
                <Button onClick={toggleDeleteDialog} disabled={!provisionToscaTemplate}>Delete provisioned topology</Button>
                <Button onClick={findDeleted} disabled={!isDeleted}>Find deleted provision</Button>
                <Button onClick={toggleDeleted} disabled={!deleted}>{showDeleted ? "Hide" : "Show"} deleted provision</Button> 
                <h5 style={{display: isDeleted ? "block" : "none", marginBottom: "40px"}}><CopyToClipboard name="Deleted ID" inputValue={isDeleted}/></h5>
                <h5 style={{display: !isDeleted ? "block" : "none" }}>{deleteDialog && <div><Button onClick={deleteProvision} disabled={isLoading}>Yes</Button> <Button onClick={toggleDeleteDialog} disabled={isLoading}>No</Button></div>}</h5>
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
                deployment 
                && 
                <div>
                    <Header as="a" href={hyperLedgerLink} target="_blank" icon>
                        <Icon>
                        <img src={process.env.PUBLIC_URL + "/images/Hyperledger.png"} alt="HyperLedger" height="100" width="100"/>
                        </Icon>
                        HyperLedger Explorer
                        <Header.Subheader style={{textAlign: "left"}}>
                        Click this icont to go to HyperLedger explorer.<br />
                        Hyperledger Explorer is a user-friendly<br />
                        Web application tool used to view, invoke, deploy<br /> 
                        or query blocks, transactions and associated data,<br /> 
                        network information (name, status, list of nodes),<br />
                        chain codes and transaction families, as well as any <br />
                        other relevant information stored in the ledger.
                        </Header.Subheader>
                    </Header>
                    {/* <i className="ri-arrow-right-circle-fill ri-fw ri-3x"></i> */}
                    <Header as="a" href={portainerLink} target="_blank" icon>
                        <Icon>
                        <img src={process.env.PUBLIC_URL + "/images/portainerimg.png"} alt="Portainer" height="100" width="100"/>
                        </Icon>
                        Portainer
                        <Header.Subheader style={{textAlign: "left", marginLeft: "1.5em"}}>
                        Click this icon to go to Portainer. <br />
                        Portainer makes managing containerized software <br />
                        environments quick and easy by giving users a <br />
                        simple 'click-to-configure' UI that anyone can learn
                        </Header.Subheader>
                    </Header>
                    {/* <i className="ri-arrow-right-circle-fill ri-fw ri-3x"></i> */}
                    <Header as="a" href={blockChainLink} target="_blank" icon>
                        <Icon>
                            <img src={process.env.PUBLIC_URL + "/images/docker.png"} alt="Docker Swarm" height="100" width="100"/>
                        </Icon>
                        Docker Swarm Visualizer
                        <Header.Subheader style={{textAlign: "left", marginLeft: "1.5em"}}>
                        Click this icon to go to Docker swarm visualizer. <br />
                        Docker swarm visualizer is a fancy tool which <br />
                        visualized the Swarm Cluster setup. It displays <br />
                        containers running on each node in the form of visuals.
                        </Header.Subheader>
                    </Header>
                    {/* <i className="ri-arrow-right-circle-fill ri-fw ri-3x"></i> */}
                    <Header as="a" href={tokenBank} target="_blank" icon>
                        <Icon>
                            <img src={process.env.PUBLIC_URL + "/images/bank.png"} alt="Token Bank" height="100" width="100"/>
                        </Icon>
                        Token Bank
                        <Header.Subheader style={{textAlign: "left", marginLeft: "1.5em"}}>
                        Click this icon to go to the sample app. <br />
                        The Articonf bank app is a simple application to <br />
                        demonstrate the interaction of a web application <br />
                        with the deployed blockchain network with a sample <br />
                        smart contract.
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