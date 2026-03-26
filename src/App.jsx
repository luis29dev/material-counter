import { useState } from "react";
import CountForm from "./components/CountForm";
import Header from "./components/Header";

export default function App() {
  const [entries, setEntries] = useState([]);

  function handleAddEntry(newEntry) {
    setEntries((currentEntries) => [...currentEntries, newEntry]);
    console.log("New entry added:", newEntry);
  }
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-6">
        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <CountForm onAddEntry={handleAddEntry} />
        </section>
      </main>
    </div>
  );
}
