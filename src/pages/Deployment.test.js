import React from 'react'
import { render, queryByTestId } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import {ContextProvider} from "../Context"

import Deployment from './Deployment'

describe('Unit testing the deployment page', () => {

    it('does not renders the bottom text in the page initially', () => {
        const { queryByTestId } = render(<ContextProvider><Router><Deployment /></Router></ContextProvider>)
        const topoTemplate = queryByTestId('innerText')
        expect(topoTemplate.innerHTML).not.toBeTruthy()
    })

    it('renders the informativ text in the page initially', () => {
        const { queryByTestId } = render(<ContextProvider><Router><Deployment /></Router></ContextProvider>)
        const topoTemplate = queryByTestId('instructionsID')
        expect(topoTemplate.innerHTML).toBeTruthy()
    })

    it('Plan button is not disabled initially', () => {
        const { queryByTestId } = render(<ContextProvider><Router><Deployment /></Router></ContextProvider>)
        const topoTemplate = queryByTestId('planBtnDplPg')
        expect(topoTemplate).not.toBeDisabled()
    })

    it('Provision button is disabled initially', () => {
        const { queryByTestId } = render(<ContextProvider><Router><Deployment /></Router></ContextProvider>)
        const topoTemplate = queryByTestId('provBtnDplPg')
        expect(topoTemplate).toBeDisabled()
    })

    it('Deploy button is disabled initially', () => {
        const { queryByTestId } = render(<ContextProvider><Router><Deployment /></Router></ContextProvider>)
        const topoTemplate = queryByTestId('deployBtnDplPg')
        expect(topoTemplate).toBeDisabled()
    })

})