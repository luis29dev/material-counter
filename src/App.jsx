import { useState } from "react";
import CountForm from "./components/CountForm";
import Header from "./components/Header";
import EntryList from "./components/EntryList";
import CountModeSelector from "./components/CountModeSelector";
import Summary from "./components/Summary";

export default function App() {
  const [entries, setEntries] = useState([]);
  const [countMode, setCountMode] = useState("trays");

  function handleAddEntry(newEntry) {
    setEntries((currentEntries) => [newEntry, ...currentEntries]);
    console.log("New entry added:", newEntry);
  }

  function handleDeleteEntry(entryId) {
    setEntries((currentEntries) =>
      currentEntries.filter((entry) => entry.id !== entryId),
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-6">
        <CountModeSelector
          countMode={countMode}
          onChangeCountMode={setCountMode}
        />

        <CountForm onAddEntry={handleAddEntry} countMode={countMode} />

        <EntryList entries={entries} onDeleteEntry={handleDeleteEntry} />

        <Summary entries={entries} countMode={countMode} />
      </main>
    </div>
  );
}
