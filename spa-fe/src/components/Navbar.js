import React from 'react'
import { Link } from 'react-router-dom';

export function Navbar() {
    

    return (
        <ul className="flex space-x-4 p-4 bg-gray-200">
        <li>
          <Link className="text-blue-500" to="/">Home</Link>
        </li>
        <li>
          <Link className="text-blue-500" to="/attendance">Attendance</Link>
        </li>
        <li>
          <Link className="text-blue-500" to="/teacher">Teacher</Link>
        </li>
        <li>
          <Link className="text-blue-500" to="/course">Course</Link>
        </li>
        <li>
          <Link className="text-blue-500" to="/student">Student</Link>
        </li>
        <li>
          <Link className="text-blue-500" to="/about">About</Link>
        </li>
        <li>
          <Link className="text-blue-500" to="/stat">Stats</Link>
        </li>
      </ul>
    )
}