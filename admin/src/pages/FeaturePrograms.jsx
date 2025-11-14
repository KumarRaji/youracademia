// src/pages/FeaturePrograms.jsx
import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:3001/api/features";

export default function FeaturePrograms() {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [form, setForm] = useState({ heading: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Load all features
  const loadFeatures = async () => {
    try {
      setLoading(true);
      setLoadError(null);
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error("Failed to load features");
      const data = await res.json();
      setFeatures(data);
    } catch (err) {
      setLoadError(err.message || "Error loading features");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeatures();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({ heading: "", description: "" });
    setEditingId(null);
    setSubmitError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.heading.trim()) {
      setSubmitError("Heading is required");
      return;
    }

    try {
      setSubmitLoading(true);
      setSubmitError(null);

      let url = API_BASE;
      let method = "POST";

      if (editingId != null) {
        url = `${API_BASE}/${editingId}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || errData.error || "Save failed");
      }

      await loadFeatures();
      resetForm();
    } catch (err) {
      setSubmitError(err.message || "Something went wrong");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      heading: item.heading || "",
      description: item.description || "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feature?")) return;
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || errData.error || "Delete failed");
      }
      setFeatures((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete feature");
    }
  };

  return (
    <div>
      <h2>Feature Program Management</h2>
      <p>Manage the featured programs shown on your site.</p>

      {/* Form Card */}
      <div
        style={{
          marginTop: "1rem",
          marginBottom: "1.5rem",
          padding: "1rem",
          background: "#ffffff",
          borderRadius: "0.75rem",
          boxShadow: "0 1px 3px rgba(15,23,42,0.12)",
        }}
      >
        <h3 style={{ marginBottom: "0.75rem" }}>
          {editingId ? "Edit Feature" : "Add New Feature"}
        </h3>

        {submitError && (
          <div style={{ color: "red", marginBottom: "0.5rem" }}>
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "0.75rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.9rem",
                marginBottom: "0.25rem",
              }}
            >
              Heading *
            </label>
            <input
              type="text"
              name="heading"
              value={form.heading}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid #d1d5db",
              }}
              placeholder="e.g. Computer Science"
            />
          </div>

          <div style={{ marginBottom: "0.75rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.9rem",
                marginBottom: "0.25rem",
              }}
            >
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid #d1d5db",
                resize: "vertical",
              }}
              placeholder="Short description of the program"
            />
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              type="submit"
              disabled={submitLoading}
              style={{
                padding: "0.45rem 1rem",
                borderRadius: "0.5rem",
                border: "none",
                background: "#0ea5e9",
                color: "white",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              {submitLoading
                ? "Saving..."
                : editingId
                ? "Update Feature"
                : "Add Feature"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                style={{
                  padding: "0.45rem 1rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #9ca3af",
                  background: "white",
                  cursor: "pointer",
                }}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List Card */}
      <div
        style={{
          padding: "1rem",
          background: "#ffffff",
          borderRadius: "0.75rem",
          boxShadow: "0 1px 3px rgba(15,23,42,0.12)",
        }}
      >
        <div
          style={{
            marginBottom: "0.75rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 style={{ margin: 0 }}>Existing Features</h3>
          {loading && <span style={{ fontSize: "0.9rem" }}>Loading...</span>}
        </div>

        {loadError && (
          <div style={{ color: "red", marginBottom: "0.5rem" }}>
            {loadError}
          </div>
        )}

        {features.length === 0 && !loading ? (
          <p style={{ color: "#6b7280" }}>No features found. Add one above.</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.9rem",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    textAlign: "left",
                    padding: "0.5rem",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  ID
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "0.5rem",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  Heading
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "0.5rem",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  Description
                </th>
                <th
                  style={{
                    textAlign: "right",
                    padding: "0.5rem",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((item) => (
                <tr key={item.id}>
                  <td style={{ padding: "0.5rem", borderBottom: "1px solid #f3f4f6" }}>
                    {item.id}
                  </td>
                  <td style={{ padding: "0.5rem", borderBottom: "1px solid #f3f4f6" }}>
                    {item.heading}
                  </td>
                  <td
                    style={{
                      padding: "0.5rem",
                      borderBottom: "1px solid #f3f4f6",
                      maxWidth: "400px",
                    }}
                  >
                    {item.description}
                  </td>
                  <td
                    style={{
                      padding: "0.5rem",
                      borderBottom: "1px solid #f3f4f6",
                      textAlign: "right",
                    }}
                  >
                    <button
                      onClick={() => handleEdit(item)}
                      style={{
                        marginRight: "0.5rem",
                        padding: "0.25rem 0.6rem",
                        borderRadius: "0.375rem",
                        border: "1px solid #f59e0b",
                        background: "#fef3c7",
                        cursor: "pointer",
                        fontSize: "0.8rem",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      style={{
                        padding: "0.25rem 0.6rem",
                        borderRadius: "0.375rem",
                        border: "1px solid #ef4444",
                        background: "#fee2e2",
                        cursor: "pointer",
                        fontSize: "0.8rem",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
