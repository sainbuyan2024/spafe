import React, { useState, useEffect } from "react";
import api from "../api/axios";

function Attendance() {
  const [attendances, setAttendances] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [attendanceStatuses, setAttendanceStatuses] = useState({}); // Store individual attendance statuses
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("null");
  const [selectedStatus, setSelectedStatus] = useState(null);
  

  const saveAttendance = async () => {
  const attendanceData = {
    student_id: selectedStudentId, // Сурагчийн ID
    course_id: selectedCourseId,   // Ангийн ID
    stat_id: selectedStatus,       // Ирцийн төлөв (Ирсэн, тасалсан гэх мэт)
    //adate: selectedDate,         // Огноо
  };

  try {
    // Ирц хадгалах хүсэлт
    const response = await api.post("attendances", attendanceData);
    console.log("Attendance saved:", response.data);
    fetchData(); // Хүснэгтэд шинэчлэлт хийх
  } catch (err) {
    setError("Ирц хадгалах явцад алдаа гарлаа: " + err.message);
  }
};


  // Анхны өгөгдлийг татах
  const fetchData = async () => {
    setLoading(true);
    try {
      const [attendanceRes, studentsRes, coursesRes] = await Promise.all([
        api.get("attendances"),
        api.get("students"),
        api.get("courses"),
      ]);
      setAttendances(attendanceRes.data.data);
      setStudents(studentsRes.data.data);
      setCourses(coursesRes.data.data);
    } catch (err) {
      setError("Алдаа гарлаа: " + err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);


  // Сонгосон ангийн оюутнуудыг шүүнэ
  useEffect(() => {
    if (selectedCourseId) {
      setFilteredStudents(
        students.filter((student) => student.course_id === parseInt(selectedCourseId))
      );
    } else {
      setFilteredStudents([]);
    }
  }, [selectedCourseId, students]);


  // Оюутны ирцийн сонгох 
  const handleAttendanceChange = (studentId, status) => {
    setAttendanceStatuses((prevStatuses) => ({
      ...prevStatuses,
      [studentId]: status,
    }));
  };


  // Бүх сурагчийн ирцийн бүртгэлийг хадгалах
  const saveAllAttendances = async () => {
    try {
      const attendanceData = filteredStudents.map((student) => ({
        course_id: selectedCourseId,
        student_id: student.id,
        stat_id: attendanceStatuses[student.id], // Оюутан бүрийн ирцийн төлөв сонгох
        adate: selectedDate,
      }));
      console.log(attendanceData);
      //await api.post("students", { ...newStudent, course_id: selectedCourse });
      
      await api.post("attendances", attendanceData);
      fetchData(); // Бүх сурагчийн ирцийг хадгалсны refresh хийх
    } catch (err) {
      setError("Ирц хадгалах явцад алдаа гарлаа.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Attendance Management</h1>

      {loading ? (
        <p>Татаж байна...</p>
      ) : (
        <>
          {/* анги ба огнооны сонголт */}
          <div className="flex space-x-4 mb-4">
            <div>
              <label className="block text-sm font-medium">Анги</label>
              <select
                className="w-full border rounded p-2"
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
              >
                <option value="">Анги сонгоно уу</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.grade} - {course.group}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Өдөр</label>
              <input
                type="date"
                className="w-full border rounded p-2"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>

          {/* Сонгосон ангийн оюутнуудын жагсаалт */}
          {filteredStudents.length > 0 && (
            <table className="min-w-full bg-white rounded border mb-4">
              <thead>
                <tr>
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Овог</th>
                  <th className="p-2 border">Нэр</th>
                  <th className="p-2 border">Ирцийн төлөв</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr key={student.id}>
                    <td className="p-2 border text-center">{index + 1}</td>
                    <td className="p-2 border">{student.lastName}</td>
                    <td className="p-2 border">{student.firstName}</td>
                    <td className="p-2 border">
                      <select
                        className="w-full border rounded"
                        value={attendanceStatuses[student.id] || ""}
                        onChange={(e) =>
                          handleAttendanceChange(student.id, e.target.value)
                        }
                      >
                        <option value="">Сонгоно уу</option>
                        <option value="1">Ирсэн</option>
                        <option value="2">Өвчтэй</option>
                        <option value="3">Чөлөөтэй</option>
                        <option value="4">Тасалсан</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Save all button */}
          {filteredStudents.length > 0 && (
            <div className="mt-4 text-center">
              <button
                className="bg-green-500 text-white rounded px-6 py-2"
                onClick={saveAllAttendances}
              >
                Нийт хадгалах
              </button>
            </div>
          )}
        </>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default Attendance;