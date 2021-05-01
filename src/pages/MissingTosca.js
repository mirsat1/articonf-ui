import React from 'react'
import { Link } from 'react-router-dom'

export default function MissingTosca() {
    return (
        <div className="theBody">
            <h1>It seems that you are missing a TOSCA template!</h1>
            <p>In order to get one please go to the <Link to="/beta/testing/dashboard">advanced configuration</Link> tab and get one.</p>
            <p>You have two options of getting the TOSCA template:</p>
            <ol>
                <li>Default TOSCA template</li>
                <li>Template that you will configure by your own. Or upload a file with your own template</li>
            </ol>
            <p>For the default template, you only need to go to the <Link to="/beta/testing/dashboard">advanced configuration </Link> 
            tab, and first press the button that states "Configure TIC". This button will navigate you to a page where you can do some tweking to
            the TIC tool, but initialy, when you appear here first a pop up will appear telling you that you miss a TIC configuration and asking
            you if you want to keep a default one. Press "Keep default configuration" in oreder to save a default configuration to our database.
            You can change this configuration anytime before you plan a topology template.</p>
            <p>After you got a default TIC configuration, next thing you need to do is the same, the only difference now you need to do is to press 
            the button "Configure TOSCA" at the <Link to="/beta/testing/dashboard">advanced configuration </Link> tab. Same like before, this button will navigate you to another page, with a popup telling you that you are 
            missing a TOSCA configuration. Press "Keep default configuration" to save a default configuration to our database. Also with this 
            configuration you can change whatever you want until you plan a topology template</p>
        </div>
    )
}