import {render,screen, fireEvent, waitFor} from '@testing-library/react';
import { MemoryRouter } from "react-router";
import BarGraph from './BarGraph.js';

describe("BarGraph", () => {
    it("Display cumulative cases when hovering over provinces", async () => {
      render(
        <MemoryRouter>
          <Bargraph />
        </MemoryRouter>
      );
      fireEvent.mouseOver(await screen.getByRole("BarGraph"));
      await waitFor(() => screen.getByText("data"));
      expect(data).toBeDefined();
    });
  });