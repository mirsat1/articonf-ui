import React, { useContext } from 'react'
import { Context } from '../Context'

import MissingTosca from './MissingTosca'
import Deployment from './Deployment'

export default function Deployer() {
    const { id } = useContext(Context)
    return (
        <div>
            {
                id ? <Deployment /> : <MissingTosca />
            }
        </div>
    )
}