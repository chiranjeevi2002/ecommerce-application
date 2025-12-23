import AdminSidebar from "../../components/layout/AdminSidebar";
import AdminHeader from "../../components/layout/AdminHeader";

export default function AdminDashboard() {
  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="flex-grow-1">
        <AdminHeader />

        <div className="container mt-4">

          <h3>Welcome, Admin</h3>
          <p className="text-muted">
            Manage your store products, orders and inventory.
          </p>

          <div className="row mt-4">
            
            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h5>Products</h5>
                <p className="text-muted">Manage product catalogue.</p>
                <a href="/admin/products" className="btn btn-primary">
                  Go to Products
                </a>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h5>Orders</h5>
                <p className="text-muted">Track customer orders.</p>
                <a href="/admin/orders" className="btn btn-success">
                  Manage Orders
                </a>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h5>Inventory</h5>
                <p className="text-muted">Stock & Availability.</p>
                <a href="/admin/inventory" className="btn btn-info text-white">
                  View Inventory
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
