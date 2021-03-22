import React from 'react'
import { render, queryByTestId } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import {ContextProvider} from "../Context"

import Dashboard from './Dashboard'

describe('Unit testing the advanced configuration page', () => {

    it('renders the advanced configuration page', () => {
        const { queryByTestId } = render(<ContextProvider><Router><Dashboard /></Router></ContextProvider>)
        const topoTemplate = queryByTestId('dashPage')
        expect(topoTemplate).toBeTruthy()
    })

    it('does not renders the topology template information initialy', () => {
        const { queryByTestId } = render(<ContextProvider><Router><Dashboard /></Router></ContextProvider>)
        const topoTemplate = queryByTestId('topoTemplateID')
        expect(topoTemplate.innerHTML).toBe('Topology template: <pre style=\"overflow: auto; background-color: rgb(39, 40, 34);\"><span style=\"color: rgb(201, 70, 56);\">null</span></pre>')
    })

    it('does not renders the planned topology template information initialy', () => {
        const { queryByTestId } = render(<ContextProvider><Router><Dashboard /></Router></ContextProvider>)
        const planTopoTemplate = queryByTestId('planTopoTemplateID')
        expect(planTopoTemplate.innerHTML).toBe('Planned topology template: <pre style=\"overflow: auto; background-color: rgb(39, 40, 34);\"><span style=\"color: rgb(201, 70, 56);\">null</span></pre>')
    })

    it('does not renders the provisioned topology template information initialy', () => {
        const { queryByTestId } = render(<ContextProvider><Router><Dashboard /></Router></ContextProvider>)
        const provTopoTemplate = queryByTestId('provTopoTemplateID')
        expect(provTopoTemplate.innerHTML).toBe('Provisioned topology template: <pre style=\"overflow: auto; background-color: rgb(39, 40, 34);\"><span style=\"color: rgb(201, 70, 56);\">null</span></pre>')
    })

    it('does not renders the deleted provisioned topology template information initialy', () => {
        const { queryByTestId } = render(<ContextProvider><Router><Dashboard /></Router></ContextProvider>)
        const delProvTopoTemplate = queryByTestId('deletedProv')
        expect(delProvTopoTemplate.innerHTML).toBe('Provisioned topology template: <pre style=\"overflow: auto; background-color: rgb(39, 40, 34);\"><span style=\"color: rgb(201, 70, 56);\">null</span></pre>')
    })

})