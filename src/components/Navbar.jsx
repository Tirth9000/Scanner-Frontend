function Navbar({ isSidebarOpen, onOpenSidebar }) {
  if (isSidebarOpen) return null;

  return (
    <div className="absolute top-6 left-6 z-50">
      <button
        type="button"
        onClick={onOpenSidebar}
        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
        aria-label="Open sidebar"
      >
        <span className="material-symbols-outlined">keyboard_double_arrow_right</span>
      </button>
    </div>
  );
}

export default Navbar;
