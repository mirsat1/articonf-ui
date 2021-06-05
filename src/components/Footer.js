import React from "react"
import flag from "../eu-flag.jpg"
import { Grid } from 'semantic-ui-react'
// import logo from "../articonf-logo.jpg"

function Footer() {
    return (
        <footer className="footer" title="footer">
            <Grid>
                <Grid.Column floated='left' width={3}>
                    <img title="euFlag" className="footerImg" src={flag} alt="Flag"/>
                </Grid.Column>
                <Grid.Column width={6}>
                    <p className="footerP"><strong>This project has received funding from the European Union’s Horizon 2020 research 
                    and innovation programme under grant agreement No 825134, the ARTICONF Project.</strong></p>
                </Grid.Column>
                <Grid.Column floated='right' width={3}>
                    <div>
                        <p>Follow us on Twitter: 
                            <a style={{color: "#00acee"}} href="https://twitter.com/articonf/"><i className="ri-twitter-fill"></i></a>
                        </p>
                        <p>Subscribe on YouTube: 
                            <a style={{color: "#FF0000"}} href="https://www.youtube.com/channel/UCPvfXuOgmtrq8psLQb9yFVA"><i className="ri-youtube-fill"></i></a>
                        </p>
                        <p>Visit our page for more details about us: <a href={"https://articonf.eu/"}><img src="https://i.imgur.com/tgkmCTc.png" alt="articonflogo" /></a></p>
                    </div>
                </Grid.Column>
            </Grid>
        </footer>
    )
}

export default Footer