import React, { useState, useEffect } from "react";
import api from "../api/axios";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  const [newStudent, setNewStudent] = useState({
    course_id: "",
    firstName: "",
    lastName: "",
    gender: "",
    phoneNumber: "",
    RD: "",
    isActive: "1",
  });

  // Fetch courses
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await api.get("courses");
      setCourses(response.data.data);
    } catch {
      setError("Ангиудын мэдээллийг татах явцад алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch students of the selected course
  const fetchStudents = async (courseId) => {
    setLoading(true);
    try {
      const response = await api.get(`students?course_id=${courseId}`);
      setStudents(response.data.data);
    } catch {
      setError("Сурагчдын мэдээллийг татах явцад алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  // Handle changes in new student input fields
  const handleNewStudentChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new student to the selected course
  const addStudent = async () => {
    if (!selectedCourse) {
      setError("Эхлээд анги сонгоно уу!");
      return;
    }

    const { course_id, firstName, lastName, gender, phoneNumber, RD } = newStudent;
    if (!firstName || !lastName || !gender || !phoneNumber || !RD) {
      setError("Бүх талбарыг бөглөнө үү.");
      return;
    }

    try {
      let sss={ ...newStudent, course_id: selectedCourse };
      console.log(sss);
      await api.post("students", sss);

      setNewStudent({
        course_id: "",
        firstName: "",
        lastName: "",
        gender: "",
        phoneNumber: "",
        RD: "",
        isActive: "1",
      });
      await fetchStudents(selectedCourse);
      setSuccessMessage("Шинэ сурагч амжилттай нэмэгдлээ!");
      setError(""); // Clear any previous errors
    } catch {
      setError("Сурагч нэмэх явцад алдаа гарлаа.");
    }
  };

  // Handle course selection
  const handleCourseSelect = (e) => {
    const courseId = e.target.value;
    setSelectedCourse(courseId);
    setSuccessMessage("");
    setError("");
    if (courseId) {
      fetchStudents(courseId);
    } else {
      setStudents([]);
    }
    setFilteredStudents(students.filter((student) => student.course_id === parseInt(selectedCourse)));
  };

  // Delete student
  const deleteStudent = async (studentId) => {
    try {
      await api.delete(`students/${studentId}`);
      setSuccessMessage("Сурагч амжилттай устгагдлаа!");
      fetchStudents(selectedCourse); // Refresh the students list after deleting
    } catch {
      setError("Сурагч устгах явцад алдаа гарлаа.");
    }
  };

  useEffect(() => {
    fetchCourses();
    setFilteredStudents(students.filter((student) => student.course_id === parseInt(selectedCourse)));
  }, []);

  return (
    <div className="p-6">
      
      <h1 className="text-2xl font-bold mb-4">Ангиудын Удирдлага</h1>
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
              onChange={handleCourseSelect}
            >
              <option value="">Анги сонгоно уу</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.grade} - {course.group}
                </option>
              ))}
            </select>
          </div>

          {selectedCourse && (
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2">Шинэ сурагч нэмэх</h2>
              <div className="mb-2">

              <input
                  type="text"
                  name="course_id"
                  value={newStudent.course_id}
                  onChange={handleNewStudentChange}
                  placeholder="course_id"
                  className="border rounded p-2 w-full mb-2"
                />

                <input
                  type="text"
                  name="firstName"
                  value={newStudent.lastName}
                  onChange={handleNewStudentChange}
                  placeholder="Овог"
                  className="border rounded p-2 w-full mb-2"
                />
                <input
                  type="text"
                  name="lastName"
                  value={newStudent.firstName}
                  onChange={handleNewStudentChange}
                  placeholder="Нэр"
                  className="border rounded p-2 w-full mb-2"
                />
                <input
                  type="text"
                  name="gender"
                  value={newStudent.gender}
                  onChange={handleNewStudentChange}
                  placeholder="Хүйс"
                  className="border rounded p-2 w-full mb-2"
                />
                <input
                  type="text"
                  name="phoneNumber"
                  value={newStudent.phoneNumber}
                  onChange={handleNewStudentChange}
                  placeholder="Утасны дугаар"
                  className="border rounded p-2 w-full mb-2"
                />
                <input
                  type="text"
                  name="RD"
                  value={newStudent.RD}
                  onChange={handleNewStudentChange}
                  placeholder="Регистрийн дугаар"
                  className="border rounded p-2 w-full"
                />
              </div>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={addStudent}
              >
                Нэмэх
              </button>
            </div>
          )}

          {successMessage && <p className="text-green-500">{successMessage}</p>}
          {error && <p className="text-red-500">{error}</p>}

          {students.length === 0 ? (
            <p className="text-red-500">Одоогоор сурагч байхгүй байна.</p>
          ) : (
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-4">Сурагчдын Мэдээлэл</h2>
              <table className="min-w-full bg-white rounded border">
                <thead>
                  <tr>
                    <th className="p-2 border">#</th>
                    <th className="p-2 border">А_Д</th>
                    <th className="p-2 border">Овог</th>
                    <th className="p-2 border">Нэр</th>
                    <th className="p-2 border">Хүйс</th>
                    <th className="p-2 border">Утас</th>
                    <th className="p-2 border">РД</th>
                    <th className="p-2 border">Үйлдэл</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, index) => (
                    <tr key={student.id}>
                      <td className="p-2 border text-center">{index + 1}</td>
                      <td className="p-2 border">{student.course_id}</td>
                      <td className="p-2 border">{student.lastName}</td>
                      <td className="p-2 border">{student.firstName}</td>
                      <td className="p-2 border">{student.gender}</td>
                      <td className="p-2 border">{student.phoneNumber}</td>
                      <td className="p-2 border">{student.RD}</td>
                      <td className="p-2 border text-center">
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded"
                          onClick={() => deleteStudent(student.id)}
                        >
                          Устгах
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