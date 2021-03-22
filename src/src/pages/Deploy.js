import React from "react"
import {Link} from "react-router-dom"

function Deploy() {
    return (
        <div className="theBody">
            <h1>Here, with pressing one button you can deploy the ARTICONF platfrom.</h1><br />
            <h1>If you want to deploy our software please press the button bellow with name "Deploy"</h1>
            <Link to="/beta/testing/deploy/deployment">
                <button className="pure-button">Deploy</button>
            </Link>
        </div>
        
    )
}

export default Deploy