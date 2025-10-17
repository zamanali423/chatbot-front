"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(
    null
  );

  // ✅ Load user from cookies/localStorage
  const loadUser = () => {
    const token = Cookies.get("token");
    const storedUser = localStorage.getItem("user");
    setIsLoggedIn(Boolean(token));
    setUser(storedUser ? JSON.parse(storedUser) : null);
  };

  useEffect(() => {
    loadUser();
    const handleStorageChange = () => loadUser();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Smooth internal scrolling
  const handleScroll = (id: string) => {
    setMobileMenuOpen(false);
    const section = document.getElementById(id);

    if (section) {
      // Smooth scroll to the section
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // If section isn't on the current page (e.g., navigating from login/dashboard)
      router.push(`/#${id}`);
    }
  };

  const [activeSection, setActiveSection] = useState("home");

useEffect(() => {
  const handleScrollSpy = () => {
    const sections = document.querySelectorAll("section[id]");
    let currentSection = "home";

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) {
        currentSection = section.id;
      }
    });

    setActiveSection(currentSection);
  };

  window.addEventListener("scroll", handleScrollSpy);
  return () => window.removeEventListener("scroll", handleScrollSpy);
}, []);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "product", label: "Product" },
    { id: "integrations", label: "Integrations" },
    { id: "pricing", label: "Pricing" },
  ];

  const dashboardLinks = [{ href: "/user-dashboard", label: "Dashboard" }];

  const handleLogout = () => {
    setDropdownOpen(false);
    Cookies.remove("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage"));
    router.push("/auth/login");
  };

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* --- LEFT: Logo --- */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => handleScroll("home")}
        >
          <Image
            src="/assets/images/logo.svg"
            alt="Logo"
            width={50}
            height={50}
            className="object-contain"
          />
        </div>

        {/* --- CENTER: Desktop Nav Links --- */}
        <div className="hidden md:flex items-center gap-8">
          {!isLoggedIn
            ? navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleScroll(link.id)}
                  className={`text-sm ${
                    activeSection === link.id
                      ? "text-[#7C3BED] font-semibold underline underline-offset-4"
                      : "text-gray-700 hover:text-[#7C3BED] transition"
                  }`}
                >
                  {link.label}
                </button>
              ))
            : dashboardLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition ${
                    pathname === link.href
                      ? "text-[#7C3BED] underline underline-offset-4"
                      : "text-gray-700 hover:text-[#7C3BED]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
        </div>

        {/* --- RIGHT: Buttons/Profile --- */}
        <div className="hidden md:flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => router.push("/auth/login")}
                className="text-sm font-medium border border-[#7C3BED] text-[#7C3BED] px-4 py-2 rounded-md cursor-pointer transition-all duration-300 hover:text-white hover:bg-gradient-to-r hover:from-[#DF00DB] hover:to-[#7C3BED]"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/auth/signup")}
                className="text-sm font-medium text-white px-4 py-2 rounded-md cursor-pointer transition-all duration-300 bg-gradient-to-r from-[#DF00DB] to-[#7C3BED] hover:opacity-90"
              >
                Sign Up
              </button>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#7C3BED] flex items-center justify-center text-[#7C3BED] font-semibold"
              >
                {user?.name?.charAt(0).toUpperCase()}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
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
          )}
        </div>

        {/* --- MOBILE MENU BUTTON --- */}
        <button
          className="md:hidden flex items-center text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* --- MOBILE DROPDOWN MENU --- */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-100">
          <div className="flex flex-col items-start px-6 py-4 space-y-4">
            {!isLoggedIn
              ? navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleScroll(link.id)}
                    className={`w-full text-base ${
                      pathname === `/#${link.id}`
                        ? "text-[#7C3BED] font-semibold underline"
                        : "text-gray-700 hover:text-[#7C3BED]"
                    }`}
                  >
                    {link.label}
                  </button>
                ))
              : dashboardLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`w-full text-base ${
                      pathname === link.href
                        ? "text-[#7C3BED] font-semibold underline"
                        : "text-gray-700 hover:text-[#7C3BED]"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

            <div className="pt-2 w-full border-t border-gray-200 flex flex-col gap-3">
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      router.push("/auth/login");
                    }}
                    className="w-full text-center border border-[#7C3BED] text-[#7C3BED] py-2 rounded-md hover:bg-gradient-to-r hover:from-[#DF00DB] hover:to-[#7C3BED] hover:text-white transition"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      router.push("/auth/signup");
                    }}
                    className="w-full text-center bg-gradient-to-r from-[#DF00DB] to-[#7C3BED] text-white py-2 rounded-md hover:opacity-90 transition"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left text-red-600 hover:bg-red-50 py-2 rounded-md"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
