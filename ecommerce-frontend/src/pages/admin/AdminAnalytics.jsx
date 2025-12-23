import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts";
import AdminSidebar from "../../components/layout/AdminSidebar";
import AdminHeader from "../../components/layout/AdminHeader";
import statsAdminApi from "../../api/statsAdminApi";
import DateRangeSelector from "../../components/forms/DateRangeSelector";
import exportPdf from "../../utils/exportPdf";
import { mockAnalytics } from "../../utils/mockAnalytics";
import exportCsv from "../../utils/exportCsv";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#8dd1e1"];

export default function AdminAnalytics() {
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  const [summary, setSummary] = useState({
    orders: 0,
    revenue: 0,
    avgOrderValue: 0,
    customers: 0
  });

  const [salesData, setSalesData] = useState([]);
  const [catData, setCatData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  const [metric, setMetric] = useState("revenue");

  useEffect(() => {
    loadAll(days);
  }, []);

  const loadAll = async (range) => {
    setLoading(true);
    try {
      const s = await statsAdminApi.getSummary(range);
      const sales = await statsAdminApi.getSalesOverTime(range);
      const cat = await statsAdminApi.getTopCategories(range);
      const top = await statsAdminApi.getTopProducts(range);

      setSummary(s.data || s);
      setSalesData(sales.data || sales || []);
      setCatData(cat.data || cat || []);
      setTopProducts(top.data || top || []);
    } catch {
      setSummary(mockAnalytics.summary);
      setSalesData(mockAnalytics.sales);
      setCatData(mockAnalytics.categories);
      setTopProducts([
        { name: "iPhone 15", quantity: 120, revenue: 180000 },
        { name: "Samsung M55", quantity: 98, revenue: 120000 },
        { name: "Paracetamol", quantity: 150, revenue: 45000 },
        { name: "Rose Bouquet", quantity: 70, revenue: 28000 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="flex-grow-1">
        <AdminHeader />

        <div className="container mt-4">

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Analytics</h3>
            <div className="d-flex gap-2 align-items-center">
              <DateRangeSelector
                days={days}
                onChange={(d) => {
                  setDays(d);
                  loadAll(d);
                }}
              />
              <button
                className="btn btn-outline-success btn-sm"
                onClick={() => exportCsv(salesData, "sales")}
              >
                CSV
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => exportPdf(salesData, "sales")}
              >
                PDF
              </button>
            </div>
          </div>

          <small className="text-muted">Last {days} days</small>

          <div className="row g-3 mb-4">
            <div className="col-md-3">
              <div className="card p-3 shadow-sm">
                <small>Orders</small>
                <h4>{loading ? "—" : summary.orders}</h4>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card p-3 shadow-sm">
                <small>Revenue</small>
                <h4>₹{loading ? "—" : summary.revenue.toLocaleString()}</h4>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card p-3 shadow-sm">
                <small>Avg Order Value</small>
                <h4>₹{loading ? "—" : Math.round(summary.avgOrderValue)}</h4>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card p-3 shadow-sm">
                <small>Customers</small>
                <h4>{loading ? "—" : summary.customers}</h4>
              </div>
            </div>
          </div>

          <div className="card p-3 shadow-sm mb-4">
            <h5>Sales Over Time</h5>
            <div style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card p-3 shadow-sm mb-4">
            <h5>Top Categories</h5>

            <div style={{ width: "100%", height: 350 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={catData} dataKey="amount" nameKey="category" outerRadius={110} label>
                    {catData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-3">
              {catData.map((c, i) => (
                <div key={i} className="d-flex justify-content-between mb-1">
                  <div>
                    <span
                      className="badge me-2"
                      style={{ background: COLORS[i % COLORS.length], width: 10, height: 10 }}
                    ></span>
                    {c.category}
                  </div>
                  <div>₹{c.amount.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-3 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>Top Products</h5>

              <div className="d-flex gap-2">
                <button
                  className={`btn btn-sm ${metric === "revenue" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setMetric("revenue")}
                >
                  Revenue
                </button>

                <button
                  className={`btn btn-sm ${metric === "quantity" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setMetric("quantity")}
                >
                  Quantity
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6 mb-3">
                <table className="table table-bordered table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map((p, i) => (
                      <tr key={i}>
                        <td>{p.name}</td>
                        <td>{p.quantity}</td>
                        <td>₹{p.revenue.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="col-lg-6">
                <div style={{ width: "100%", height: 320 }}>
                  <ResponsiveContainer>
                    <BarChart data={topProducts}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-18} textAnchor="end" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey={metric}
                        fill={metric === "revenue" ? "#8884d8" : "#82ca9d"}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-3 shadow-sm mt-4">
            <h6>Insights</h6>
            <ul>
              <li>Top category: {catData[0]?.category || "—"}</li>
              <li>
                Best sales day:{" "}
                {salesData.length
                  ? salesData.reduce((a, b) => (a.total > b.total ? a : b)).date
                  : "—"}
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
