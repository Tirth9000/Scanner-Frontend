import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen((current) => !current)}
      />

      <div className="relative flex min-w-0 flex-1 flex-col">
        <Navbar
          isSidebarOpen={isSidebarOpen}
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />

        {/* Global floating dashboard controls (Audit / Malware) */}
        <DashboardFloatingControls />

        <main className="flex-1 overflow-y-auto min-h-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;

function DashboardFloatingControls() {
  const navigate = useNavigate();
  const location = useLocation();

  const isScan =
    location.pathname.includes("scan-dashboard") || location.pathname === "/";
  const isMalware =
    location.pathname.includes("malware-dashboard") ||
    location.pathname.includes("malware");

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="inline-flex items-center gap-2 rounded-lg bg-slate-50 p-1 border border-slate-200 shadow-sm">
        <button
          onClick={() => {
            try {
              window.__dashboardMode = "scan";
              window.dispatchEvent(
                new CustomEvent("dashboard-mode-changed", { detail: "scan" }),
              );
            } catch (e) {}
            navigate("/scan-dashboard");
          }}
          aria-pressed={isScan}
          aria-label="Show audit dashboard"
          title="Audit"
          className={`px-3 py-2 rounded-md text-sm font-semibold transition ${isScan ? "bg-white text-indigo-700 shadow" : "text-slate-600 hover:bg-white"}`}
        >
          Audit
        </button>
        <button
          onClick={() => {
            try {
              window.__dashboardMode = "malware";
              window.dispatchEvent(
                new CustomEvent("dashboard-mode-changed", {
                  detail: "malware",
                }),
              );
            } catch (e) {}
            navigate("/malware-dashboard");
          }}
          aria-pressed={isMalware}
          aria-label="Show malware dashboard"
          title="Malware"
          className={`px-3 py-2 rounded-md text-sm font-semibold transition ${isMalware ? "bg-white text-rose-700 shadow" : "text-slate-600 hover:bg-white"}`}
        >
          Malware
        </button>
      </div>
    </div>
  );
}
