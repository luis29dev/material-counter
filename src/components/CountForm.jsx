import { useState } from "react";
import {
  COUNT_TYPES,
  getHelperText,
  getQuantityLabel,
  getQuantityPlaceholder,
} from "../helpers/countFormHelpers";

export default function CountForm({ countMode, onAddEntry }) {
  const [selectedType, setSelectedType] = useState("individual_boxes");
  const [quantity, setQuantity] = useState("");
  const [batch, setBatch] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const trimmedBatch = batch.trim();
    if (trimmedBatch) {
      const parsedBatch = Number(trimmedBatch);

      if (!Number.isInteger(parsedBatch) || parsedBatch <= 0) {
        alert("Batch must be a positive whole number.");
        return;
      }
    }

    if (!quantity) return;

    const parsedQuantity = Number(quantity);

    if (parsedQuantity <= 0) {
      alert("Quantity must be greater than 0.");
      return;
    }

    const requiresInteger =
      selectedType === "individual_boxes" || selectedType === "partial_pallets";

    if (requiresInteger && !Number.isInteger(parsedQuantity)) {
      alert("This type requires a whole number (no decimals).");
      return;
    }

    const newEntry = {
      id: crypto.randomUUID(),
      type: selectedType,
      quantity: parsedQuantity,
      batch: trimmedBatch,
      countMode,
    };

    onAddEntry(newEntry);

    setQuantity("");
    setBatch("");
  }

  return (
    <section className="rounded-2xl border shadow-md border border-slate-300 bg-white p-5 shadow-md">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">Add Count</h2>
        <p className="mt-1 text-sm text-slate-600">
          Select a count type, enter a quantity, and optionally add a batch.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label
            htmlFor="countType"
            className="block text-sm font-semibold text-slate-800"
          >
            Count Type
          </label>

          <select
            id="countType"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
          >
            {COUNT_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="quantity"
            className="block text-sm font-semibold text-slate-800"
          >
            {getQuantityLabel(selectedType, countMode)}
          </label>

          <input
            id="quantity"
            type="number"
            min="1"
            step={selectedType === "pallets" ? "any" : "1"}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder={getQuantityPlaceholder(selectedType, countMode)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
          />

          <p className="text-xs leading-5 text-slate-500">
            {getHelperText(selectedType, countMode)}
          </p>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="batch"
            className="block text-sm font-semibold text-slate-800"
          >
            Batch (optional)
          </label>

          <input
            id="batch"
            type="number"
            min="1"
            step="1"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            placeholder="Enter batch"
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
        >
          Add entry
        </button>
      </form>
    </section>
  );
}
