import React, { useState, useEffect } from "react";
import api from "../api/axios";
//import axios from "axios";

function Stats() {
  const [stats, setStats] = useState([]);
  const [name, setName] = useState("");
  const [abr, setAbr] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // Fetch stats data
  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await api.get("stats");
      setStats(response.data.data);
    } catch (err) {
      setError("Төлөвийн мэдээллийг татах явцад алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStats();
  }, []);


  // Add new stat
  const addStat = async (e) => {
    e.preventDefault();
    try {
      await api.post("stats", { name, abr });
      setName("");
      setAbr("");
      fetchStats();
    } catch (err) {
      setError("Төлөв нэмэх явцад алдаа гарлаа.");
    }
  };


  // Delete stat
  const deleteStat = async (id) => {
    try {
      await api.delete(`stats/${id}`);
      fetchStats();
    } catch (err) {
      setError("Төлөв устгах явцад алдаа гарлаа.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ирцийн Төлөв</h1>
      <form className="mb-4" onSubmit={addStat}>
        <div className="flex items space-x-2">
          <input
            type="text"
            placeholder="Төлөвийн нэр"
            className="border rounded p-2 flex-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Товчлол"
            className="border rounded p-2 w-20"
            value={abr}
            onChange={(e) => setAbr(e.target.value)}
          />

          <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
            Нэмэх
          </button>

        </div>
      </form>
      {loading ? (
        <p>Татаж байна...</p>
      ) : (
        <table className="min-w-full bg-white rounded border">
          <thead>
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Төлөвийн Нэр</th>
              <th className="p-2 border">Товчлол</th>
              <th className="p-2 border">Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            
            {stats.map((stat, index) => (
              <tr key={stat.id}>
                <td className="p-2 border text-center">{index + 1}</td>
                <td className="p-2 border">{stat.name}</td>
                <td className="p-2 border">{stat.abr}</td>
                <td className="p-2 border text-center">
                  <button
                    className="bg-red-500 text-white rounded px-2 py-1"
                    onClick={() => deleteStat(stat.id)}
                  >
                    Устгах
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default Stats
