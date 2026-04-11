import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const baseClass =
    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200";

  const activeClass = "text-indigo-700 font-semibold bg-gray-200";

  const inactiveClass = "text-gray-500 hover:text-indigo-600 hover:bg-gray-100";

  return (
    <aside className="flex h-full w-72 shrink-0 flex-col overflow-y-auto border-r border-slate-200 bg-slate-50 px-6 py-8">
      {/* Logo */}
      <div className="mb-10">
        <div className="text-2xl font-bold text-indigo-900 font-headline">
          The Sentinel
        </div>
        <div className="text-xs uppercase tracking-widest text-gray-500 mt-1">
          Digital Curator
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-2">
        <Link
          to="/assessment"
          className={`${baseClass} ${isActive("/assessment") ? activeClass : inactiveClass}`}
        >
          <span className="material-symbols-outlined">security</span>
          <span>Assessment</span>
        </Link>

        <Link
          to="/scan"
          className={`${baseClass} ${isActive("/scan") ? activeClass : inactiveClass}`}
        >
          <span className="material-symbols-outlined">radar</span>
          <span>New Scan</span>
        </Link>

        <Link
          to="/history"
          className={`${baseClass} ${isActive("/history") ? activeClass : inactiveClass}`}
        >
          <span className="material-symbols-outlined">history</span>
          <span>Scan History</span>
        </Link>

        <Link
          to="/malware"
          className={`${baseClass} ${isActive("/malware") ? activeClass : inactiveClass}`}
        >
          <span className="material-symbols-outlined">bug_report</span>
          <span>Malware Scan</span>
        </Link>

        <Link
          to="/malware-history"
          className={`${baseClass} ${isActive("/malware-history") ? activeClass : inactiveClass}`}
        >
          <span className="material-symbols-outlined">manage_search</span>
          <span>Malware Scan History</span>
        </Link>
      </nav>

      {/* Bottom */}
      <div className="pt-8 border-t border-slate-200 space-y-2">
        <Link to="/profile" className={`${baseClass} ${inactiveClass}`}>
          <span className="material-symbols-outlined">account_circle</span>
          <span>Profile</span>
        </Link>

        <Link to="/settings" className={`${baseClass} ${inactiveClass}`}>
          <span className="material-symbols-outlined">settings</span>
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
