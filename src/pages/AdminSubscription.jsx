import React from "react";

function AdminSubscription() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="p-10 space-y-10">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-4xl font-black text-on-surface tracking-tight mb-2">
              Subscription Management
            </h2>
            <p className="text-on-surface-variant max-w-md">
              Define service tiers, adjust pricing models, and manage enterprise
              feature sets for all customer profiles.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-2.5 bg-secondary-container text-on-secondary-container rounded-xl font-semibold text-sm hover:opacity-90 transition-all">
              Billing Settings
            </button>
            <button className="px-6 py-2.5 bg-gradient-to-br from-primary to-primary-dim text-white rounded-xl font-semibold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">add</span>
              Create New Plan
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm border border-primary/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4">
              <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-lg uppercase">
                Popular
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-primary-container/30 flex items-center justify-center text-primary mb-6">
              <span className="material-symbols-outlined">rocket_launch</span>
            </div>
            <h3 className="text-xl font-black text-on-surface mb-1">
              Enterprise Plus
            </h3>
            <p className="text-3xl font-black text-primary mb-4">
              $499
              <span className="text-sm font-medium text-on-surface-variant">
                /mo
              </span>
            </p>
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-2 text-xs font-medium text-on-surface-variant">
                <span className="material-symbols-outlined text-emerald-500 text-sm">
                  check_circle
                </span>{" "}
                Unlimited Scans
              </div>
            </div>
            <button className="w-full py-2.5 border-2 border-primary/20 text-primary font-bold text-sm rounded-xl hover:bg-primary hover:text-white transition-all">
              Edit Details
            </button>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm group">
            <div className="w-12 h-12 rounded-2xl bg-tertiary-container/30 flex items-center justify-center text-tertiary mb-6">
              <span className="material-symbols-outlined">business_center</span>
            </div>
            <h3 className="text-xl font-black text-on-surface mb-1">
              Business Pro
            </h3>
            <p className="text-3xl font-black text-on-surface mb-4">
              $199
              <span className="text-sm font-medium text-on-surface-variant">
                /mo
              </span>
            </p>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm group">
            <div className="w-12 h-12 rounded-2xl bg-secondary-container/30 flex items-center justify-center text-secondary mb-6">
              <span className="material-symbols-outlined">work</span>
            </div>
            <h3 className="text-xl font-black text-on-surface mb-1">
              Standard
            </h3>
            <p className="text-3xl font-black text-on-surface mb-4">
              $49
              <span className="text-sm font-medium text-on-surface-variant">
                /mo
              </span>
            </p>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm group">
            <div className="w-12 h-12 rounded-2xl bg-outline-variant/10 flex items-center justify-center text-outline-variant mb-6">
              <span className="material-symbols-outlined">hourglass_top</span>
            </div>
            <h3 className="text-xl font-black text-on-surface mb-1">
              Free Trial
            </h3>
            <p className="text-3xl font-black text-on-surface mb-4">
              $0
              <span className="text-sm font-medium text-on-surface-variant">
                /14d
              </span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 xl:col-span-7 bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm">
            <div className="px-8 py-6 border-b border-surface-container flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">Plan Configuration</h3>
                <p className="text-xs text-on-surface-variant">
                  Modify parameters for the selected subscription tier.
                </p>
              </div>
              <span className="px-4 py-1.5 bg-primary/5 text-primary text-xs font-bold rounded-full border border-primary/10">
                Editing: Enterprise Plus
              </span>
            </div>
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                    Plan Name
                  </label>
                  <input
                    className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20"
                    type="text"
                    defaultValue="Enterprise Plus"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                    Monthly Price ($)
                  </label>
                  <input
                    className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20"
                    type="number"
                    defaultValue={499}
                  />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t border-surface-container">
                <button className="px-6 py-2.5 text-on-surface-variant font-bold text-sm hover:text-on-surface transition-all">
                  Reset Changes
                </button>
                <button className="px-8 py-2.5 bg-primary text-white font-bold text-sm rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
                  Save Plan Updates
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-12 xl:col-span-5 space-y-8">
            <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm">
              <h3 className="text-xl font-bold mb-6">Plan Revenue Share</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="text-on-surface-variant">
                      Enterprise Plus
                    </span>
                    <span className="text-primary">$2,046,898 (62%)</span>
                  </div>
                  <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full w-[62%]"></div>
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

export default AdminSubscription;
