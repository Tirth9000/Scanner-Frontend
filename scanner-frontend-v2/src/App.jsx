import { Routes, Route } from "react-router-dom";
import Landing from "./pages/LandingPage";
import Scan from "./pages/NewScan";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/scan" element={<Scan />} />
    </Routes>
  );
}

export default App;
