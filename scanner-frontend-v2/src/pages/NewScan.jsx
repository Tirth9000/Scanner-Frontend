import Layout from "../components/Layout";

function NewScan() {
  return (
    <Layout>
      {/* Hero */}
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold font-headline mb-4">
            New Domain Scan
          </h1>

          <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
            Deploy an autonomous audit of your digital perimeter.
          </p>
        </div>

        {/* Input */}
        <div className="bg-white p-8 rounded-xl border shadow-sm">
          <label className="text-xs font-bold uppercase tracking-widest mb-4 block">
            Domain Target
          </label>

          <div className="flex gap-4">
            <input
              type="text"
              placeholder="example.com"
              className="flex-1 p-4 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <button className="bg-indigo-600 text-white px-8 rounded-xl font-bold hover:bg-indigo-700">
              Scan
            </button>
          </div>
        </div>

        {/* Stages */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="p-6 rounded-xl bg-green-50 text-center">
            <p className="font-bold">Domain Validation</p>
            <span className="text-xs">Complete</span>
          </div>

          <div className="p-6 rounded-xl bg-indigo-50 text-center">
            <p className="font-bold">Subdomain Discovery</p>
            <span className="text-xs">Running</span>
          </div>

          <div className="p-6 rounded-xl bg-gray-100 text-center">
            <p className="font-bold">Filtering</p>
            <span className="text-xs">Pending</span>
          </div>

          <div className="p-6 rounded-xl bg-gray-100 text-center">
            <p className="font-bold">Data Collection</p>
            <span className="text-xs">Pending</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default NewScan;
