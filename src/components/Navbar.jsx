function Navbar({ isSidebarOpen, onOpenSidebar }) {
  return (
    <header className="flex h-20 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 md:px-12">
      <div className="flex items-center gap-4">
        {!isSidebarOpen && (
          <button
            type="button"
            onClick={onOpenSidebar}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
            aria-label="Open sidebar"
          >
            <span className="material-symbols-outlined">keyboard_double_arrow_right</span>
          </button>
        )}

      </div>
    </header>
  );
}

export default Navbar;
