import { useEffect, useState } from "react";
import CountForm from "./components/CountForm";
import Header from "./components/Header";
import EntryList from "./components/EntryList";
import CountModeSelector from "./components/CountModeSelector";
import Summary from "./components/Summary";

export default function App() {
 const [entries, setEntries] = useState(() => {
  const stored = localStorage.getItem("entries");

  try {
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to parse entries from localStorage", error);
    return [];
  }
});

  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  const [countMode, setCountMode] = useState("trays");

  const traysEntries = entries.filter((entry) => entry.countMode === "trays");

  const bagsEntries = entries.filter((entry) => entry.countMode === "bags");
  const butterEntries = entries.filter((entry) => entry.countMode === "butter");

  function handleAddEntry(newEntry) {
    setEntries((currentEntries) => [newEntry, ...currentEntries]);
  }

  function handleDeleteEntry(entryId) {
    setEntries((currentEntries) =>
      currentEntries.filter((entry) => entry.id !== entryId),
    );
  }
  function handleResetCount() {
    if (entries.length === 0) return;

    const shouldReset = window.confirm(
      "Are you sure you want to reset the current count? This will remove all entries.",
    );

    if (!shouldReset) return;

    localStorage.removeItem("entries");

    setEntries([]);
  }

  return (
    <div className="min-h-dvh bg-slate-200">
      <Header />

      <main className="mx-auto flex min-h-[75dvh] max-w-3xl flex-col gap-6 px-4 py-6 pb-20">
        <CountModeSelector
          countMode={countMode}
          onChangeCountMode={setCountMode}
          onResetCount={handleResetCount}
        />

        <CountForm onAddEntry={handleAddEntry} countMode={countMode} />

        {traysEntries.length > 0 && (
          <EntryList
            entries={traysEntries}
            onDeleteEntry={handleDeleteEntry}
            title="Trays Entries"
          />
        )}

        {bagsEntries.length > 0 && (
          <EntryList
            entries={bagsEntries}
            onDeleteEntry={handleDeleteEntry}
            title="Bags Entries"
          />
        )}

        {butterEntries.length > 0 && (
          <EntryList
            entries={butterEntries}
            onDeleteEntry={handleDeleteEntry}
            title="Butter Entries"
          />
        )}

        {traysEntries.length > 0 && (
          <Summary title="Trays Summary" entries={traysEntries} />
        )}

        {bagsEntries.length > 0 && (
          <Summary title="Bags Summary" entries={bagsEntries} />
        )}

        {butterEntries.length > 0 && (
          <Summary title="Butter Summary" entries={butterEntries} />
        )}
      </main>
    </div>
  );
}
