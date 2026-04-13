import { useEffect, useState } from "react";

const STAGES = [
  {
    id: "domainValidation",
    name: "Domain Validation",
    icon: "language",
  },
  {
    id: "subdomainDiscovery",
    name: "Subdomain Discovery",
    icon: "travel_explore",
  },
  {
    id: "subdomainFilter",
    name: "Subdomain Filter",
    icon: "filter_alt",
  },
  {
    id: "dataCollection",
    name: "Data Collection",
    icon: "database",
  },
];

const PENDING = "pending";
const RUNNING = "running";
const COMPLETED = "completed";

function createPendingStageState() {
  return STAGES.reduce((accumulator, stage) => {
    accumulator[stage.id] = PENDING;
    return accumulator;
  }, {});
}

function getStageCardClasses(status) {
  if (status === COMPLETED) {
    return "border-emerald-200 bg-emerald-50 text-emerald-900 shadow-[0_12px_32px_rgba(16,185,129,0.12)]";
  }

  if (status === RUNNING) {
    return "border-indigo-400 bg-indigo-50/70 text-indigo-900 shadow-[0_16px_36px_rgba(92,90,139,0.12)]";
  }

  return "border-slate-200 bg-slate-50/80 text-slate-500 opacity-80";
}

function getStageIconWrapClasses(status) {
  if (status === COMPLETED) {
    return "bg-emerald-500 text-white shadow-lg shadow-emerald-200";
  }

  if (status === RUNNING) {
    return "bg-indigo-500 text-white shadow-lg shadow-indigo-200";
  }

  return "bg-slate-200 text-slate-500";
}

function getStageLabel(status) {
  if (status === COMPLETED) {
    return "Complete";
  }

  if (status === RUNNING) {
    return "In Progress";
  }

  return "";
}

function getStageLabelClasses(status) {
  if (status === COMPLETED) {
    return "text-emerald-700";
  }

  if (status === RUNNING) {
    return "text-indigo-700";
  }

  return "text-slate-400";
}

function StageCard({ stage, status }) {
  const label = getStageLabel(status);

  return (
    <div
      className={`relative flex flex-col items-center gap-4 rounded-2xl border p-6 text-center transition-all duration-300 ${getStageCardClasses(
        status,
      )} ${status === RUNNING ? "overflow-hidden" : ""}`}
    >
      {status === RUNNING && (
        <div className="absolute inset-x-0 top-0 h-1 overflow-hidden rounded-t-2xl">
          <div className="h-full w-1/2 animate-[scanSweep_1.5s_linear_infinite] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </div>
      )}

      <div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 ${getStageIconWrapClasses(
          status,
        )}`}
      >
        {status === COMPLETED ? (
          <span className="material-symbols-outlined text-[28px]">
            check_circle
          </span>
        ) : status === RUNNING ? (
          <span
            className="material-symbols-outlined animate-spin text-[28px]"
            style={{ animationDuration: "2.8s" }}
          >
            progress_activity
          </span>
        ) : (
          <span className="material-symbols-outlined text-[28px]">
            {stage.icon}
          </span>
        )}
      </div>

      <div className="flex min-h-[72px] flex-col items-center justify-center">
        <h3 className="font-headline text-sm font-extrabold tracking-tight">
          {stage.name}
        </h3>

        {label && (
          <span
            className={`mt-2 block text-[11px] font-bold uppercase tracking-[0.28em] ${getStageLabelClasses(
              status,
            )}`}
          >
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

function NewScan() {
  const [domain, setDomain] = useState("");
  const [stageStatuses, setStageStatuses] = useState(createPendingStageState);
  const [isScanRunning, setIsScanRunning] = useState(false);
  const trimmedDomain = domain.trim();

  useEffect(() => {
    if (!isScanRunning) {
      return undefined;
    }

    const stageTimers = [
      window.setTimeout(() => {
        setStageStatuses({
          domainValidation: COMPLETED,
          subdomainDiscovery: RUNNING,
          subdomainFilter: PENDING,
          dataCollection: PENDING,
        });
      }, 1800),
      window.setTimeout(() => {
        setStageStatuses({
          domainValidation: COMPLETED,
          subdomainDiscovery: COMPLETED,
          subdomainFilter: RUNNING,
          dataCollection: PENDING,
        });
      }, 3600),
      window.setTimeout(() => {
        setStageStatuses({
          domainValidation: COMPLETED,
          subdomainDiscovery: COMPLETED,
          subdomainFilter: COMPLETED,
          dataCollection: RUNNING,
        });
      }, 5400),
      window.setTimeout(() => {
        setStageStatuses({
          domainValidation: COMPLETED,
          subdomainDiscovery: COMPLETED,
          subdomainFilter: COMPLETED,
          dataCollection: COMPLETED,
        });
        setIsScanRunning(false);
      }, 7200),
    ];

    return () => {
      stageTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [isScanRunning]);

  /*
  useEffect(() => {
    const handleStageUpdate = (event) => {
      const { stageId, status } = event.detail ?? {};

      if (!stageId || ![PENDING, RUNNING, COMPLETED].includes(status)) {
        return;
      }

      setStageStatuses((current) => ({
        ...current,
        [stageId]: status,
      }));
    };

    window.addEventListener("scan-stage-update", handleStageUpdate);

    window.updateScanStage = (stageId, status) => {
      window.dispatchEvent(
        new CustomEvent("scan-stage-update", {
          detail: { stageId, status },
        }),
      );
    };

    return () => {
      window.removeEventListener("scan-stage-update", handleStageUpdate);
      delete window.updateScanStage;
    };
  }, []);
  */

  const handleStartScan = () => {
    if (isScanRunning || !trimmedDomain) {
      return;
    }

    setStageStatuses({
      domainValidation: RUNNING,
      subdomainDiscovery: PENDING,
      subdomainFilter: PENDING,
      dataCollection: PENDING,
    });
    setIsScanRunning(true);
  };

  const isInputDisabled = isScanRunning;
  const isStartDisabled = isScanRunning || !trimmedDomain;

  return (
    <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col justify-center px-6 py-12 md:px-10 md:py-16">
      <div className="mx-auto w-full max-w-5xl space-y-10">
        <div className="text-center">
          <h1 className="mb-4 font-headline text-5xl font-extrabold tracking-tight text-slate-900">
            New Domain Scan
          </h1>

          <p className="mx-auto max-w-3xl text-lg text-slate-600">
            Deploy an autonomous audit of your digital perimeter. Enter a
            domain to begin high-fidelity asset discovery and vulnerability
            profiling.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
          <label className="mb-4 block text-xs font-bold uppercase tracking-[0.26em] text-slate-600">
            Domain Target
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
                placeholder="e.g. secure.nexus-corp.net"
                className="w-full rounded-xl border border-slate-200 bg-slate-100 py-4 pl-12 pr-4 text-lg text-slate-900 outline-none transition placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200"
                required
              />
            </div>

            <button
              type="button"
              onClick={handleStartScan}
              disabled={isStartDisabled}
              className="flex items-center justify-center gap-3 rounded-xl bg-indigo-600 px-10 py-4 font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300 disabled:shadow-none"
            >
              <span>{isScanRunning ? "Scan Running" : "Initialize Scan"}</span>
              <span className="material-symbols-outlined">
                {isScanRunning ? "progress_activity" : "bolt"}
              </span>
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {STAGES.map((stage) => (
            <StageCard
              key={stage.id}
              stage={stage}
              status={stageStatuses[stage.id]}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

export default NewScan;
