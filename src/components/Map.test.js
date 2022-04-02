import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Map from "./Map.js";

describe("Map", () => {
  it("Display actives cases when hovering over princes", async () => {
    render(
      <MemoryRouter>
        <Map />
      </MemoryRouter>
    );
    fireEvent.mouseOver(await screen.getByRole("Chart"));
    await waitFor(() => screen.getByText("data"));
    expect(data).toBeDefined();
  });
});
