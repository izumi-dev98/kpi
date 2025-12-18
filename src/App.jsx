import React, { useState, useEffect } from "react";

function App() {
  const [kpis, setKpis] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const fetchKpis = () => {
    fetch("http://127.0.0.1:8000/api/kpi")
      .then((response) => {
        if (!response.ok) throw new Error("Network error");
        return response.json();
      })
      .then((data) => setKpis(data.data || []))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchKpis();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/api/kpi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age: Number(age) }),
    })
      .then(() => {
        setName("");
        setAge("");
        fetchKpis();
      })
      .catch((err) => console.error(err));
  };

  // 🎨 Updated Color Styles
  const styles = {
    container: {
      maxWidth: "480px",
      margin: "0 auto",
      padding: "16px",
      background: "#f1f5f9", // light gray background
      minHeight: "100vh",
      fontFamily: "system-ui, sans-serif",
    },
    title: {
      textAlign: "center",
      marginBottom: "16px",
      color: "#0f172a", // dark slate
    },
    card: {
      background: "#ffffff",
      padding: "16px",
      borderRadius: "14px",
      marginBottom: "16px",
      boxShadow: "0 6px 16px rgba(15,23,42,0.08)",
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "12px",
      borderRadius: "10px",
      border: "1px solid #cbd5f5",
      fontSize: "16px",
      outline: "none",
    },
    button: {
      width: "100%",
      padding: "12px",
      background: "linear-gradient(135deg, #2563eb, #1e40af)",
      color: "#ffffff",
      border: "none",
      borderRadius: "10px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
    },
    listItem: {
      display: "flex",
      justifyContent: "space-between",
      padding: "12px 0",
      borderBottom: "1px solid #e2e8f0",
      color: "#334155",
    },
    badge: {
      background: "#dbeafe",
      color: "#1e40af",
      padding: "4px 10px",
      borderRadius: "999px",
      fontSize: "14px",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>KPI Dashboard</h1>

      <div style={styles.card}>
        <h2 style={{ color: "#1e293b" }}>Add KPI</h2>

        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />

          <button style={styles.button} type="submit">
            Add KPI
          </button>
        </form>
      </div>

      <div style={styles.card}>
        <h2 style={{ color: "#1e293b" }}>KPI List</h2>

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {kpis.map((kpi) => (
            <li key={kpi.id} style={styles.listItem}>
              <span>{kpi.name}</span>
              <span style={styles.badge}>{kpi.age}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
