import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MapView from "./MapView";

// Mock CSS imports (to avoid module errors)
jest.mock("../styles/MapView.css", () => ({}));
jest.mock("../styles/ConfigureCard.css", () => ({}));

// Mock child components
jest.mock("./ConfigureCard", () => () => (
  <div data-testid="configure-card">ConfigureCard</div>
));
jest.mock("./VehicleTooltip", () => (props) => (
  <div data-testid="vehicle-tooltip">
    VehicleTooltip - Speed: {props.speed} - Distance: {props.distance}
  </div>
));

// ✅ Mock react-leaflet and leaflet properly
const mockPanTo = jest.fn();
jest.mock("react-leaflet", () => ({
  MapContainer: ({ children }) => (
    <div data-testid="map-container">{children}</div>
  ),
  TileLayer: () => <div data-testid="tile-layer"></div>,
  Polyline: () => <div data-testid="polyline"></div>,
  Marker: ({ children }) => <div data-testid="marker">{children}</div>,
  Popup: ({ children }) => <div data-testid="popup">{children}</div>,
  // ✅ Return a map object with panTo
  useMapEvent: () => ({ panTo: mockPanTo }),
}));

jest.mock("leaflet", () => ({
  divIcon: jest.fn(() => ({})),
}));

// Mock fetch for dummy-route.json
const mockRoute = [
  { latitude: 17.385044, longitude: 78.486671, timestamp: "2024-07-20T10:00:00Z" },
  { latitude: 17.385045, longitude: 78.486672, timestamp: "2024-07-20T10:00:05Z" },
  { latitude: 17.385050, longitude: 78.486680, timestamp: "2024-07-20T10:00:10Z" },
];

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockRoute),
  })
);

describe("MapView Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders map container and UI controls", async () => {
    render(<MapView />);
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/Reset/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Speed x/i)).toBeInTheDocument();
    await waitFor(() => expect(fetch).toHaveBeenCalled());
  });

  test("renders ConfigureCard and VehicleTooltip after route loads", async () => {
    render(<MapView />);
    const configureCard = await screen.findByTestId("configure-card");
    expect(configureCard).toBeInTheDocument();
    expect(screen.getByTestId("vehicle-tooltip")).toBeInTheDocument();
  });

  test("Play button toggles to Pause", async () => {
    render(<MapView />);
    const playBtn = await screen.findByText("Play");
    fireEvent.click(playBtn);
    expect(screen.getByText("Pause")).toBeInTheDocument();
  });

  test("Reset button resets index and position", async () => {
    render(<MapView />);
    await waitFor(() => screen.findByText("Play"));

    fireEvent.click(screen.getByText("Play"));
    fireEvent.click(screen.getByText("Reset"));

    expect(screen.getByText("Play")).toBeInTheDocument();
    expect(screen.getByText(/Index:/i)).toHaveTextContent("Index: 0");
  });

  test("Speed dropdown updates correctly", async () => {
    render(<MapView />);
    await waitFor(() => screen.findByText("Play"));

    const select = screen.getByLabelText(/Speed x/i);
    fireEvent.change(select, { target: { value: "2" } });
    expect(select.value).toBe("2");
  });

  test("renders marker and polyline inside map", async () => {
    render(<MapView />);
    await waitFor(() => screen.findByTestId("marker"));
    expect(screen.getByTestId("map-container")).toBeInTheDocument();
    expect(screen.getByTestId("marker")).toBeInTheDocument();
    expect(screen.getByTestId("polyline")).toBeInTheDocument();
  });
});
