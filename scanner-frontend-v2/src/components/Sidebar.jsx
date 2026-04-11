function Sidebar() {
  return (
    <aside className="bg-slate-50 h-screen w-72 flex flex-col py-8 px-6 border-r border-slate-200">
      {/* Logo */}
      <div className="mb-10">
        <div className="text-2xl font-bold text-indigo-900 font-headline">
          The Sentinel
        </div>
        <div className="text-xs uppercase tracking-widest text-on-surface-variant mt-1">
          Digital Curator
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-2">
        <a className="sidebar-item">Assessment</a>

        <a className="sidebar-item active">New Scan</a>

        <a className="sidebar-item">Scan History</a>

        <a className="sidebar-item">Malware Scan</a>

        <a className="sidebar-item">Malware Scan History</a>
      </nav>

      {/* Bottom */}
      <div className="pt-8 border-t border-slate-200 space-y-2">
        <a className="sidebar-item">Profile</a>
        <a className="sidebar-item">Settings</a>
      </div>
    </aside>
  );
}

export default Sidebar;
