import {render,screen, fireEvent, waitFor} from '@testing-library/react';
import Map from './Map.js';

describe("Map", ()=>{
    it('Display actives cases when hovering over provinces in map', async ()=>{
        render(<Map/>);
        fireEvent.mouseOver(screen.getByTestId('map'));
        await waitFor(()=>screen.getByText('data'))
        expect(data).toBeDefined('data');
    });
})