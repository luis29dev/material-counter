import { getBatchSummary, getGrandTotal } from "../helpers/summaryHelpers";
import { formatNumber } from "../helpers/formatHelpers";

export default function Summary({ entries, countMode }) {
  const batchSummary = getBatchSummary(entries, countMode);
  const grandTotal = getGrandTotal(entries, countMode);

  const unitLabel = countMode === "trays" ? "trays" : "bags";

  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Summary</h2>
      <p className="mt-1 text-sm text-slate-600">
        Review total {unitLabel} by batch and overall.
      </p>

      {entries.length === 0 ? (
        <div className="mt-4 flex min-h-32 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4">
          <p className="text-center text-sm text-slate-500">
            No entries yet. Add entries to see the summary.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-4 space-y-3">
            {batchSummary.map((group) => (
              <div
                key={group.batch}
                className="rounded-xl border border-slate-200 p-3"
              >
                <p className="text-sm font-semibold text-slate-900">
                  Batch: {group.batch}
                </p>

                <p className="mt-1 text-sm text-slate-600">
                  Total {unitLabel}:{" "}
                  <span className="font-medium">
                    {formatNumber(group.total)}
                  </span>
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl bg-blue-50 p-4">
            <p className="text-sm font-semibold text-emerald-900">
              Grand total
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Total {unitLabel}:{" "}
              <span className="font-medium">{formatNumber(grandTotal)}</span>
            </p>
          </div>
        </>
      )}
    </section>
  );
}
