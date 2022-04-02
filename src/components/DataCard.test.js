import {render,screen, fireEvent, waitFor} from '@testing-library/react';
import { MemoryRouter } from "react-router";
import DataCard from './DatCard.js';

describe("DataCard", () => {
    it("Display covid stats when the website is first loaded", async () => {
      render(
        <MemoryRouter>
          <DataCard />
        </MemoryRouter>
      );
      fireEvent.mouseOver(await screen.getByRole("DataGraph"));
      await waitFor(() => screen.getByText("data"));
      expect(data).toBeDefined();
    });
  });