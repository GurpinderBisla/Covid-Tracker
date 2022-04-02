import { fireEvent, render, screen } from "@testing-library/react";
import Welcome from "./Welcome";
import { MemoryRouter as Router } from 'react-router-dom';
import CanadaProvincial from './CanadaProvincial.js';

test('clicking on Canadian stats takes users to Canada provincial page',()=>{
    render(<Router>
        <Welcome />
        </Router>)
    fireEvent.click(screen.getByRole('button',{name:/Canadian Stats/i}));
    expect(screen.getByText('Canadian Stats')).toBeInTheDocument();
});

test('clicking on global stats takes users to global country stats page',()=>{
    render(<Router>
        <Welcome />
        </Router>)
    fireEvent.click(screen.getByRole('button',{name:/Global Stats/i}));
    expect(screen.getByText('Global Status')).toBeInTheDocument();
});