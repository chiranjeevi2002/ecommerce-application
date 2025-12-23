
export default function DateRangeSelector({ days, onChange }) {
  return (
    <div className="d-flex align-items-center gap-2">
      <select
        className="form-select"
        style={{ width: "180px" }}
        value={days}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        <option value="7">Last 7 Days</option>
        <option value="14">Last 14 Days</option>
        <option value="30">Last 30 Days</option>
        <option value="90">Last 90 Days</option>
      </select>

      <button className="btn btn-outline-primary" onClick={() => onChange(days)}>
        Refresh
      </button>
    </div>
  );
}
