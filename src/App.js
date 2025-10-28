import React from "react";
import MapView from "./components/MapView";
import "./App.css";

function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Vehicle Movement Simulator</h1>
      </header>

      <main className="app-main">
        <MapView />
      </main>

      <footer className="app-footer">
        <small>© 2025 Vehicle Map Simulation</small>
      </footer>
    </div>
  );
}

export default App;
