import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import {ContextProvider} from "../Context"
import { act } from 'react-dom/test-utils'
// import { signInWithEmailAndPassword, signOutFirebase, init, isAuthenticated, getIdToken } from '../firebase'

import app from '../firebase'


import Login from './Login'

describe('Login render page', ()=> {
    it('renders the login page', ()=> {
        const {getByText} = render(
            <ContextProvider> 
                <Router>
                    <Login/>
                </Router>
            </ContextProvider> );
        expect(getByText(/Log in page/i)).toBeInTheDocument();
    })

    it('render 2 input components', () => {
        const {getByLabelText} = render(
            <ContextProvider> 
                <Router>
                    <Login/>
                </Router>
            </ContextProvider> );
        expect(getByLabelText(/email/i)).toBeInTheDocument();
        expect(getByLabelText(/password/i)).toBeInTheDocument();
      });
    
    it('render a submit button', () => {
        const {queryByTitle} = render(
            <ContextProvider> 
                <Router>
                    <Login/>
                </Router>
            </ContextProvider> );
        const loginBtn = queryByTitle('loginButton')
        expect(loginBtn).toBeTruthy();
    });

    // it('validate user inputs, and provides error messages', async () => {
    //     const { queryByTitle, getByText } = render(
    //         <ContextProvider> 
    //             <Router>
    //                 <Login/>
    //             </Router>
    //         </ContextProvider> )
    
    //     await act (async () => {
    //       fireEvent.change(screen.getByLabelText(/email/i), {
    //         target: {value: ''},
    //       });
    
    //       fireEvent.change(screen.getByLabelText(/password/i), {
    //         target: {value: ''},
    //       })
    //     });
    
    //     await act (async () => {
    //         const submitLogin = queryByTitle('loginForm')
    //         fireEvent.submit(submitLogin)
    //     });

    //     const erroMessage = queryByTitle('errorMsg')

    //     expect(erroMessage).toBeInTheDocument();
    //   });
})

// describe('Firebase util test suite', () => {
//     beforeAll(async () => {
//         jest.setTimeout(10000)
//         await init()
//     })

//     beforeEach(async () => {
//         await app.signOutFirebase()
//     })
// })



describe('Authentication unit testing', () => {
    
    it('singInWithEmailAndPassword should throw error with wrong credentials', async () => {
        let error = ''
        try {
            await app
            .auth()
            .signInWithEmailAndPassword('random-email@nowhere.com', 'notRealPWD');
        } catch (err) {
            error = err.toString()
        }
        expect(error).toBeTruthy()
    })
    
    it('singInWithEmailAndPassword should pass with correct credentials', async () => {
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
        user = await app.auth().signOut()
        expect(isAuthenticated()).toBe(false)
    })

})