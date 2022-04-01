import {render,screen} from '@testing-library/react';
import CanadaProvincial from './CanadaProvincial.js';

describe("CanadaProvincial", ()=>{
    it('should display cumulative cases'), async ()=>{
        render(<CanadaProvincial/>);
        const casesElement = await screen.findByTestId("cases");
        expect(casesElement).toBeInTheDocument();
    }
})