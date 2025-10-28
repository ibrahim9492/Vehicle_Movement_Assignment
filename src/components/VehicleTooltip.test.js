/*eslint-disable*/
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import VehicleTooltip from "./VehicleTooltip";

// Mock CSS import to avoid module resolution issues
jest.mock("../styles/VehicleTooltip.css", () => ({}));

describe("VehicleTooltip Component", () => {
  const props = {
    speed: 45.678,
    distance: 12.3456,
    batteryLife: 80,
    status: "Active",
  };

  test("renders header with WIRELESS and current date/time", () => {
    render(<VehicleTooltip {...props} />);

    // Check header text
    expect(screen.getByText(/WIRELESS/i)).toBeInTheDocument();

    // Check timestamp (dynamic, but should exist)
    const dateText = screen.getByText((content, element) => {
      return element.tagName.toLowerCase() === "span" && /\d{1,2}\/\d{1,2}\/\d{4}/.test(content);
    });
    expect(dateText).toBeInTheDocument();
  });

  test("displays formatted speed value correctly", () => {
    render(<VehicleTooltip {...props} />);
    expect(screen.getByText("45.68 km/h")).toBeInTheDocument();
    expect(screen.getByText("Speed")).toBeInTheDocument();
  });

  test("displays formatted distance value correctly", () => {
    render(<VehicleTooltip {...props} />);
    expect(screen.getByText("12.35 km")).toBeInTheDocument();
    expect(screen.getByText("Distance")).toBeInTheDocument();
  });

  test("renders battery percentage correctly", () => {
    render(<VehicleTooltip {...props} />);
    expect(screen.getByText("80%")).toBeInTheDocument();
    expect(screen.getByText("Battery")).toBeInTheDocument();
  });

  test("shows the vehicle status correctly", () => {
    render(<VehicleTooltip {...props} />);
    expect(screen.getByText("Status:")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

 
  test("has the correct structure of tooltip sections", () => {
    const { container } = render(<VehicleTooltip {...props} />);
    expect(container.querySelector(".vehicle-tooltip")).toBeInTheDocument();
    expect(container.querySelector(".tooltip-header")).toBeInTheDocument();
    expect(container.querySelector(".tooltip-content")).toBeInTheDocument();
    expect(container.querySelectorAll(".info-item").length).toBe(3);
  });
});
