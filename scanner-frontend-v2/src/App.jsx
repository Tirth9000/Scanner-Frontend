import { Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import Landing from "./pages/LandingPage";
import Auth from "./pages/AuthPage";
import Scan from "./pages/NewScan";
import MalwareScan from "./pages/MalwareScan";
import Assessment from "./pages/Assessment";
import ScanHistory from "./pages/ScanHistory";
import MalwareScanHistory from "./pages/MalwareScanHistory";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Landing />} />
      </Route>

      <Route path="/auth" element={<PublicLayout />}>
        <Route index element={<Auth />} />
      </Route>

      <Route path="/" element={<DashboardLayout />}>
        <Route path="scan" element={<Scan />} />
        <Route path="history" element={<ScanHistory />} />
        <Route path="malware" element={<MalwareScan />} />
        <Route path="malware-history" element={<MalwareScanHistory />} />
        <Route path="assessment" element={<Assessment />} />
        <Route path="profile" element={<Profile />} />
      </Route>

    </Routes>
  );
}

export default App;
