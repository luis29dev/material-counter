export const UNITS_PER_BOX = {
  trays: 500,
  bags: 1500,
};

export function getConvertedEntryTotal(entry, countMode) {
  if (entry.type === "pallets") {
    return entry.quantity;
  }

  if (entry.type === "individual_boxes" || entry.type === "partial_pallets") {
    return entry.quantity * UNITS_PER_BOX[countMode];
  }

  return 0;
}

export function groupEntriesByBatch(entries, countMode) {
  return entries.reduce((groups, entry) => {
    const batchKey = entry.batch || "No batch";
    const convertedTotal = getConvertedEntryTotal(entry, countMode);

    if (!groups[batchKey]) {
      groups[batchKey] = {
        batch: batchKey,
        total: 0,
      };
    }

    groups[batchKey].total += convertedTotal;

    return groups;
  }, {});
}

export function getBatchSummary(entries, countMode) {
  const groupedObject = groupEntriesByBatch(entries, countMode);
  return Object.values(groupedObject);
}

export function getGrandTotal(entries, countMode) {
  return entries.reduce((sum, entry) => {
    return sum + getConvertedEntryTotal(entry, countMode);
  }, 0);
}
