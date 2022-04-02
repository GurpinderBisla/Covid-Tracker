import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import GlobalCountry from "./GlobalCountry.js";

describe("GlobalCountry", () => {
  it("should display cumulative cases", async () => {
    render(
      <MemoryRouter>
        <GlobalCountry />
      </MemoryRouter>
    );
    const casesElement = await screen.getByTestId("Cases");
    expect(casesElement).toBeInTheDocument();
  });
});

//Feature 1: Data card
describe('GlobalCountry',()=>{
    it("should render the data cards", async ()=>{
      <MemoryRouter>
      render(<GlobalCountry/>)
      </MemoryRouter>
  
      expect(await screen.findByTitle("cardData"));
    })
  })

//Feature 2: Map
describe('GlobalCountry',()=>{
    it("should render the map", async ()=>{
      <MemoryRouter>
      render(<GlobalCountry/>)
      </MemoryRouter>
  
      expect(await screen.findByTitle("Map"));
    })
  })