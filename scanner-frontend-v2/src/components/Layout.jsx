import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="flex h-screen bg-surface text-on-surface">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <div className="flex-1 overflow-y-auto px-12 py-12">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
