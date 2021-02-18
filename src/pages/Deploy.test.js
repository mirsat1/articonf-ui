import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import {ContextProvider} from "../Context"
import { render, fireEvent, queryByTitle } from "@testing-library/react";
import app from '../firebase'

import Deploy from "./Deploy";
import App from '../App'

describe('Unit testing the deploy page', () => {
    
    it('Renders the title of the page', () => {
        const { queryByTitle } = render(<Router><Deploy /></Router>)
        const text = queryByTitle('deployPage')
        expect(text.innerHTML).toBe('Please consider the following: ')
    })

    it('Renders the paragraph', () => {
        const { queryByTestId } = render(<Router><Deploy /></Router>)
        const text = queryByTestId('paragraphInDeploy')
        expect(text).toBeTruthy()
    })

    it('Renders the warrning message', () => {
        const { queryByTestId } = render(<Router><Deploy /></Router>)
        const text = queryByTestId('warningMsg')
        expect(text).toBeTruthy()
    })

    it('navigates to deployment page', async () => {
        const { queryByTestId, getByText } = render(
            <ContextProvider>
                <Router>
                    <App />
                    <Deploy />
                </Router>
            </ContextProvider>
        )
        let user = await app.auth().signInWithEmailAndPassword('mirsat1994@gmail.com', 'mirsat123')
        function isAuthenticated() {
            let authenticated = false
            if (user != null) {
                authenticated = true
            } else {
                authenticated = false
            }
            return authenticated
        }
        expect(user.user).toBeTruthy()
        expect(isAuthenticated()).toBe(true)
        const goToDeployPageBtn = queryByTestId('deployBtnDeployPg')
        fireEvent.click(goToDeployPageBtn)  
        expect(getByText(/Instructions how to deploy the platform and the application:/i)).toBeInTheDocument()
        user = await app.auth().signOut()
        expect(isAuthenticated()).toBe(false)
    })
})