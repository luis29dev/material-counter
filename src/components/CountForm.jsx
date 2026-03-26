import { useState } from "react";

const COUNT_TYPES = [
  { value: "individual_boxes", label: "Individual Boxes" },
  { value: "pallets", label: "Pallets" },
  { value: "partial_pallets", label: "Partial Pallets" },
  { value: "flow_wrap_rolls", label: "Flow Wrap Rolls" },
  { value: "flow_wrap_ft", label: "Flow Wraps Ft" },
  { value: "flow_wrap_pallet", label: "Flow Wrap Pallets" },
];

function CountForm({ onAddEntry }) {
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
      <section>
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
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              min="0"
              step="any"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-slate-400"
            />
          </div>

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
            type="submit"
            className="w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Add entry
          </button>
        </form>
      </section>
    </div>
  );
}

export default CountForm;
