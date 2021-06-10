import React, { useContext } from "react"
import { Context } from '../Context'
import { Link } from "react-router-dom"
import { Button, Header } from "semantic-ui-react"
import NotProvider from "../components/NotProvider"

function Deploy() {
    const { role } = useContext(Context)
    const UCProvider = (RegExp("UCprovider").test(role))
    return (
        !UCProvider ?
        <NotProvider /> :
        <div className="theBody">
            <h1 title="deployPage">Please consider the following: </h1><br />
            <p data-testid="paragraphInDeploy">
                Please consider that this GUI is still in early development and there might be some flaws, bugs and erros.
                So please, if you encounter any bug report it trough the "Contact Us" button above in the navigation bar.
                Also the ARTICONF toolset is in early development, so currently, the environment has some limitations.<br />
                If you want to deploy our software, the only thing you need to do for now is to press the "Deploy" button which
                is presented bellow.<br />
            </p>
            <Header as="h3" data-testid="warningMsg">While using this demo, <em>please DO NOT leave or refresh this UI </em> 
            otherwise you will lose the progress you made so far. Thank you in advance</Header>
            <Link to="/beta/testing/deploy/deployment">
                <Button data-testid="deployBtnDeployPg">Deploy</Button>
            </Link>
        </div>
    )
}

export default Deploy