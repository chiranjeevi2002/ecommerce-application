import React, { useEffect, useState } from "react";
import adminUserApi from "../../api/adminUserApi";
import EditRolesModal from "../../components/admin/EditRolesModal";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await adminUserApi.list({ size: 100 });
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to load users", err);
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const openEdit = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleSaved = () => {
    loadUsers();
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Users</h3>
        <button className="btn btn-primary" onClick={loadUsers}>Refresh</button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>StoreId</th>
              <th>Roles</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { loading ? (
              <tr><td colSpan="6">Loading...</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan="6">No users</td></tr>
            ) : users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.storeId ?? "—"}</td>
                <td>{(u.roles || []).join(", ")}</td>
                <td>
                  <button className="btn btn-sm btn-outline-primary" onClick={() => openEdit(u)}>Edit Roles</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedUser &&
        <EditRolesModal
          show={showModal}
          onClose={() => setShowModal(false)}
          user={selectedUser}
          onSaved={handleSaved}
        />
      }
    </div>
  );
}
