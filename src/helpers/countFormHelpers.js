export const COUNT_TYPES = [
  { value: "individual_boxes", label: "Individual Boxes" },
  { value: "pallets", label: "Pallets" },
  { value: "partial_pallets", label: "Partial Pallets" },
  //{ value: "flow_wrap_rolls", label: "Flow Wrap Rolls" },
  //{ value: "flow_wrap_ft", label: "Flow Wraps Ft" },
  //{ value: "flow_wrap_pallet", label: "Flow Wrap Pallets" },
];

export function getQuantityLabel(selectedType, countMode) {
  if (selectedType === "pallets") {
    return `Total ${countMode}`;
  }

  if (selectedType === "individual_boxes") {
    return "Number of boxes";
  }

  if (selectedType === "partial_pallets") {
    return "Number of boxes on partial pallet";
  }

  return "Quantity";
}

export function getQuantityPlaceholder(selectedType, countMode) {
  if (selectedType === "pallets") {
    return `Enter total ${countMode}`;
  }

  if (selectedType === "individual_boxes") {
    return "Enter number of boxes";
  }

  if (selectedType === "partial_pallets") {
    return "Enter boxes on partial pallet";
  }

  return "Enter quantity";
}

export function getHelperText(selectedType, countMode) {
  if (selectedType === "pallets") {
    return `Enter the full quantity already expressed in ${countMode}.`;
  }

  if (selectedType === "individual_boxes") {
    return `Enter the number of boxes. Each box will be converted into individual ${countMode} in the summary.`;
  }

  if (selectedType === "partial_pallets") {
    return `Enter the number of boxes on the partial pallet. These boxes will be converted into individual ${countMode} in the summary.`;
  }

  return "";
}
