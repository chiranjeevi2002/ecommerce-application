import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="bg-dark text-white p-3 vh-100" style={{ width: "240px" }}>
      <h4 className="mb-4">Admin Panel</h4>

      <ul className="nav flex-column">

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/admin">
            Dashboard
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/admin/products">
            Products
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/admin/orders">
            Orders
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/admin/inventory">
            Inventory
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/admin/analytics">Analytics</Link>
        </li>


      </ul>
    </div>
  );
}

