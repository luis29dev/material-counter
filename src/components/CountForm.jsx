import { useState } from "react";

import {
  COUNT_TYPES,
  getHelperText,
  getQuantityLabel,
  getQuantityPlaceholder,
} from "../helpers/countFormHelpers";

function CountForm({ onAddEntry, countMode }) {
  const [selectedType, setSelectedType] = useState("individual_boxes");
  const [quantity, setQuantity] = useState("");
  const [batch, setBatch] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const trimmedBatch = batch.trim();
    const parsedQuantity = Number(quantity);

    if (!quantity || parsedQuantity <= 0) return;

    const newEntry = {
      id: crypto.randomUUID(),
      type: selectedType,
      quantity: parsedQuantity,
      batch: trimmedBatch,
    };

    onAddEntry(newEntry);

    setQuantity("");
    setBatch("");
  }
  return (
    <div>
      <section className="">
        <h2 className="text-lg font-semibold text-slate-900">Add Count</h2>
        <p className="mt-1 text-sm text-slate-600">
          Select a count type, enter a quantity, and optionally add a batch.
        </p>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="countType"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Count Type
            </label>
            <select
              id="countType"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-0 focus:border-slate-400"
            >
              {COUNT_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="quantity"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              {getQuantityLabel(selectedType, countMode)}
            </label>
            <input
              id="quantity"
              type="number"
              min="0"
              step="any"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder={getQuantityPlaceholder(selectedType, countMode)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-slate-400"
            />
          </div>
          <p className="mt-1 text-xs text-slate-500">
            {getHelperText(selectedType, countMode)}
          </p>
          <div>
            <label
              htmlFor="batch"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Batch (optional)
            </label>
            <input
              id="batch"
              type="text"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              placeholder="Enter batch"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-slate-400"
            />
          </div>

          <button
            type="button"
            className="w-full rounded-xl bg-emerald-900 hover:bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Add entry
          </button>
        </form>
      </section>
    </div>
  );
}

export default CountForm;
