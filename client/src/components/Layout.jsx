import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";

const Layout = () => {
  const { user } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth > 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!user) return null;

  return (
    <div className="w-full h-screen flex flex-col md:flex-row bg-[#f3f4f6] dark:bg-[#1E1E2D] overflow-hidden">
      {/* Sidebar (hidden on mobile by default) */}
      <div
        className={`fixed md:static z-50 w-[250px] h-full transition-all duration-300 ease-in-out ${
          sidebarOpen ? "left-0" : "-left-full"
        } md:left-0`}
      >
        <Sidebar />
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          isMobile={isMobile}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 dark:bg-[#1A1A27]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;