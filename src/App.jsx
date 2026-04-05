import { useState } from "react";
import CountForm from "./components/CountForm";
import Header from "./components/Header";
import EntryList from "./components/EntryList";
import CountModeSelector from "./components/CountModeSelector";
import Summary from "./components/Summary";

export default function App() {
  const [entries, setEntries] = useState([]);
  const [countMode, setCountMode] = useState("trays");

  const traysEntries = entries.filter((entry) => entry.countMode === "trays");

  const bagsEntries = entries.filter((entry) => entry.countMode === "bags");

  console.log("trays:", traysEntries);
  console.log("bags:", bagsEntries);

  const isCountModeLocked = entries.length > 0;

  function handleAddEntry(newEntry) {
    setEntries((currentEntries) => [newEntry, ...currentEntries]);
    console.log("New entry added:", newEntry);
  }

  function handleDeleteEntry(entryId) {
    setEntries((currentEntries) =>
      currentEntries.filter((entry) => entry.id !== entryId),
    );
  }
  function handleResetCount() {
    setEntries([]);
  }

  return (
    <div className="min-h-dvh bg-slate-200">
      <Header />

      <main className="mx-auto flex min-h-[75dvh] max-w-3xl flex-col gap-6 px-4 py-6 pb-20">
        <CountModeSelector
          countMode={countMode}
          onChangeCountMode={setCountMode}
          isLocked={isCountModeLocked}
          onResetCount={handleResetCount}
        />

        <CountForm onAddEntry={handleAddEntry} countMode={countMode} />

        <EntryList
          entries={entries}
          onDeleteEntry={handleDeleteEntry}
          countMode={countMode}
        />

        <Summary entries={entries} countMode={countMode} />
      </main>
    </div>
  );
}
