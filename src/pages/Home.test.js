import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import {ContextProvider} from "../Context"
import { render, fireEvent } from "@testing-library/react";
import app from '../firebase'

import Home from "./Home";
import App from '../App'

describe('Unit testing the home page', () => {
    
    it('renders the text section', () => {
        const { queryByTitle } = render(<Router><Home /></Router>)
        const text = queryByTitle('homePageTextSection')
        expect(text).toBeTruthy()
    })
    
    it("renders the button", () => {
        const { queryByTitle } = render(<Router><Home /></Router>);
        const btn = queryByTitle("homeDeployBtn");
        expect(btn).toBeTruthy();
    })

    it('navigates to deploy instruction page', async () => {
        const { queryByTitle, getByText } = render(
            <ContextProvider>
                <Router>
                    <App />
                </Router>
            </ContextProvider>
        )
        await app.auth().signInWithEmailAndPassword('mirsat1994@gmail.com', 'mirsat123')
        const goToDeployPageBtn = queryByTitle('homeDeployBtn')
        fireEvent.click(goToDeployPageBtn)  
        expect(getByText(/Please consider the following/i)).toBeInTheDocument()  
    })
})
