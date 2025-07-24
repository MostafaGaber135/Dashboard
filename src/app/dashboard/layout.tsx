"use client";

import { useEffect, useState } from "react";
import { signOut, getAuth } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { app } from "../../../utils/firebase";
import { Menu, LogOut } from "lucide-react";

const auth = getAuth(app);

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userName, setUserName] = useState("Admin");
  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) setUserName(name);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("userName");
    router.push("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <aside
        className={`
          fixed z-40 md:relative bg-white shadow-md w-64 h-full
          transition-transform duration-300 ease-in-out
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="p-6 text-xl font-semibold text-blue-600">Dashboard</div>
        <nav className="mt-6 space-y-2">
          <Link href="/dashboard/overview" className="block px-6 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>Overview</Link>
          <Link href="/dashboard/users" className="block px-6 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>Users</Link>
          <Link href="/dashboard/products" className="block px-6 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>Products</Link>
        </nav>
      </aside>
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <div className="flex-1 flex flex-col overflow-y-auto ">
      <header className="bg-white shadow-sm flex items-center justify-between px-4 sm:px-6 py-3 h-20 relative">
  <button
    onClick={() => setMenuOpen(true)}
    className="md:hidden text-gray-700"
    aria-label="Open Menu"
  >
    <Menu className="w-6 h-6" />
  </button>

  <div className="relative ml-auto">
    <button
      onClick={() => setUserMenuOpen(!userMenuOpen)}
      className="flex items-center space-x-2"
      aria-label="User menu"
    >
      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
        {userName?.[0]?.toUpperCase() || "A"}
      </div>
      <div className="text-right hidden sm:block cursor-pointer">
        <p className="text-sm font-medium text-gray-800">{userName}</p>
        <p className="text-xs text-gray-500">admin</p>
      </div>
    </button>

    {userMenuOpen && (
      <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow border z-50 ">
        <ul>
          <li>
            <button
              onClick={handleLogout}
              className="w-full text-left flex items-center gap-2 px-4 py-2 text-red-600 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Log out
            </button>
          </li>
        </ul>
      </div>
    )}
  </div>
</header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-full md:max-w-4xl xl:max-w-6xl md:mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
