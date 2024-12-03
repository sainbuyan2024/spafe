import React from "react";

const LoginPage = () => {
  return (
        
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-10 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-700">
          Ирц бүртгэлийн системд нэвтрэх
        </h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              И-мэйл
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="И-мэйлээ оруулна уу"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Нууц үг
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Нууц үгээ оруулна уу"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            > Нэвтрэх
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Нууц үгээ мартсан уу?{" "}
          <a href="#" className="text-blue-500 hover:underline ">
            Энд дарна уу
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;