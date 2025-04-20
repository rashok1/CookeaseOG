import React, { useState } from "react";

function AdminImportPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");

  const handleImport = async () => {
    try {
      const res = await fetch(`/import-recipes/${query}`);
      const data = await res.json();
      setStatus(data.message || "Import completed.");
    } catch (err) {
      setStatus("❌ Import failed. Check console.");
      console.error(err);
    }
  };

  return (
    <div className="login-card" style={{ margin: "2rem auto", maxWidth: "600px" }}>
      <h2>📥 Import Recipes from Google API</h2>
      <input
        type="text"
        placeholder="e.g. pasta, curry"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
      />
      <button onClick={handleImport} style={{ padding: "0.5rem 1rem" }}>
        Import Recipes
      </button>
      {status && <p style={{ marginTop: "1rem" }}>{status}</p>}
    </div>
  );
}

export default AdminImportPage;