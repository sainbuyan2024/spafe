import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Navbar} from "./components/Navbar";
import Home from "./pages/Home";
import Attendance from "./pages/Attendance";
import Teacher from "./pages/Teacher"
import Course from "./pages/Course";
import Student from "./pages/Student";
import About from "./pages/About";
import Stat from "./pages/Stat";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";


function App() {
  return (
    <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Attendance" element={<Attendance />} />
      <Route path="/teacher" element={<Teacher />} />
      <Route path="/stat" element={<Stat />} />
      <Route path="/course" element={<Course />} />
      <Route path="/about" element={<About />} />
      <Route path="/student" element={<Student />} />
      <Route path="/loginPage" element={<LoginPage />} />
      <Route path="/LogoutPage" element={<LogoutPage />} />
      <Route path="*" element={<Home />} /> {/* 404 page */}
    </Routes>
  </Router>
  );
}

export default App;