import React from "react"
import { Link } from "react-router-dom"
import { Button } from "semantic-ui-react"

function Home() {
    return (
        <article className="theBody">
            <div>
            <section className='text-section'>
                <h1>Welcome to ARTICONF!</h1>
                <h3>Welcome to ARTICONF and thank you for using our platform. If you want to deploy our platfrom please go to <Link to="/beta/testing/deploy">deploy page</Link> and follow the instructions and steps presented there or watch our tutorial videos:<br />
                Part 1: <a href="https://youtu.be/3qbMak1kdLk" target="_blank" rel="noopener noreferrer">Introduction to ARTICONF and deploying the platform (using the CONF tool)</a><br />
                Part 2: <a href="https://youtu.be/laOXIJvC_nI" target="_blank" rel="noopener noreferrer">Interacting with the ARTICONF platform (using the TIC tool)</a>
                </h3>
                <h3>This application demonstrates the ARTICONF platform, which is a collection of 4 different tools:</h3>
                <ul>
                <li>CONF
                <p>Co-located and Orchestrated Network Fabric (CONF) provides adaptive infrastructure provisioning for social media applications over an orchestrated network. It seamlessly integrates with the Cloud edge infrastructure, able to intelligently provision services based on abstract application service requirements, operational conditions at infrastructure level, and time-critical event triggering. The distribution of the networked infrastructure provisioned by CONF receives information from the intelligent community analytics of SMART and TAC services, and supports them for a smooth and optimised operation.</p>
                </li>
                <li>TIC
                <p>Trust and Integration Controller (TIC) provides support for creating an open and agile decentralised social media interface using blockchain technology to simplify integration and federation of fragmented social media platforms with increased participants outreach. In coordination with SMART service, this allows customers, consumers, prosumers and businesses engage in a safe, transparent and trustful environment with monetisation opportunities.</p>
                </li>
                <li>SMART
                <p>Semantic Model with self-adaptive and Autonomous Relevant Technology (SMART) service provides an abstraction framework, capable of finding relevant interest group communities through graph anonymization techniques without violating users’ privacy and anonymity. The service adaptively responds to changes in the social media with the changing needs and requirements, and provides inputs to CONF. SMART researches decentralised decision making and reputation mechanisms together with TIC for solving disputes in collaborative models, preserving the trustful and autonomous users-centric environment.</p>
                </li>
                <li>TAC
                <p>Tools for Analytics and Cognition (TAC) provides guided analytics by coupling with inputs from TIC to social media consumer, prosumers and businesses, aggregating contextualised data over spatial-temporal boundaries based on socio-cultural abstraction and extracting knowledge. Its goal is to provide automated cognitive learning to predict user engagement with inputs from TIC, CONF and SMART, and evaluate the risk quantification for all participants to enable, track and control the ROI for each participant.</p>
                </li>
                </ul>
                <Link to="/beta/testing/deploy" style={{textAlign: "center"}}><Button>Deploy</Button></Link>
            </section>
            </div>
        </article>
    )
}

export default Home