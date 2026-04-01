import { formatNumber } from "../helpers/formatHelpers";

const TYPE_LABELS = {
  individual_boxes: "Individual Boxes",
  pallets: "Pallets",
  partial_pallets: "Partial Pallets",
  flow_wrap_rolls: "Flow Wrap Rolls",
  flow_wrap_ft: "Flow Wraps Ft",
  flow_wrap_pallet: "Flow Wrap Pallets",
};

function EntryList({ entries, onDeleteEntry }) {
  return (
    <section className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Entries</h2>
        <span className="text-sm text-slate-500">
          {entries.length} {entries.length === 1 ? "item" : "items"}
        </span>
      </div>

      {entries.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">
          No entries yet. Add your first count entry above.
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="rounded-xl border border-slate-200 p-3"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {TYPE_LABELS[entry.type]}
                  </p>

                  <p className="mt-1 text-sm text-slate-600">
                    Quantity:{" "}
                    <span className="font-medium">
                      {formatNumber(entry.quantity)}
                    </span>
                  </p>

                  <p className="mt-1 text-sm text-slate-600">
                    Batch:{" "}
                    <span className="font-medium">
                      {entry.batch || "No batch"}
                    </span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onDeleteEntry(entry.id)}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default EntryList;
