import React, { useState, useEffect } from "react";
import api from "../api/axios";

function Courses() {
  const [courses, setCourses] = useState([]); // Ангиуд
  const [students, setStudents] = useState([]); // Сурагчид
  const [selectedCourse, setSelectedCourse] = useState(""); // Сонгосон анги
  const [selectedDate, setSelectedDate] = useState(""); // Сонгосон огноо
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Ангиудын мэдээллийг татах
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await api.get("courses");
      setCourses(response.data.data || []);
    } catch {
      setError("Ангиудын мэдээллийг татах явцад алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  // Сонгосон анги болон огноогоор сурагчдын мэдээллийг татах
  const fetchStudentsWithAttendance = async (courseId, date) => {
    setLoading(true);
    try {
      const response = await api.get(
        `students?course_id=${courseId}&date=${date}`
      );
      setStudents(response.data.data || []);
    } catch {
      setError("Сурагчдын мэдээллийг татах явцад алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  // Ирцийн төлөвийг шинэчлэх
  const updateAttendance = async (studentId, attendanceStatus) => {
    try {
      await api.put(`students/${studentId}/attendance`, {
        attendanceStatus,
        date: selectedDate,
      });
      setSuccessMessage("Ирц амжилттай хадгалагдлаа!");
      fetchStudentsWithAttendance(selectedCourse, selectedDate); // Дахин татах
    } catch {
      setError("Ирц хадгалах явцад алдаа гарлаа.");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ангиудын Ирцийн Удирдлага</h1>
      {loading ? (
        <p>Татаж байна...</p>
      ) : (
        <>
          <div className="mb-4">
            <label htmlFor="course-select" className="block mb-2">
              Анги сонгох:
            </label>
            <select
              id="course-select"
              className="border rounded p-2 w-full"
              value={selectedCourse}
              onChange={(e) => {
                setSelectedCourse(e.target.value);
                if (e.target.value && selectedDate) {
                  fetchStudentsWithAttendance(e.target.value, selectedDate);
                }
              }}
            >
              <option value="">Анги сонгоно уу</option>
              {courses?.length > 0 &&
                courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.grade} - {course.group}
                  </option>
                ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="date-select" className="block mb-2">
              Огноо сонгох:
            </label>
            <input
              type="date"
              id="date-select"
              className="border rounded p-2 w-full"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                if (selectedCourse && e.target.value) {
                  fetchStudentsWithAttendance(selectedCourse, e.target.value);
                }
              }}
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}

          {students?.length === 0 ? (
            <p className="text-red-500">Сурагч байхгүй байна.</p>
          ) : (
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-4">Сурагчдын Ирцийн Мэдээлэл</h2>
              <table className="min-w-full bg-white rounded border">
                <thead>
                  <tr>
                    <th className="p-2 border">#</th>
                    <th className="p-2 border">Овог</th>
                    <th className="p-2 border">Нэр</th>
                    <th className="p-2 border">Ирцийн Төлөв</th>
                    <th className="p-2 border">Үйлдэл</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={student.id}>
                      <td className="p-2 border text-center">{index + 1}</td>
                      <td className="p-2 border">{student.lastName}</td>
                      <td className="p-2 border">{student.firstName}</td>
                      <td className="p-2 border">
                        <select
                          className="border rounded p-2"
                          value={student.attendanceStatus}
                          onChange={(e) =>
                            updateAttendance(student.id, e.target.value)
                          }
                        >
                          <option value="present">Ирсэн</option>
                          <option value="absent">Өвчтэй</option>
                          <option value="late">Чөлөөтэй</option>
                          <option value="excused">Тасалсан</option>
                        </select>
                      </td>
                      <td className="p-2 border text-center">
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded"
                          onClick={() =>
                            updateAttendance(student.id, student.attendanceStatus)
                          }
                        >
                          Ирц хадгалах
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Courses;