export default function CountModeSelector({
  countMode,
  onChangeCountMode,
  onResetCount,
}) {
  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Count mode</h2>
          <p className="mt-1 text-sm text-slate-600">
            Select whether you are counting trays or bags for this session.
          </p>
        </div>

        <button
          type="button"
          onClick={onResetCount}
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Reset count
        </button>
      </div>

      <div className="mt-4">
        <label
          htmlFor="countMode"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Base unit
        </label>

        <select
          id="countMode"
          value={countMode}
          onChange={(e) => onChangeCountMode(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
        >
          <option value="trays">Trays</option>
          <option value="bags">Bags</option>
          <option value="butter">Butter</option>
        </select>

        <p className="mt-2 text-xs text-slate-500">
          This sets the count mode for the next entry you add.
        </p>
      </div>
    </section>
  );
}
