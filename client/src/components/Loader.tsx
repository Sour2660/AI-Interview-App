function Loader() {
  return (
    <div className="flex min-h-[280px] items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white p-6 text-slate-500">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
        <p className="text-sm font-medium">Loading content…</p>
      </div>
    </div>
  );
}

export default Loader;
