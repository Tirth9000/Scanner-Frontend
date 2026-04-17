import { useEffect, useState, useRef } from "react";
import {
  registerScanTask,
  getProfile,
  getWebSocketUrl,
} from "../services/api";

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

const STAGE_ORDER = STAGES.map((s) => s.id);
const scanSessionListeners = new Set();

let activeScanSocket = null;

// Maps WebSocket event names from the backend to frontend stage IDs
const EVENT_TO_STAGE = {
  domain_validation: "domainValidation",
  subdomain_discovery: "subdomainDiscovery",
  subdomain_filter: "subdomainFilter",
  data_collection: "dataCollection",
};

function createPendingStageState() {
  return STAGES.reduce((accumulator, stage) => {
    accumulator[stage.id] = PENDING;
    return accumulator;
  }, {});
}

function createCompletedStageState() {
  return STAGES.reduce((accumulator, stage) => {
    accumulator[stage.id] = COMPLETED;
    return accumulator;
  }, {});
}

function createDefaultScanSession() {
  return {
    domain: "",
    stageStatuses: createPendingStageState(),
    isScanRunning: false,
    scanError: null,
  };
}

let scanSession = createDefaultScanSession();

function getScanSession() {
  return scanSession;
}

function setScanSession(nextSession) {
  scanSession =
    typeof nextSession === "function" ? nextSession(scanSession) : nextSession;
  scanSessionListeners.forEach((listener) => listener(scanSession));
}

function subscribeToScanSession(listener) {
  scanSessionListeners.add(listener);
  return () => scanSessionListeners.delete(listener);
}

function resetScanSession() {
  setScanSession(createDefaultScanSession());
}

function closeActiveScanSocket() {
  if (activeScanSocket) {
    activeScanSocket.close();
    activeScanSocket = null;
  }
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
  const [scanSessionState, setScanSessionState] = useState(getScanSession);
  const [domain, setDomain] = useState(() => getScanSession().domain);
  const [orgId, setOrgId] = useState(null);
  const trimmedDomain = domain.trim();
  const startingScanRef = useRef(false);
  const { stageStatuses, isScanRunning, scanError } = scanSessionState;

  // Fetch org_id on mount so we can open the WebSocket later
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getProfile(token)
        .then((data) => setOrgId(data.org_id))
        .catch(() => {});
    }
  }, []);

  useEffect(() => {
    return subscribeToScanSession((nextSession) => {
      setScanSessionState(nextSession);
      if (nextSession.isScanRunning || !nextSession.domain) {
        setDomain(nextSession.domain);
      }
    });
  }, []);

  const handleStartScan = () => {
    if (isScanRunning || startingScanRef.current || !trimmedDomain || !orgId) {
      return;
    }

    startingScanRef.current = true;
    const scanDomain = trimmedDomain;

    closeActiveScanSocket();
    setScanSession({
      domain: scanDomain,
      scanError: null,
      isScanRunning: true,
      stageStatuses: {
        domainValidation: RUNNING,
        subdomainDiscovery: PENDING,
        subdomainFilter: PENDING,
        dataCollection: PENDING,
      },
    });

    const token = localStorage.getItem("token");
    const wsUrl = getWebSocketUrl(orgId);
    const ws = new WebSocket(wsUrl);
    activeScanSocket = ws;

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        const eventName = msg.event;

        if (eventName === "scan_complete") {
          setScanSession((current) => ({
            ...current,
            stageStatuses: createCompletedStageState(),
            isScanRunning: false,
            scanError: null,
          }));
          ws.close();
          activeScanSocket = null;
          resetScanSession();
          return;
        }

        const completedStage = EVENT_TO_STAGE[eventName];
        if (!completedStage) return;

        setScanSession((current) => {
          const updated = { ...current.stageStatuses };
          updated[completedStage] = COMPLETED;
          // Automatically set the next stage to RUNNING
          const idx = STAGE_ORDER.indexOf(completedStage);
          if (idx >= 0 && idx < STAGE_ORDER.length - 1) {
            const next = STAGE_ORDER[idx + 1];
            if (updated[next] === PENDING) {
              updated[next] = RUNNING;
            }
          }
          return { ...current, stageStatuses: updated };
        });
      } catch {
        // ignore malformed messages
      }
    };

    ws.onerror = () => {
      setScanSession((current) => ({
        ...current,
        scanError: "Connection lost. Please try again.",
        isScanRunning: false,
        stageStatuses: createPendingStageState(),
      }));
      activeScanSocket = null;
      startingScanRef.current = false;
    };

    // Wait for the socket to open, then fire the API call so we don't miss
    // the first "domain_validation" event the server sends.
    ws.onopen = async () => {
      try {
        await registerScanTask(scanDomain, token);
        startingScanRef.current = false;
      } catch (e) {
        setScanSession((current) => ({
          ...current,
          scanError: e.message || "Failed to start scan.",
          isScanRunning: false,
          stageStatuses: createPendingStageState(),
        }));
        ws.close();
        activeScanSocket = null;
        startingScanRef.current = false;
      }
    };
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
              className="flex items-center justify-center gap-3 rounded-xl bg-indigo-600 px-10 py-4 font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300 disabled:shadow-none"
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
