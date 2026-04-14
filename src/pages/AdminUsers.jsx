import React from "react";

function AdminUsers() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="p-10 space-y-10">
        {/* Header Section */}
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-4xl font-black text-on-surface tracking-tight mb-2">
              User Management
            </h2>
            <p className="text-on-surface-variant max-w-md">
              Orchestrate access levels, monitor subscriptions, and manage
              high-level security permissions across the enterprise.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-2.5 bg-secondary-container text-on-secondary-container rounded-xl font-semibold text-sm hover:opacity-90 transition-all">
              Export CSV
            </button>
            <button className="px-6 py-2.5 bg-gradient-to-br from-primary to-primary-dim text-white rounded-xl font-semibold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
              Invite User
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary-container/30 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">group</span>
              </div>
              <span className="text-[10px] font-bold text-primary px-2 py-1 bg-primary-container rounded-full">
                LIVE
              </span>
            </div>
            <h3 className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-1">
              Total Users
            </h3>
            <p className="text-3xl font-black text-on-surface mb-4">12,842</p>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-tertiary-container/30 flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined">
                  shield_with_heart
                </span>
              </div>
              <span className="text-xs font-bold text-tertiary">+14%</span>
            </div>
            <h3 className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-1">
              Total Scans Conducted
            </h3>
            <p className="text-3xl font-black text-on-surface mb-4">843,219</p>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary-container/30 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">auto_awesome</span>
              </div>
              <span className="text-xs font-bold text-primary">
                92% Retention
              </span>
            </div>
            <h3 className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-1">
              Active Subscriptions
            </h3>
            <p className="text-3xl font-black text-on-surface mb-4">4,102</p>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">bolt</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs font-bold text-emerald-600">
                  Stable
                </span>
              </div>
            </div>
            <h3 className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-1">
              System Uptime
            </h3>
            <p className="text-3xl font-black text-on-surface mb-4">99.998%</p>
          </div>
        </div>

        {/* Registered Entities Table (simplified) */}
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 xl:col-span-8 bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm">
            <div className="px-8 py-6 flex items-center justify-between">
              <h3 className="text-xl font-bold">Registered Entities</h3>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-surface-container rounded-lg">
                  <span className="material-symbols-outlined">filter_list</span>
                </button>
                <button className="p-2 hover:bg-surface-container rounded-lg">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low border-b border-surface-container">
                  <tr>
                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                      Name & Email
                    </th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                      Role
                    </th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                      Plan
                    </th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                      Status
                    </th>
                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                          JD
                        </div>
                        <div>
                          <p className="text-sm font-bold text-on-surface">
                            Julianne Deutch
                          </p>
                          <p className="text-xs text-on-surface-variant">
                            j.deutch@cyberdyne.io
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-surface-container text-on-surface-variant text-[10px] font-bold rounded-full uppercase">
                        Admin
                      </span>
                    </td>
                    <td className="px-6 py-5">Enterprise Plus</td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full uppercase">
                        Active
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      {" "}
                      <div className="flex items-center justify-end gap-2">
                        {" "}
                        <button className="p-2" title="Manage Permissions">
                          <span className="material-symbols-outlined">key</span>
                        </button>{" "}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar-right like subscription summary */}
          <div className="col-span-12 xl:col-span-4 space-y-8">
            <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm">
              <h3 className="text-xl font-bold mb-6">Plan Distribution</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="text-on-surface-variant">
                      Enterprise Plus
                    </span>
                    <span className="text-primary">45%</span>
                  </div>
                  <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full w-[45%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;
