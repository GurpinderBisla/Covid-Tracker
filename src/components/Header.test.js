import { fireEvent, render, screen } from "@testing-library/react";
import Header from "./Header.js";
import { MemoryRouter as Router } from 'react-router-dom';

test('clicking on the website logo should take user back to the Welcome page',()=>{
    render(<Router>
        <Header />
        </Router>)
    fireEvent.click(screen.getByTestId('logo'));
    expect(screen.getByTestId('welcome-page')).toBeInTheDocument();
});