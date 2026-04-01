function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-3xl px-4 py-6">
        <h1 className="text-2xl font-bold text-emerald-900">
          Inventory Count Calculator
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Count boxes, pallets, partial pallets, and flow wraps by batch.
        </p>
      </div>
    </header>
  );
}

export default Header;
