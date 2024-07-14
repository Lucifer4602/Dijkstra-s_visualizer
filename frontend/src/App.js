import React from "react";
import { Route, Link, Routes } from "react-router-dom";
import "./App.css";
import PathfindingVisualizerPage from "./PathfindingVisualizerPage";
import HomePage from "./HomePage";

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Dijkstra's Algorithm</h1>
        <p>An Amazing Algorithm</p>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/visualizer">Visualizer</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/visualizer" element={<PathfindingVisualizerPage />} />
      </Routes>
      <footer className="footer">
        <p>
          © All rights reserved. |{" "}
          <a
            href="https://www.linkedin.com/in/guptaachyut/"
            style={{ color: "white" }}
          >
            LinkedIn
          </a>{" "}
          |{" "}
          <a href="https://github.com/Lucifer4602" style={{ color: "white" }}>
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
