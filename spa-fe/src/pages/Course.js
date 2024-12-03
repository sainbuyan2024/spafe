import React, { useState, useEffect } from "react";
import api from "../api/axios";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    teacher_id: "",
    grade: "",
    group: "",
    YearLesson: "",
    isActive: "1",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await api.get("courses");
      setCourses(response.data.data);
    } catch (err) {
      setError("Ангиудын мэдээллийг татах явцад алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  const handleNewCourseChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({ ...prev, [name]: value }));
  };

  const addNewCourse = async () => {
    console.log(newCourse);
    const { teacher_id, grade, group, YearLesson } = newCourse;
    if (!teacher_id || !grade || !group || !YearLesson) {
      alert("Бүх талбарыг бөглөнө үү.");
      return;
    }
    try {
      await api.post("courses", newCourse);
      setNewCourse({ teacher_id: "", grade: "", group: "", YearLesson: "", isActive: "1" });
      console.log(newCourse);
      alert("Шинэ анги амжилттай нэмэгдлээ!");
      fetchCourses(); // Refresh the courses list after adding a new course
    } catch (err) {
      setError("Шинэ анги нэмэх явцад алдаа гарлаа.");
    }
  };

  const deleteCourse = async (courseId) => {
    try {
      await api.delete(`courses/${courseId}`);
      alert("Анги амжилттай устгагдлаа!");
      fetchCourses(); // Refresh the courses list after deleting a course
    } catch (err) {
      setError("Анги устгах явцад алдаа гарлаа.");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ангиудын Удирдлага</h1>
      {loading ? (
        <p>Татаж байна...</p>
      ) : (
        <>
          {/* Шинэ анги нэмэх хэсэг */}
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Шинэ анги нэмэх</h2>
            <div className="mb-2">
              <input
                type="text"
                name="teacher_id"
                value={newCourse.teacher_id}
                onChange={handleNewCourseChange}
                placeholder="Багшийн ID"
                className="border rounded p-2 w-full mb-2"
              />
              <input
                type="text"
                name="grade"
                value={newCourse.grade}
                onChange={handleNewCourseChange}
                placeholder="Анги (жишээ: 10)"
                className="border rounded p-2 w-full mb-2"
              />
              <input
                type="text"
                name="group"
                value={newCourse.group}
                onChange={handleNewCourseChange}
                placeholder="Бүлэг (жишээ: A)"
                className="border rounded p-2 w-full mb-2"
              />
              <input
                type="text"
                name="YearLesson"
                value={newCourse.YearLesson}
                onChange={handleNewCourseChange}
                placeholder="Хичээлийн жил (жишээ: 2024)"
                className="border rounded p-2 w-full"
              />
            </div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={addNewCourse}
            >
              Нэмэх
            </button>
          </div>

          {/* Ангиудын жагсаалт (Table) */}
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Одоогийн ангиуд</h2>
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2 text-left">Багшийн ID</th>
                  <th className="border px-4 py-2 text-left">Анги</th>
                  <th className="border px-4 py-2 text-left">Бүлэг</th>
                  <th className="border px-4 py-2 text-left">Хичээлийн жил</th>
                  <th className="border px-4 py-2 text-left">Үйлдэл</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td className="border px-4 py-2">{course.teacher_id}</td>
                    <td className="border px-4 py-2">{course.grade}</td>
                    <td className="border px-4 py-2">{course.group}</td>
                    <td className="border px-4 py-2">{course.YearLesson}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => deleteCourse(course.id)}
                      >
                        Устгах
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default Courses;