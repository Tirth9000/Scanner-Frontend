function Navbar() {
  return (
    <header className="bg-surface flex justify-between items-center px-12 h-20 border-b border-slate-200">
      <div className="text-xl font-black text-slate-900 font-headline">
        Sentinel Ethos
      </div>

      <div className="flex items-center gap-6 text-slate-500">
        <span className="cursor-pointer hover:text-indigo-700">🔔</span>
        <span className="cursor-pointer hover:text-indigo-700">⚙️</span>
      </div>
    </header>
  );
}

export default Navbar;
