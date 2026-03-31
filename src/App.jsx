import { useState } from "react";
import CountForm from "./components/CountForm";
import Header from "./components/Header";
import EntryList from "./components/EntryList";
import CountModeSelector from "./components/CountModeSelector";

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
      <main className="mx-auto max-w-3xl px-4 py-6">
        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <CountModeSelector
            countMode={countMode}
            onChangeCountMode={setCountMode}
          />
          <CountForm onAddEntry={handleAddEntry} />
          <EntryList entries={entries} onDeleteEntry={handleDeleteEntry} />
        </section>
      </main>
    </div>
  );
}
