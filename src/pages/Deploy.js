import React from "react"
import { Link } from "react-router-dom"
import { Button, Header } from "semantic-ui-react"

function Deploy() {
    return (
        <div className="theBody">
            <h1>Please consider the following: </h1><br />
            <p>
                Please consider that this GUI is still in early development and there will be flaws, bugs and erros.
                So please, if you encounter any bug report it trough the "Contac Us" button above in the navigation bar.
                Also the ARTICONF platfrom is in early development, so there will be limitations.<br />
                If you want to deploy our software, the only thing you need to do for now is to press the "Deploy" button which
                is presented bellow.<br />
            </p>
            <Header as="h3">While using this demo, <em>please DO NOT leave or refresh this UI </em> 
            because you will lose all progress that you made so far. Thank you in advance</Header>
            <Link to="/beta/testing/deploy/deployment">
                <Button>Deploy</Button>
            </Link>
        </div>
        
    )
}

export default Deploy