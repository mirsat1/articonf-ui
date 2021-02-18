import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, fireEvent } from "@testing-library/react";
import { act } from 'react-dom/test-utils'
import {ContextProvider} from "../Context"

import App from "../App";

it("navigates contact form when you click the contact us in header", async () => {
    const { queryByTitle } = render(
        <ContextProvider>
            <MemoryRouter initialEntries={['/login']}>
                <App />
            </MemoryRouter>
        </ContextProvider>
    );
    act(() => {
        const goToContactForm = queryByTitle('contactUs')
        fireEvent.click(goToContactForm)
    });
    const pageTitle = queryByTitle('contactUsTitle')
    expect(pageTitle.innerHTML).toBe('Contact us by filling out the form below.');
})

it("does not navigate to home page when you click home but to login page because of authentication system", async () => {
    const { queryByTitle } = render(
        <ContextProvider>
            <MemoryRouter initialEntries={['/login']}>
                <App />
            </MemoryRouter>
        </ContextProvider>
    );
    act(() => {
        const goToHomePage = queryByTitle('navHome')
        fireEvent.click(goToHomePage)
    });
    const loginPageGreetings = queryByTitle('loginPageTitle')
    expect(loginPageGreetings.innerHTML).toBe('Log in page');
})