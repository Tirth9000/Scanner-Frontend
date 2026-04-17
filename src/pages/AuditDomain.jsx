import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function NewScan() {
  const [domain, setDomain] = useState("");
  const [isScanRunning, setIsScanRunning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanError, setScanError] = useState(null);
  const trimmedDomain = domain.trim();


  // Handle Webhook Progress Updates
  useEffect(() => {
    const handleProgressUpdate = (event) => {
      const { progress } = event.detail ?? {};
      if (typeof progress === "number" && progress >= 0 && progress <= 100) {
        setScanProgress(progress);
        if (progress === 100) {
           setTimeout(() => {
             setIsScanRunning(false);
             try {
               window.__newScanCompleted = true;
               window.dispatchEvent(new Event("new-scan-complete"));
               if (location && location.pathname === "/scan") {
                 navigate("/scan-dashboard");
               }
             } catch (e) {
               // noop
             }
           }, 1000);
        }
      }
    };

    window.addEventListener("scan-progress-update", handleProgressUpdate);

    // Webhook simulation helper so backend can easily inject progress
    window.updateScanProgress = (progress) => {
      window.dispatchEvent(
        new CustomEvent("scan-progress-update", {
          detail: { progress },
        }),
      );
    };

    return () => {
      window.removeEventListener("scan-progress-update", handleProgressUpdate);
      delete window.updateScanProgress;
    };
  }, [location, navigate]);

  // UI Simulation for demonstration purposes (simulates backend webhook calls)
  useEffect(() => {
    if (!isScanRunning) {
      return undefined;
    }

    setScanProgress(0);

    // Simulate progress if no external webhook calls updateScanProgress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5; // increment by 5-20%
      if (progress > 100) progress = 100;
      
      window.updateScanProgress(progress);

      if (progress === 100) {
        clearInterval(interval);
      }
    }, 800);

    return () => {
      clearInterval(interval);
    };
  }, [isScanRunning]);

  const handleStartScan = () => {
    if (isScanRunning || !trimmedDomain) {
      return;
    }
    setIsScanRunning(true);
    setScanProgress(0);
    setScanError(null);
  };

  const isInputDisabled = isScanRunning;
  const isStartDisabled = isScanRunning || !trimmedDomain;

  return (
    <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col justify-center px-6 py-12 md:px-10 md:py-16">
      <div className="mx-auto w-full max-w-5xl space-y-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="mb-4 font-headline text-5xl font-extrabold tracking-tight text-slate-900">
              New Domain Scan
            </h1>

            <p className="mx-auto max-w-3xl text-lg text-slate-600">
              Deploy an autonomous audit of your digital perimeter. Enter a
              domain to begin high-fidelity asset discovery and vulnerability
              profiling.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/history"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              <span className="material-symbols-outlined">history</span>
              <span>Scan History</span>
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
          <label className="mb-4 block text-xs font-bold uppercase tracking-[0.26em] text-slate-600">
            Target Domain
          </label>

          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500">
                language
              </span>

              <input
                type="text"
                value={domain}
                onChange={(event) => setDomain(event.target.value)}
                disabled={isInputDisabled}
                placeholder="e.g. example.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-100 py-4 pl-12 pr-4 text-lg text-slate-900 outline-none transition placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200"
                required
              />
            </div>

            <button
              type="button"
              onClick={handleStartScan}
              disabled={isStartDisabled}
              className="flex items-center justify-center gap-3 rounded-xl bg-indigo-600 px-10 py-4 font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300 disabled:shadow-none min-w-[200px]"
            >
              <span>{isScanRunning ? "Scan Running" : "Initialize Scan"}</span>
              <span className="material-symbols-outlined">
                {isScanRunning ? "progress_activity" : "bolt"}
              </span>
            </button>
          </div>

          {scanError && (
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-medium text-red-700">
              <span className="material-symbols-outlined text-base">error</span>
              {scanError}
            </div>
          )}
        </div>

        {/* Dynamic Progress Bar Replacing the Strategy Cards */}
        {isScanRunning && (
           <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-8 shadow-sm transition-all duration-500">
             <div className="flex justify-between items-center mb-4">
               <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                 <span className="material-symbols-outlined animate-spin text-indigo-600">progress_activity</span>
                 Active Scan in Progress
               </h3>
               <span className="text-2xl font-black text-indigo-600">{scanProgress}%</span>
             </div>
             
             <div className="w-full h-5 bg-indigo-100 rounded-full overflow-hidden shadow-inner relative">
               <div 
                 className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-300 ease-out flex items-center justify-end"
                 style={{ width: `${scanProgress}%` }}
               >
                 <div className="h-full w-20 bg-white/20 animate-[scanSweep_1.5s_linear_infinite]" />
               </div>
             </div>
             
             <div className="mt-4 flex items-center justify-between">
               <p className="text-sm font-semibold text-slate-600">
                 {scanProgress === 100 ? "Scan completed successfully." : "Awaiting detailed telemetry from the webhook backend..."}
               </p>
             </div>
           </div>
        )}
      </div>
    </div>
  );
}

export default NewScan;
