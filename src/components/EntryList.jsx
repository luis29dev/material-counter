import { formatNumber } from "../helpers/formatHelpers";
import { getConvertedEntryTotal } from "../helpers/summaryHelpers";

const TYPE_LABELS = {
  individual_boxes: "Individual Boxes",
  pallets: "Pallets",
  partial_pallets: "Partial Pallets",
  //flow_wrap_rolls: "Flow Wrap Rolls",
  //flow_wrap_ft: "Flow Wraps Ft",
  //flow_wrap_pallet: "Flow Wrap Pallets",
};

function EntryList({
  entries,
  onDeleteEntry,
  title = "Entries",
  onAdjustPalletCount,
}) {
  return (
    <section className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        <span className="text-sm text-slate-500">
          {entries.length} {entries.length === 1 ? "item" : "items"}
        </span>
      </div>

      {entries.length === 0 ? (
        <div className="mt-4 flex min-h-32 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4">
          <p className="text-center text-sm text-slate-500">
            No entries yet. Add your first count entry above.
          </p>
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {entries.map((entry) => {
            const convertedTotal = getConvertedEntryTotal(
              entry,
              entry.countMode,
            );
            const unitLabel =
              entry.countMode === "trays"
                ? "trays"
                : entry.countMode === "bags"
                  ? "bags"
                  : "lbs";
            return (
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
                      Equivalent {unitLabel}:{" "}
                      <span className="font-medium text-emerald-700">
                        {formatNumber(convertedTotal)}
                      </span>
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                      Batch:{" "}
                      <span className="font-medium">
                        {entry.batch || "No batch"}
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <button
                      type="button"
                      onClick={() => onDeleteEntry(entry.id)}
                      className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                    >
                      Delete
                    </button>

                    {entry.type === "pallets" && (
                      <div className="inline-flex items-center rounded-lg border border-slate-300 bg-slate-50">
                        <button
                          type="button"
                          onClick={() => onAdjustPalletCount(entry.id, -1)}
                          className="flex h-8 w-8 items-center justify-center text-sm font-semibold text-slate-700 transition hover:bg-slate-100 active:bg-slate-200"
                        >
                          −
                        </button>

                        <div className="flex min-w-10 items-center justify-center px-2 text-xs font-semibold text-slate-900">
                          {entry.palletCount ?? 1}
                        </div>

                        <button
                          type="button"
                          onClick={() => onAdjustPalletCount(entry.id, 1)}
                          className="flex h-8 w-8 items-center justify-center text-sm font-semibold text-slate-700 transition hover:bg-slate-100 active:bg-slate-200"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default EntryList;
