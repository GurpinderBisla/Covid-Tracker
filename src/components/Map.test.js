import {render,screen, fireEvent, waitFor} from '@testing-library/react';
import Map from './Map.js';

describe("Map", ()=>{
    it('Display actives cases when hovering over princes'), async ()=>{
        render(<Map/>);
        fireEvent.mouseOver(screen.getByText('GeoChart'));
        await waitFor(()=>screen.getByText('data'))
        expect(data).toBeDefined();
    }
})