import React, { useContext } from 'react'
import { Context } from '../Context'
import MonitoringServices from '../components/MonitoringServices'

export default function Monitoring() {
    const { role } = useContext(Context)
    const UCUser = role === "UCuser1" || role === "UCuser2" || role === "UCuser3" || role === "UCuser4"
    const UCProvider = role === "UCprovider1" || role === "UCprovider2" || role === "UCprovider3" || role === "UCprovider4"
    return (
        <div className="theBody">
            {UCUser && <iframe title="Crowd Journalism Sample Dashboard" src="http://15.237.93.29:8081/app/kibana#/dashboard/ccac05e0-b729-11eb-a973-9fcac1df1055?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-150y%2Cto%3Anow))" height="1000px" width="100%" frameBorder="0"></iframe>}
            {UCProvider && <MonitoringServices />}   
        </div>
    )
}