import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";

function SidebarLink({ to, icon, children }) {
  const location = useLocation();
  const isActive = to !== "#" && location.pathname === to;

  const baseClass =
    "relative flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 overflow-hidden";
  const activeClass = "text-primary font-bold bg-primary/5 shadow-sm";
  const inactiveClass = "text-on-surface hover:text-primary hover:bg-primary/5";

  return (
    <Link
      to={to}
      className={`${baseClass} ${isActive ? activeClass : inactiveClass}`}
    >
      <span
        className={
          isActive
            ? "absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full transition-all duration-200"
            : "absolute left-0 top-0 bottom-0 w-0 bg-primary rounded-r-full transition-all duration-200"
        }
      />
      <span className="material-symbols-outlined">{icon}</span>
      <span>{children}</span>
    </Link>
  );
}

function HeaderButtons() {
  const [active, setActive] = useState(null); // 'notifications' | 'settings' | null

  const toggle = (key) => {
    setActive((current) => (current === key ? null : key));
  };

  const buttonBase =
    "p-2 rounded-lg transition-transform duration-150 flex items-center justify-center";

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => toggle("notifications")}
        className={`${buttonBase} ${active === "notifications" ? "bg-indigo-50 text-primary scale-95 shadow-sm" : "text-on-surface-variant hover:text-primary"}`}
        aria-pressed={active === "notifications"}
      >
        <span className="material-symbols-outlined">notifications</span>
      </button>

      <button
        onClick={() => toggle("settings")}
        className={`${buttonBase} ${active === "settings" ? "bg-indigo-50 text-primary scale-95 shadow-sm" : "text-on-surface-variant hover:text-primary"}`}
        aria-pressed={active === "settings"}
      >
        <span className="material-symbols-outlined">settings</span>
      </button>
    </div>
  );
}

function AdminLayout() {
  const [isOpen, setIsOpen] = React.useState(true);
  const onToggle = () => setIsOpen((v) => !v);

  return (
    <div className="flex min-h-screen">
      {/* Admin Sidebar */}
      <aside
        className={`relative flex flex-col h-screen overflow-hidden border-r bg-surface transition-all duration-300 ${
          isOpen ? "w-72 px-6 py-8 border-r" : "w-0 border-r-0 px-0 py-0"
        }`}
        aria-hidden={!isOpen}
      >
        {/* Toggle button (same pattern as main Sidebar) */}
        <button
          type="button"
          onClick={onToggle}
          className={`absolute top-8 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 ${
            isOpen ? "right-[-22px]" : "right-[-56px]"
          }`}
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        >
          <span className="material-symbols-outlined">
            {isOpen
              ? "keyboard_double_arrow_left"
              : "keyboard_double_arrow_right"}
          </span>
        </button>

        <div
          className={`flex h-full min-h-0 flex-col overflow-y-auto ${
            isOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div className="mb-12 px-2">
            <div className="flex items-center gap-3">
              <div>
                <img
                  src={logo}
                  alt="Company Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
            </div>
          </div>

          <button className="mb-8 w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700">
            <span className="material-symbols-outlined">add_circle</span>
            <span>New Scan</span>
          </button>

          <nav className="flex-1 space-y-2">
            {/* Sidebar link styles with active indicator */}
            <SidebarLink to="/admin" icon="group">
              User Management
            </SidebarLink>
            <SidebarLink to="/admin/subscription" icon="payments">
              Subscription Management
            </SidebarLink>
            <SidebarLink to="#" icon="history_edu">
              Audit Logs
            </SidebarLink>
            <SidebarLink to="#" icon="query_stats">
              System Stats
            </SidebarLink>
          </nav>

          <div className="pt-8 mt-8 border-t space-y-2">
            <Link
              to="#"
              className="flex items-center gap-3 px-4 py-3 text-on-surface hover:text-error"
            >
              <span className="material-symbols-outlined">logout</span>
              <span>Logout</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main area with top nav + outlet */}
      <div className="flex-1 ml-0">
        <header className="flex justify-between items-center w-full px-6 py-4 bg-surface">
          <div className="flex items-center gap-4">
            {!isOpen && (
              <button
                type="button"
                onClick={onToggle}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                aria-label="Open sidebar"
              >
                <span className="material-symbols-outlined">
                  keyboard_double_arrow_right
                </span>
              </button>
            )}

            <div className="text-center">
              <p className="text-sm font-bold">Alex Sentinel</p>
              <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
                Administrator
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 ">
            <HeaderButtons />
          </div>
        </header>

        <main className="p-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
