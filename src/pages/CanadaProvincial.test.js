import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CanadaProvincial from "./CanadaProvincial.js";

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