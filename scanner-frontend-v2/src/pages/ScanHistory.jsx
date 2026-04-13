const SCAN_HISTORY = [
  {
    target: "secure.nexus-corp.net",
    startedAt: "13 Apr 2026, 10:42",
    status: "Completed",
    duration: "07m 14s",
    findings: "12 assets discovered",
  },
  {
    target: "client-portal.allianzcloud.io",
    startedAt: "12 Apr 2026, 18:05",
    status: "Completed",
    duration: "05m 31s",
    findings: "4 weak endpoints flagged",
  },
  {
    target: "partners.sentinel-grid.app",
    startedAt: "12 Apr 2026, 14:26",
    status: "In Review",
    duration: "03m 58s",
    findings: "DNS verification pending",
  },
  {
    target: "api.trustlayer.dev",
    startedAt: "11 Apr 2026, 09:13",
    status: "Completed",
    duration: "06m 02s",
    findings: "No critical issues",
  },
];

function getStatusClasses(status) {
  if (status === "Completed") {
    return "border-emerald-100 bg-emerald-50 text-emerald-700";
  }

  return "border-amber-100 bg-amber-50 text-amber-700";
}

function ScanHistory() {
  return (
    <div className="mx-auto max-w-7xl p-6 md:p-12">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-indigo-600">
            Domain Intelligence
          </p>
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-slate-900">
            Scan History
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Review previous domain scans, current scan states, and the latest
            outcomes from discovery and assessment runs.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-600 shadow-sm">
          <span className="font-bold text-slate-900">{SCAN_HISTORY.length}</span>{" "}
          recorded scans in this workspace
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="grid grid-cols-[2fr_1.4fr_1fr_1fr_1.4fr] gap-4 border-b border-slate-200 bg-slate-50 px-6 py-4 text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
          <span>Target</span>
          <span>Started</span>
          <span>Status</span>
          <span>Duration</span>
          <span>Summary</span>
        </div>

        {SCAN_HISTORY.map((scan) => (
          <div
            key={`${scan.target}-${scan.startedAt}`}
            className="grid grid-cols-[2fr_1.4fr_1fr_1fr_1.4fr] gap-4 border-b border-slate-100 px-6 py-5 last:border-b-0"
          >
            <div>
              <p className="font-semibold text-slate-900">{scan.target}</p>
              <p className="mt-1 text-sm text-slate-500">
                Perimeter discovery and exposure analysis
              </p>
            </div>
            <p className="text-sm text-slate-600">{scan.startedAt}</p>
            <div>
              <span
                className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase ${getStatusClasses(
                  scan.status,
                )}`}
              >
                {scan.status}
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-700">{scan.duration}</p>
            <p className="text-sm text-slate-600">{scan.findings}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScanHistory;
