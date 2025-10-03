"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(
    null
  );

  const loadUser = () => {
    const token = Cookies.get("token");
    const storedUser = localStorage.getItem("user");
    setIsLoggedIn(Boolean(token));
    setUser(storedUser ? JSON.parse(storedUser) : null);
  };
  useEffect(() => {
    loadUser();

    // Listen for changes (e.g., login/logout in other tabs or same app flow)
    const handleStorageChange = () => loadUser();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/pricing", label: "Product" },
    { href: "/integrations", label: "Integrations" },
    { href: "/docs", label: "Docs" },
  ];

  const dashboardLinks = [
    { href: "/user-dashboard", label: "Dashboard" },
  ];

  const handleLogout = () => {
    setDropdownOpen(false);
    Cookies.remove("token");
    localStorage.removeItem("user");
    // Fire a storage event manually to update state without refresh
    window.dispatchEvent(new Event("storage"));
    // 🚀 Notify all components immediately
    window.dispatchEvent(new Event("authChange"));
    router.push("/auth/login");
  };

  return (
    <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#2D5BE3] flex items-center justify-center shadow-md text-white font-bold">
          S
        </div>
        <div>
          <div className="text-lg font-semibold">ScrapeChat</div>
          <div className="text-xs text-gray-500 -mt-0.5">
            Scraping + Conversational AI
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="hidden md:flex items-center gap-6">
        {!isLoggedIn ? (
          <>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm ${
                  pathname === link.href
                    ? "text-[#2D5BE3] font-semibold"
                    : "hover:text-[#2D5BE3] transition"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              className="ml-2 bg-[#2D5BE3] text-white px-4 py-2 rounded-md shadow hover:opacity-90 transition cursor-pointer"
              onClick={() => router.push("/auth/register")}
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            {dashboardLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm ${
                  pathname === link.href
                    ? "text-[#2D5BE3] font-semibold"
                    : "hover:text-[#2D5BE3] transition"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#2D5BE3] hover:border-gray-300 transition"
              >
                {user?.name?.charAt(0).toUpperCase()}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border-[0.5px] border-gray-300 rounded-lg shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
