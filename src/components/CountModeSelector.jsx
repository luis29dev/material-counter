export default function CountModeSelector({ countMode, onChangeCountMode }) {
  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Count mode</h2>
      <p className="mt-1 text-sm text-slate-600">
        Select whether you are counting trays or bags for this session.
      </p>

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
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-slate-400"
        >
          <option value="trays">Trays</option>
          <option value="bags">Bags</option>
        </select>
      </div>
    </section>
  );
}
