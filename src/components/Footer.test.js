import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render, fireEvent } from "@testing-library/react";

import Footer from "./Footer";

it("works", () => {
    const { queryByTitle } = render(<Router><Footer /></Router>);
    const eu = queryByTitle("footer");
    expect(eu).toBeTruthy();
})