/*eslint-disable*/
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

// Mock MapView to isolate App tests
jest.mock("./components/MapView", () => () => <div data-testid="map-view">Mocked MapView</div>);

// Mock CSS import to avoid issues during test runs
jest.mock("./App.css", () => ({}));

describe("App Component", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("renders the main title", () => {
    const headerTitle = screen.getByText(/Vehicle Movement Simulator/i);
    expect(headerTitle).toBeInTheDocument();
  });

  test("renders the MapView component inside main section", () => {
    const mapView = screen.getByTestId("map-view");
    expect(mapView).toBeInTheDocument();
    expect(mapView).toHaveTextContent("Mocked MapView");
  });

  test("renders the footer with copyright", () => {
    const footerText = screen.getByText(/© 2025 Vehicle Map Simulation/i);
    expect(footerText).toBeInTheDocument();
  });

  test("renders header, main, and footer containers", () => {
    const header = document.querySelector(".app-header");
    const main = document.querySelector(".app-main");
    const footer = document.querySelector(".app-footer");

    expect(header).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });

  test("renders the root div with correct class", () => {
    const rootDiv = document.querySelector(".app-root");
    expect(rootDiv).toBeInTheDocument();
  });
});
