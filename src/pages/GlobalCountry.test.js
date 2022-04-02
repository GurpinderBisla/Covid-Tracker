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