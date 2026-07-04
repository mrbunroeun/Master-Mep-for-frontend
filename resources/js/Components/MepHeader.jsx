import { useState, useEffect, useRef } from "react";
import { Link, usePage } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTelegram} from "@fortawesome/free-brands-svg-icons";

export default function MepHeader() {
  const { url } = usePage();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    {
      label: "Services",
      href: "/services/mechanical",
      dropdown: [
        { label: "Mechanical / HVAC", href: "/services/mechanical" },
        { label: "Electrical & ELV", href: "/services/electrical" },
        { label: "Plumbing", href: "/services/plumbing" },
        { label: "Maintenance", href: "/services/maintenance" },
        { label: "Solar System", href: "/services/solasystem" },
      ],
    },
    { label: "Projects", href: "/projects" },
    { label: "Latest Activities", href: "/latestactiviy" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);
  const hoverTimeout = useRef(null);

  useEffect(() => {
    setOpenDropdown(null);
    setMenuOpen(false);
  }, [url]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (href) => (href === "/" ? url === "/" : url.startsWith(href));
  const toggleDropdown = (label) => setOpenDropdown((prev) => (prev === label ? null : label));

  const handleMouseEnter = (label) => {
    clearTimeout(hoverTimeout.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  return (
    <header className="w-full" ref={navRef}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 md:px-6 py-3 bg-white">
        <div className="flex items-center gap-6">
          <img
            src="/logo.png"
            alt="Master MEP"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-lg font-bold tracking-wide text-[#1A3A5C]">MASTER MEP</span>
        </div>

        <div className="hidden md:flex gap-4">
          <a  href="https://web.facebook.com/profile.php?id=61586431983798"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              onClick={(e) => {
                e.preventDefault();
                window.open(
                  "https://web.facebook.com/profile.php?id=61586431983798",
                  "_blank",
                  "noopener,noreferrer"
                );
              }} className="w-11 h-11 rounded-full bg-[#1877F2] flex items-center justify-center hover:scale-110 transition">
            <FontAwesomeIcon icon={faFacebookF} className="text-white" />
          </a>
            
          <a  href="https://t.me/+85586656674"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              onClick={(e) => {
                e.preventDefault();
                window.open(
                  "https://t.me/+85586656674",
                  "_blank",
                  "noopener,noreferrer"
                );
              }} className="w-11 h-11 rounded-full bg-[#179cda] flex items-center justify-center hover:scale-110 transition">
            <FontAwesomeIcon icon={faTelegram} className="text-white" />
          </a>
         
        </div>

        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5 p-2 text-[#1A3A5C]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Desktop nav */}
      <nav
        className="hidden md:block"
        style={{ background: "linear-gradient(to right, #0C2D4F, #1E5BA8)" }}
      >
        <ul className="flex items-center justify-center gap-1 md:gap-2 px-4 py-2.5 flex-wrap text-sm font-medium text-white">
          {navItems.map((item) => (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
              onMouseLeave={() => item.dropdown && handleMouseLeave()}
            >
              {item.dropdown ? (
                <div>
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className={`flex items-center px-4 py-1.5 rounded-full transition-all duration-200 text-sm font-medium border ${
                      openDropdown === item.label || isActive(item.href)
                        ? "border-white text-white font-bold bg-white/10"
                        : "border-transparent text-white hover:bg-white/20"
                    }`}
                  >
                    {item.label}
                  </button>

                  <div
                    className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl overflow-hidden z-50 border border-gray-100 transition-all duration-200 origin-top ${
                      openDropdown === item.label
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className={`block px-4 py-2.5 text-sm transition-colors border-b border-gray-50 last:border-0 ${
                          url === sub.href
                            ? "bg-[#E6F1FB] text-[#0C447C] font-medium border-l-[3px] border-[#093c6e]"
                            : "text-blue-600 hover:bg-blue-600 hover:text-blue-900"
                        }`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`px-4 py-1.5 rounded-full transition-all duration-200 text-sm font-medium border ${
                    isActive(item.href)
                      ? "border-white text-white font-bold bg-white/10"
                      : "border-transparent text-white hover:bg-white/20"
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile nav */}
      {menuOpen && (
        <nav
          className="md:hidden"
          style={{ background: "linear-gradient(to right, #0C2D4F, #1E5BA8)" }}
        >
          <ul className="flex flex-col px-4 py-3 gap-1">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className={`w-full flex items-center px-4 py-2.5 rounded-full text-white text-sm font-medium border transition-all duration-200 ${
                        openDropdown === item.label
                          ? "border-white bg-white/10"
                          : "border-transparent hover:bg-white/20"
                      }`}
                    >
                      {item.label}
                    </button>

                    <div
                      className={`ml-4 mt-1 bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-200 origin-top ${
                        openDropdown === item.label
                          ? "opacity-100 scale-100 translate-y-0 max-h-96"
                          : "opacity-0 scale-95 -translate-y-2 max-h-0 pointer-events-none"
                      }`}
                    >
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className={`block px-4 py-2.5 text-sm transition-colors border-b border-gray-50 last:border-0 ${
                            url === sub.href
                              ? "bg-[#E6F1FB] text-[#0C447C] font-medium border-l-[3px] border-[#185FA5]"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`block px-4 py-2.5 rounded-full transition-all duration-200 text-sm font-medium border ${
                      isActive(item.href)
                        ? "border-white text-white font-bold bg-white/10"
                        : "border-transparent text-white hover:bg-white/20"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}

            <li className="flex items-center gap-4 px-4 py-3 text-white text-lg">
                <a
              href="https://web.facebook.com/profile.php?id=61586431983798"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              onClick={(e) => {
                e.preventDefault();
                window.open(
                  "https://web.facebook.com/profile.php?id=61586431983798",
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
              className="w-11 h-11 rounded-full bg-[#1877F2] flex items-center justify-center hover:scale-110 transition"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>

            <a
              href="https://t.me/+85586656674"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              onClick={(e) => {
                e.preventDefault();
                window.open(
                  "https://t.me/+85586656674",
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
              className="w-11 h-11 rounded-full bg-[#229ED9] flex items-center justify-center hover:scale-110 transition"
            >
              <FontAwesomeIcon icon={faTelegram} />
            </a>
              
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}