import React, { useState, useEffect } from "react";

function App() {
  const [kpis, setKpis] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  // Fetch all KPIs
  const fetchKpis = () => {
    fetch("http://127.0.0.1:8000/api/kpi")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setKpis(data.data); // assuming your Laravel response has 'data'
      })
      .catch((error) => {
        console.error("Error fetching KPIs:", error);
      });
  };

  useEffect(() => {
    fetchKpis();
  }, []);

  // Add new KPI
  const handleSubmit = (e) => {
    e.preventDefault();

    const newKpi = { name, age: Number(age) };

    fetch("http://127.0.0.1:8000/api/kpi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newKpi),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log("KPI added:", data);
        setName("");
        setAge("");
        fetchKpis(); // refresh the KPI list
      })
      .catch((error) => {
        console.error("Error adding KPI:", error);
      });
  };

  return (
    <div>
      <h2>KPI List</h2>
      <ul>
        {kpis.map((kpi) => (
          <li key={kpi.id}>
            {kpi.name}: {kpi.age}
          </li>
        ))}
      </ul>

      <h2>Add New KPI</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Value:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add KPI</button>
      </form>
    </div>
  );
}

export default App;
