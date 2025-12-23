import React, { useEffect, useState } from "react";
import adminRoleApi from "../../api/adminRoleApi";
import adminUserApi from "../../api/adminUserApi";

export default function EditRolesModal({ show, onClose, user, onSaved }) {
  const [roles, setRoles] = useState([]);
  const [selectedRoleIds, setSelectedRoleIds] = useState(new Set());
  const [saving, setSaving] = useState(false);
  const SUPERADMIN_ID = 202129;

  useEffect(() => {
    if (!show) return;
    adminRoleApi.getAll().then(res => setRoles(res.data)).catch(err => {
      console.error("Failed to load roles", err);
      setRoles([]);
    });

    if (user) {
      const s = new Set();
      (user.roles || []).forEach(rn => {
        s.add(rn);
      });
      setSelectedRoleIds(new Set());
    }
  }, [show, user]);

  useEffect(() => {
    if (!user || roles.length === 0) return;
    const roleNameToId = Object.fromEntries(roles.map(r => [r.name, r.id]));
    const ids = new Set();
    (user.roles || []).forEach(rn => {
      if (roleNameToId[rn] !== undefined) ids.add(roleNameToId[rn]);
    });
    setSelectedRoleIds(ids);
  }, [user, roles]);

  const toggleRole = (id) => {
    const next = new Set(selectedRoleIds);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelectedRoleIds(next);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        userId: user.id,
        storeId: user.storeId || null,
        roleIds: Array.from(selectedRoleIds),
      };

      if (!isCurrentUserSuperadmin() && payload.roleIds.includes(SUPERADMIN_ID)) {
        alert("Only Superadmin can assign Superadmin role.");
        setSaving(false);
        return;
      }

      await adminUserApi.updateRoles(payload);
      onSaved(); 
      onClose();
    } catch (err) {
      console.error("Failed to update roles", err);
      alert(err?.response?.data?.message || "Failed to update roles");
    } finally {
      setSaving(false);
    }
  };

  function isCurrentUserSuperadmin() {
    return false;
  }

  if (!show || !user) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Roles for {user.username}</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Store ID:</strong> {user.storeId ?? "—"}</p>

            <div className="row">
              {roles.map(role => (
                <div className="col-12 col-md-6" key={role.id}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`role-${role.id}`}
                      checked={selectedRoleIds.has(role.id)}
                      onChange={() => toggleRole(role.id)}
                    />
                    <label className="form-check-label" htmlFor={`role-${role.id}`}>
                      {role.name} <small className="text-muted">({role.id})</small>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={saving}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
