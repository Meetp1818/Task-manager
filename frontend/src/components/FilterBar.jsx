export function FilterBar({ filter, setFilter, counts }) {
  const filters = [
    { key: "all", label: "All", count: counts.all },
    { key: "incomplete", label: "Active", count: counts.incomplete },
    { key: "completed", label: "Done", count: counts.completed },
  ];

  return (
    <div className="filter-bar">
      {filters.map((f) => (
        <button
          key={f.key}
          className={`filter-bar__btn${filter === f.key ? " filter-bar_btn--active" : ""}`}
          onClick={() => setFilter(f.key)}
        >
          {f.label}
          <span className="filter-bar__count">{f.count}</span>
        </button>
      ))}
    </div>
  );
}