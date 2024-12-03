import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Толгой хэсэг */}
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">Миний Систем</h1>
          <nav className="space-x-4">
            <a href="/loginPage" className="hover:underline">
              Нэвтрэх
            </a>
            <a href="/logoutPage" className="hover:underline">
              Бүртгүүлэх
            </a>
          </nav>
        </div>
      </header>

      {/* Гол агуулга */}
      <main className="flex flex-1 items-center justify-center">
        <div className="text-center px-4">
          <h2 className="text-3xl font-bold text-gray-700 mb-4">
            Тавтай морилно уу!
          </h2>
          <p className="text-gray-600 mb-6">
            Энэхүү систем нь таны өдөр тутмын ажлыг хялбарчлахад зориулагдсан.
          </p>
          <div className="space-x-4">
            <a
              href="/loginPage"
              className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Нэвтрэх
            </a>
            <a
              href="/logoutPage"
              className="px-6 py-2 text-blue-500 border border-blue-500 rounded-md hover:bg-blue-100"
            >
              Бүртгүүлэх
            </a>
          </div>
        </div>
      </main>

      {/* Хөл хэсэг */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Миний Систем. Бүх эрх хуулиар хамгаалагдсан.</p>
        </div>
      </footer>
    </div>



  );
};

export default Home;