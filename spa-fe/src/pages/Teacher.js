import React, { useState, useEffect } from "react";
import api from "../api/axios";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    phoneNumber: "",
    lesson: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Багш нарын мэдээллийг татах
  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const response = await api.get("teachers");
      setTeachers(response.data.data);
    } catch (err) {
      setError("Багш нарын мэдээллийг татах явцад алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  // Шинэ багш нэмэх
  const addTeacher = async () => {
    const { firstName, lastName, gender, phoneNumber, lesson } = newTeacher;
    if (!firstName || !lastName || !gender || !phoneNumber || !lesson) {
      alert("Бүх талбаруудыг бөглөнө үү.");
      return;
    }
    try {
      const response = await api.post("teachers", newTeacher);
      setTeachers((prev) => [...prev, response.data]);
      setNewTeacher({ firstName: "", lastName: "", gender: "", phoneNumber: "", lesson: "" });
      alert("Шинэ багш амжилттай нэмэгдлээ!");
      fetchTeachers();
    } catch (err) {
      setError("Шинэ багш нэмэх явцад алдаа гарлаа.");
    }
  };

  // Багшийг устгах
  const deleteTeacher = async (id) => {
    try {
      await api.delete(`teachers/${id}`);
      setTeachers((prev) => prev.filter((teacher) => teacher.id !== id));
      alert("Багш амжилттай устгагдлаа!");
      fetchTeachers();
    } catch (err) {
      setError("Багш устгах явцад алдаа гарлаа.");
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Багш нарын Удирдлага</h1>
      {loading ? (
        <p>Татаж байна...</p>
      ) : (
        <>
          {/* Багш нарын жагсаалт */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Багш нар:</h2>
            {teachers.length > 0 ? (
              <table className="min-w-full bg-white rounded border">
                <thead>
                  <tr>
                    <th className="p-2 border">#</th>
                    <th className="p-2 border">Овог</th>
                    <th className="p-2 border">Нэр</th>
                    <th className="p-2 border">Хүйс</th>
                    <th className="p-2 border">Утасны дугаар</th>
                    <th className="p-2 border">Хичээл</th>
                    <th className="p-2 border">Устгах</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher, index) => (
                    <tr key={teacher.id}>
                      <td className="p-2 border text-center">{index + 1}</td>
                      <td className="p-2 border">{teacher.lastName}</td>
                      <td className="p-2 border">{teacher.firstName}</td>
                      <td className="p-2 border">{teacher.gender}</td>
                      <td className="p-2 border">{teacher.phoneNumber}</td>
                      <td className="p-2 border">{teacher.lesson}</td>
                      <td className="p-2 border text-center">
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded"
                          onClick={() => deleteTeacher(teacher.id)}
                        >
                          Устгах
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Багш нарын мэдээлэл алга байна.</p>
            )}
          </div>

          {/* Шинэ багш нэмэх хэсэг */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Шинэ багш нэмэх:</h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Овог"
                name="lastName"
                value={newTeacher.lastName}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, lastName: e.target.value })
                }
                className="border rounded p-2 w-full"
              />
              <input
                type="text"
                placeholder="Нэр"
                name="firstName"
                value={newTeacher.firstName}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, firstName: e.target.value })
                }
                className="border rounded p-2 w-full"
              />
              <input
                type="text"
                placeholder="Хүйс (Эрэгтэй/Эмэгтэй)"
                name="gender"
                value={newTeacher.gender}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, gender: e.target.value })
                }
                className="border rounded p-2 w-full"
              />
              <input
                type="text"
                placeholder="Утасны дугаар"
                name="phoneNumber"
                value={newTeacher.phoneNumber}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, phoneNumber: e.target.value })
                }
                className="border rounded p-2 w-full"
              />
              <input
                type="text"
                placeholder="Хичээл"
                name="lesson"
                value={newTeacher.lesson}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, lesson: e.target.value })
                }
                className="border rounded p-2 w-full"
              />
              <button
                className="bg-green-500 text-white px-6 py-2 rounded"
                onClick={addTeacher}
              >
                Нэмэх
              </button>
            </div>
          </div>
        </>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default Teachers;