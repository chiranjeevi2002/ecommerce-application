export const mockSummary = {
  orders: 152,
  revenue: 1254300,
  avgOrderValue: Math.round(1254300 / 152),
  customers: 112,
};

export const mockSalesData = [
  { date: "2025-01-01", total: 45000 },
  { date: "2025-01-02", total: 38000 },
  { date: "2025-01-03", total: 52000 },
  { date: "2025-01-04", total: 61000 },
  { date: "2025-01-05", total: 43000 },
  { date: "2025-01-06", total: 48000 },
  { date: "2025-01-07", total: 57000 },
];

export const mockCategoryData = [
  { category: "Electronics", amount: 420000 },
  { category: "Grocery", amount: 290000 },
  { category: "Medical", amount: 150000 },
  { category: "Flowers", amount: 65000 },
];

export const mockAnalytics = {
  summary: mockSummary,
  sales: mockSalesData,
  categories: mockCategoryData,
};

