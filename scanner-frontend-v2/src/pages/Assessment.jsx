function Scan() {
  return (
    <div className="mx-auto max-w-7xl p-6 md:p-12">
        {/* Header */}
        <header className="mb-10 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold tracking-widest text-outline uppercase">
                Active Assessment
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight">
              Security Assessment Profile
            </h1>

            <p className="text-on-surface-variant max-w-2xl mt-2">
              Continuous monitoring and evaluation of organizational risk
              vectors and digital asset health.
            </p>
          </div>

          <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg">
            <span className="material-symbols-outlined text-xl">download</span>
            Download Report
          </button>
        </header>

        {/* Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-10">
          {/* Radar */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl border shadow-sm flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-extrabold">
                  Spider Net Security Graph
                </h2>
                <p className="text-xs text-gray-500">
                  4 key security pillars distribution
                </p>
              </div>

              <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded">
                Live
              </span>
            </div>

            <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
              {/* Labels */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 text-xs">
                Network
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs">
                DNS Health
              </div>
              <div className="absolute right-0 top-1/2 translate-x-6 text-xs">
                Application
              </div>
              <div className="absolute left-0 top-1/2 -translate-x-6 text-xs">
                Endpoint
              </div>

              {/* SVG */}
              <svg className="w-full h-full" viewBox="0 0 400 400">
                <polygon
                  points="200,40 360,200 200,360 40,200"
                  fill="none"
                  stroke="#ddd"
                />
                <polygon
                  points="200,80 320,200 200,320 80,200"
                  fill="none"
                  stroke="#ddd"
                />
                <polygon
                  points="200,120 280,200 200,280 120,200"
                  fill="none"
                  stroke="#ddd"
                />
                <polygon
                  points="200,160 240,200 200,240 160,200"
                  fill="none"
                  stroke="#ddd"
                />

                <line x1="200" y1="40" x2="200" y2="360" stroke="#ddd" />
                <line x1="40" y1="200" x2="360" y2="200" stroke="#ddd" />

                {/* Data */}
                <polygon
                  points="200,53 325,200 200,354 128,200"
                  fill="rgba(92,90,139,0.2)"
                  stroke="#5c5a8b"
                  strokeWidth="2"
                />

                <circle cx="200" cy="53" r="4" fill="#5c5a8b" />
                <circle cx="325" cy="200" r="4" fill="#5c5a8b" />
                <circle cx="200" cy="354" r="4" fill="#5c5a8b" />
                <circle cx="128" cy="200" r="4" fill="#a8364b" />
              </svg>
            </div>
          </div>

          {/* Stats */}
          <div className="lg:col-span-2 bg-gray-50 p-8 rounded-3xl border flex flex-col">
            <h2 className="text-xl font-bold mb-6">Metric Breakdown</h2>

            <div className="space-y-6">
              {[
                {
                  name: "Network Security",
                  value: 92,
                  color: "bg-emerald-500",
                },
                {
                  name: "Application Security",
                  value: 78,
                  color: "bg-indigo-500",
                },
                { name: "DNS Health", value: 96, color: "bg-emerald-500" },
                { name: "Endpoint Security", value: 45, color: "bg-red-500" },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span>{item.name}</span>
                    <span className="font-bold">{item.value}%</span>
                  </div>

                  <div className="h-2 bg-gray-200 rounded">
                    <div
                      className={`h-full ${item.color} rounded`}
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { title: "Network Security", status: "Secure" },
            { title: "Application Security", status: "Good" },
            { title: "DNS Health", status: "Excellent" },
            { title: "Endpoint Security", status: "At Risk" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-2xl border text-center shadow"
            >
              <h3 className="font-bold text-sm mb-2">{item.title}</h3>
              <span className="text-xs font-bold bg-gray-100 px-3 py-1 rounded">
                {item.status}
              </span>
            </div>
          ))}
        </div>
    </div>
  );
}

export default Scan;
