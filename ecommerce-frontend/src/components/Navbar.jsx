import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { auth, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const storeNames = {
    211: "Flower Store",
    212: "Medical Store",
    213: "Grocery Store",
    214: "Electronics Store",
  };

  const storeName = storeNames[auth.storeId] || "Select Store";

  const canSwitchStore =
    auth.roles == "ROLE_ADMIN" || auth.roles == "ROLE_SUPERADMIN";

  const handleStoreChange = (e) => {
    const newStore = e.target.value;
    sessionStorage.setItem("storeId", newStore);
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand fw-bold" to="/">
        {auth.roles == "ROLE_ADMIN" || auth.roles == "ROLE_SUPERADMIN"
          ? "Admin Panel"
          : storeName}
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        {auth.roles !== "ROLE_ADMIN" && auth.roles !== "ROLE_SUPERADMIN" && (
          <form className="d-flex mx-auto" style={{ width: "50%" }}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search products..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  navigate(`/search?query=${e.target.value}`);
                }
              }}
            />
            <button className="btn btn-outline-light" type="button">
              <i className="bi bi-search"></i>
            </button>
          </form>
        )}

        <ul className="navbar-nav ms-auto">
          {canSwitchStore && (
            <li className="nav-item me-3">
              <select
                className="form-select"
                value={auth.storeId}
                onChange={handleStoreChange}
              >
                <option value="211">Flower Store</option>
                <option value="212">Medical Store</option>
                <option value="213">Grocery Store</option>
                <option value="214">Electronics Store</option>
              </select>
            </li>
          )}

          {auth.roles == "ROLE_ADMIN" && (
            <li className="nav-item me-3">
              <Link className="btn btn-warning" to="/admin/analytics">
                Admin Dashboard
              </Link>
            </li>
          )}

          {(auth.roles == "ROLE_CUSTOMER") && (
            <li className="nav-item">
              <Link className="nav-link position-relative" to="/cart">
                <i className="bi bi-cart3 fs-5"></i>
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
          )}

          {auth.token ? (
            <li className="nav-item dropdown ms-3">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="userDropdown"
                role="button"
                data-bs-toggle="dropdown"
              >
                {auth.username}
              </a>

              <ul className="dropdown-menu dropdown-menu-end">
                {auth.roles == "ROLE_CUSTOMER" && (
                  <li>
                    <Link className="dropdown-item" to="/orders">
                      My Orders
                    </Link>
                  </li>
                )}

                <li>
                  <button className="dropdown-item" onClick={logout}>
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          ) : (
            <li className="nav-item ms-3">
              <Link className="btn btn-outline-light" to="/login">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
