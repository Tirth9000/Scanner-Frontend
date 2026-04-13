import { useState } from "react";

const ACTIVE_SCANS = [
  {
    target: "security.company.com",
    time: "Today, 10:45 AM",
    score: "98.2",
  },
  {
    target: "staging.infra.io",
    time: "Yesterday, 4:20 PM",
    score: "84.5",
  },
  {
    target: "api-v2.main.com",
    time: "2 days ago",
    score: "92.0",
  },
  {
    target: "api-v2.main.com",
    time: "2 days ago",
    score: "92.0",
  },
  {
    target: "api-v2.main.com",
    time: "2 days ago",
    score: "92.0",
  },
];

const TEAM_MEMBERS = [
  {
    name: "Julianne Moore",
    email: "j.moore@sentinel.io",
    status: "Active",
  },
  {
    name: "Kevin Huang",
    email: "k.huang@sentinel.io",
    status: "Active",
  },
  {
    name: "Sarah Connor",
    email: "s.connor@sentinel.io",
    status: "Pending",
  },
  {
    name: "Ben Parker",
    email: "b.parker@sentinel.io",
    status: "Active",
  },
  {
    name: "Elena Lopez",
    email: "e.lopez@sentinel.io",
    status: "Active",
  },
];

function getMemberStatusClasses(status) {
  if (status === "Active") {
    return "bg-indigo-100 text-indigo-700";
  }

  return "bg-slate-200 text-slate-500";
}

function Profile() {
  const [teamMembers, setTeamMembers] = useState(TEAM_MEMBERS);

  const handleRemoveMember = (email) => {
    setTeamMembers((current) =>
      current.filter((member) => member.email !== email),
    );
  };

  return (
    <div className="mx-auto max-w-7xl p-6 md:p-12">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-indigo-600">
            Account Overview
          </p>
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-slate-900">
            User Profile
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Manage your profile, request new scans, and monitor recent domain
            activity from one place.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50">
          Logout
          <span className="material-symbols-outlined text-[18px]">logout</span>
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <section className="lg:col-span-4">
          <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-indigo-100 bg-slate-100 text-2xl font-bold text-indigo-700">
                AM
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                Alex Mercer
              </h2>
            </div>

            <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-6">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-500">Email</span>
                <span className="ml-4 truncate font-semibold text-slate-900">
                  alex.mercer@sentinel.io
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-500">Joined</span>
                <span className="font-semibold text-slate-900">Oct 2022</span>
              </div>
            </div>

            <button className="mt-8 w-full rounded-xl border border-indigo-200 py-3 text-sm font-bold text-indigo-700 transition hover:bg-indigo-600 hover:text-white">
              Edit Profile
            </button>
          </div>
        </section>

        <section className="lg:col-span-8">
          <div className="flex h-full flex-col justify-center rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-indigo-100 p-2 text-indigo-600">
                <span className="material-symbols-outlined text-2xl">
                  add_circle
                </span>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                  Quick Scan Request
                </h3>
                <p className="text-xs text-slate-500">
                  Submit any domain or internal IP for deep analysis
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-grow">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg">
                  language
                </span>
                <input
                  type="text"
                  placeholder="Enter domain (e.g. secure.domain.com)"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <button className="whitespace-nowrap rounded-xl bg-indigo-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:brightness-110">
                Request Scan
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 border-t border-slate-100 pt-6 sm:grid-cols-3">
              <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500">
                <span className="material-symbols-outlined text-sm text-indigo-600">
                  bolt
                </span>
                Instant Processing
              </div>
              <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500">
                <span className="material-symbols-outlined text-sm text-indigo-600">
                  verified_user
                </span>
                Curator Analysis
              </div>
              <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500">
                <span className="material-symbols-outlined text-sm text-indigo-600">
                  history
                </span>
                Real-time Updates
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <section className="lg:col-span-8">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 bg-white px-6 py-5">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-indigo-600">
                  list_alt
                </span>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                  Active Domain Scans
                </h3>
              </div>
              <span className="rounded-full border border-indigo-200 bg-indigo-100 px-3 py-1 text-[11px] font-bold text-indigo-700">
                3 Active
              </span>
            </div>

            <div className="max-h-[350px] divide-y divide-slate-100 overflow-y-auto">
              {ACTIVE_SCANS.map((scan) => (
                <div
                  key={scan.target}
                  className="flex items-center justify-between px-6 py-5 transition-colors hover:bg-slate-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                      <span className="material-symbols-outlined text-xl text-indigo-600">
                        dns
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base font-bold text-slate-900">
                        {scan.target}
                      </span>
                      <span className="mt-0.5 flex items-center gap-1.5 text-[11px] text-slate-500">
                        <span className="material-symbols-outlined text-[14px]">
                          schedule
                        </span>
                        {scan.time}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <span className="mb-0.5 block text-[10px] font-bold uppercase text-slate-500">
                        Health Score
                      </span>
                      <span className="text-xl font-black text-indigo-700">
                        {scan.score}
                      </span>
                    </div>
                    <button className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100">
                      <span className="material-symbols-outlined text-xl">
                        more_vert
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="lg:col-span-4">
          <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/60 px-6 py-5">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Team Members
                </h2>
                <p className="mt-0.5 text-[10px] font-medium text-slate-500">
                  Tier Limit: 5 per team
                </p>
              </div>
              <button className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-bold text-white shadow-sm transition hover:brightness-110">
                <span className="material-symbols-outlined text-[16px]">
                  person_add
                </span>
                Invite
              </button>
            </div>

            <div className="max-h-[290px] flex-grow overflow-y-auto divide-y divide-slate-100">
              {teamMembers.map((member) => (
                <div
                  key={member.email}
                  className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-slate-50"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900">
                      {member.name}
                    </span>
                    <span className="text-xs text-slate-500">
                      {member.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${getMemberStatusClasses(
                        member.status,
                      )}`}
                    >
                      {member.status}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleRemoveMember(member.email)}
                      className="rounded-lg border border-rose-100 bg-rose-50 px-2.5 py-1 text-[10px] font-bold uppercase text-rose-700 transition hover:bg-rose-100"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/60 px-6 py-4">
              <p className="text-[10px] font-black uppercase text-slate-500">
                Full Utilization (5/5)
              </p>
              
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;
