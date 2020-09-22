import React from "react"
import { Link } from "react-router-dom"
import { Button, Header, Icon } from "semantic-ui-react"

function Deploy() {
    return (
        <div className="theBody">
            <h1>Here, with just pressing one button you can deploy the ARTICONF platfrom.</h1><br />
            <p>
                Please consider that this GUI is still in early development and there will be flaws, bugs and erros.
                So please, if you encounter any bug report it trough the "Contac Us" button above in the navigation bar.
                Also the ARTICONF platfrom is in early development, so there will be limitations.<br />
                If you want to deploy our software, the only thing you need to do for now is to press the "Deploy" button which
                is presented bellow.<br /> When the button is pressed you will be redirected to another page. Follow the instructions
                presented there and you will be able to deploy and use our platfrom.
            </p>
            <Header as="h1">While in the process of deployment or the platfrom has been already been deployed, <em>please DO NOT leave or refresh this UI </em> 
            because you will lose all progress that you made so far. Thank you in advance <Icon name="smile outline" /></Header>
            <h3>If you want to deploy our software please press the button bellow with name "Deploy" and follow the steps to deploy the platfrom</h3>
            <Link to="/beta/testing/deploy/deployment">
                <Button>Deploy</Button>
            </Link>
        </div>
        
    )
}

export default Deploy