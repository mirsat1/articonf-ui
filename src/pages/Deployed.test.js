import React from 'react'
import { render, queryByTestId, fireEvent } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import {ContextProvider} from "../Context"

import Deployed from './Deployed'

describe('Unit testing the find deployed topology template', () => {

//     it('does not render the instructions initially', () => {
//         const { queryByTestId } = render(<ContextProvider><Router><Deployed /></Router></ContextProvider>)
//         expect(queryByTestId('instructionsInFindDpl').innerHTML).toBe('Litle fucker')
//     })

    it('does render the instructions initially', () => {
        const { queryByTestId } = render(<ContextProvider><Router><Deployed /></Router></ContextProvider>)
        const topoTemplate = queryByTestId('links')
        const instructionsButton = queryByTestId('instructionsBtn')
        fireEvent.click(instructionsButton)
        expect(topoTemplate).not.toBeTruthy()
    })

})