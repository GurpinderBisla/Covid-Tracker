import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CanadaProvincial from "./CanadaProvincial.js";
import DataCard from "./DataCard";
import BarGraph from "./BarGraph";

describe("CanadaProvincial", () => {
  it("should display cumulative cases", async () => {
    render(
      <MemoryRouter>
        <CanadaProvincial />
      </MemoryRouter>
    );
    const casesElement = await screen.getByTestId("Cases");
    expect(casesElement).toBeInTheDocument();
  });
});

//Feature 1: Data card
describe('CanadaProvincial',()=>{
  it("should render the data cards", async ()=>{
    <MemoryRouter>
    render(<CanadaProvincial/>)
    </MemoryRouter>

    expect(await screen.findByTitle("cardData"));
  })
})

//Feature 2: Bar chart
describe('CanadaProvincial',()=>{
  it("should render the bar chart", async ()=>{
    <MemoryRouter>
    render(<CanadaProvincial/>)
    </MemoryRouter>

    expect(await screen.findByTitle("BarGraph"));
  })
})

//Feature 3: Map
describe('CanadaProvincial',()=>{
  it("should render the map", async ()=>{
    <MemoryRouter>
    render(<CanadaProvincial/>)
    </MemoryRouter>

    expect(await screen.findByTitle("Map"));
  })
})