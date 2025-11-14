// src/App.jsx
import { useState } from "react";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Home from "./pages/Home.jsx";
import FeaturePrograms from "./pages/FeaturePrograms.jsx";
import Settings from "./pages/Settings.jsx";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("home"); // 🔹 default = Home

  const renderPage = () => {
    switch (activePage) {
      case "FeaturePrograms":
        return <FeaturePrograms />;
      case "settings":
        return <Settings />;
      case "home":
      default:
        return <Home />;
    }
  };

  return (
    <div className="app">
      <Header />
      <div className="layout">
        <Sidebar activePage={activePage} onChangePage={setActivePage} />
        <main className="content">{renderPage()}</main>
      </div>
    </div>
  );
}

export default App;
