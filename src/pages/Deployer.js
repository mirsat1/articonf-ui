import React, { useContext } from 'react'
import { Context } from '../Context'

import MissingTosca from './MissingTosca'
import Deployment from './Deployment'
import NotProvider from '../components/NotProvider'

export default function Deployer() {
    const { id, role } = useContext(Context)
    const UCProvider = role === "UCprovider1" || role === "UCprovider2" || role === "UCprovider3" || role === "UCprovider4"
    return (
        !UCProvider ?
        <NotProvider /> :
        <div>
            {
                id ? <Deployment /> : <MissingTosca />
            }
        </div>
    )
}