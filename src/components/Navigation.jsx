import "../styles/global.css";
import { useState, useEffect, useRef } from "react";
import mooselogo from "../assets/moose_logo.png";
import { SITE_URL } from "../constants";
export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownTimeoutsRef = useRef({});
  const mobileMenuRef = useRef(null);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
        document.body.classList.remove("overflow-hidden");
      }
    };

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [mobileMenuOpen]);

  // Handle body overflow when mobile menu opens/closes
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [mobileMenuOpen]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Toggle mobile dropdown
  const toggleMobileDropdown = (e) => {
    const content = e.currentTarget.nextElementSibling;
    if (content) {
      content.classList.toggle("hidden");
      const icon = e.currentTarget.querySelector(".mobile-dropdown-icon");
      if (icon) {
        icon.classList.toggle("rotate-180");
      }
    }
  };

  // Handle hover delay for desktop dropdowns
  const handleMenuMouseEnter = (menuId) => {
    clearTimeout(dropdownTimeoutsRef.current[menuId]);
    const dropdown = document.getElementById(`dropdown-${menuId}`);
    if (dropdown) {
      dropdown.classList.add("visible", "opacity-100");
      dropdown.classList.remove("invisible", "opacity-0");
    }
  };

  const handleMenuMouseLeave = (menuId) => {
    dropdownTimeoutsRef.current[menuId] = setTimeout(() => {
      const dropdown = document.getElementById(`dropdown-${menuId}`);
      if (dropdown) {
        dropdown.classList.remove("visible", "opacity-100");
        dropdown.classList.add("invisible", "opacity-0");
      }
    }, 200); // 200ms delay before hiding
  };

  // Handle backdrop click to close mobile menu
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="bg-indigo-50">
      <header className="inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href={SITE_URL + "/"} className="-m-1.5 p-1.5">
              <span className="sr-only">MOOSE</span>
              <img
                className="h-10 w-auto"
                src={mooselogo.src}
                alt="MOOSE Logo"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">main menu</span>
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {/* About dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => handleMenuMouseEnter("about")}
              onMouseLeave={() => handleMenuMouseLeave("about")}
            >
              <a
                href={SITE_URL + "/"}
                className="text-sm font-semibold text-gray-900 transition duration-200 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-600 flex items-center gap-1"
              >
                About
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </a>
              <div
                id="dropdown-about"
                className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 ease-in-out z-50"
              >
                <div className="py-1">
                  <a
                    href={SITE_URL + "/about/features"}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    Features
                  </a>
                  <a
                    href={SITE_URL + "/community#team"}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    Team
                  </a>
                </div>
              </div>
            </div>

            {/* Documentation dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => handleMenuMouseEnter("docs")}
              onMouseLeave={() => handleMenuMouseLeave("docs")}
            >
              <a
                href="documentation"
                className="text-sm font-semibold text-gray-900 transition duration-200 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-600 flex items-center gap-1"
              >
                Documentation
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </a>
              <div
                id="dropdown-docs"
                className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 ease-in-out z-50"
              >
                <div className="py-1">
                  <a
                    href="/documentation/Beginners Guide"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    Getting Started
                  </a>
                  <a
                    href="/documentation/Tutorials"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    Tutorials
                  </a>
                  <a
                    href="/documentation/Examples"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    Examples
                  </a>
                </div>
              </div>
            </div>

            {/* Software dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => handleMenuMouseEnter("software")}
              onMouseLeave={() => handleMenuMouseLeave("software")}
            >
              <a
                href="https://github.com/BhallaLab/moose-core/releases/"
                className="text-sm font-semibold text-gray-900 transition duration-200 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-600 flex items-center gap-1"
              >
                Software
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </a>
              <div
                id="dropdown-software"
                className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 ease-in-out z-50"
              >
                <div className="py-1">
                  <a
                    href="/software/download"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    Download
                  </a>
                  <a
                    href="/software/installation"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    Installation Guide
                  </a>
                  <a
                    href="/software/releases"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    Release Notes
                  </a>
                  <a
                    href="/software/requirements"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    System Requirements
                  </a>
                </div>
              </div>
            </div>

            {/* Activity link (no dropdown) */}
            <a
              href="activity"
              className="text-sm font-semibold text-gray-900 transition duration-200 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-600"
            >
              Activity
            </a>

            {/* Community dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => handleMenuMouseEnter("community")}
              onMouseLeave={() => handleMenuMouseLeave("community")}
            >
              <a
                href="community"
                className="text-sm font-semibold text-gray-900 transition duration-200 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-600 flex items-center gap-1"
              >
                Community
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </a>
              <div
                id="dropdown-community"
                className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 ease-in-out z-50"
              >
                <div className="py-1">
                  <a
                    href="/community/news"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    Workshop and News
                  </a>
                  <a
                    href="/community/contribute"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    Contribute
                  </a>
                  <a
                    href="/community/support"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    Support
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="https://github.com/BhallaLab/moose"
              className="text-sm font-semibold text-gray-900 transition duration-200 hover:text-indigo-600"
            >
              <svg
                className="h-8 w-8"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M13 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden"
            role="dialog"
            aria-modal="true"
            ref={mobileMenuRef}
          >
            <div
              className="fixed inset-0 z-50"
              onClick={handleBackdropClick}
            ></div>
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href={SITE_URL + "/"} className="-m-1.5 p-1.5">
                  <span className="sr-only">MOOSE</span>
                  <img
                    className="h-8 w-auto"
                    src={mooselogo.src}
                    alt="MOOSE Logo"
                  />
                </a>
                <button
                  type="button"
                  id="mobile-toggle"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={toggleMobileMenu}
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    className="size-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {/* Mobile About dropdown */}
                    <div className="mobile-dropdown">
                      <button
                        className="-mx-3 flex w-full items-center justify-between rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                        onClick={toggleMobileDropdown}
                      >
                        About
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mobile-dropdown-icon"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      <div className="mobile-dropdown-content hidden pl-4">
                        <a
                          href="/about/features"
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-normal text-gray-600 hover:bg-gray-50"
                        >
                          Features
                        </a>
                        <a
                          href="/about/team"
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-normal text-gray-600 hover:bg-gray-50"
                        >
                          Team
                        </a>
                      </div>
                    </div>

                    {/* Mobile Documentation dropdown */}
                    <div className="mobile-dropdown">
                      <button
                        className="-mx-3 flex w-full items-center justify-between rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                        onClick={toggleMobileDropdown}
                      >
                        Documentation
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mobile-dropdown-icon"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      <div className="mobile-dropdown-content hidden pl-4">
                        <a
                          href="/documentation/beginnersguide"
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-normal text-gray-600 hover:bg-gray-50"
                        >
                          Beginners Guide
                        </a>
                        <a
                          href="/documentation/tutorials"
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-normal text-gray-600 hover:bg-gray-50"
                        >
                          Tutorials
                        </a>
                        <a
                          href="/documentation/examples"
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-normal text-gray-600 hover:bg-gray-50"
                        >
                          Examples
                        </a>
                      </div>
                    </div>

                    {/* Mobile Software dropdown */}
                    <div className="mobile-dropdown">
                      <button
                        className="-mx-3 flex w-full items-center justify-between rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                        onClick={toggleMobileDropdown}
                      >
                        Software
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mobile-dropdown-icon"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      <div className="mobile-dropdown-content hidden pl-4">
                        <a
                          href="/software/download"
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-normal text-gray-600 hover:bg-gray-50"
                        >
                          Download
                        </a>
                        <a
                          href="/software/installation"
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-normal text-gray-600 hover:bg-gray-50"
                        >
                          Installation Guide
                        </a>
                        <a
                          href="/software/releases"
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-normal text-gray-600 hover:bg-gray-50"
                        >
                          Release Notes
                        </a>
                        <a
                          href="/software/requirements"
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-normal text-gray-600 hover:bg-gray-50"
                        >
                          System Requirements
                        </a>
                      </div>
                    </div>

                    <a
                      href="/activity"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Activity
                    </a>

                    {/* Mobile Community dropdown */}
                    <div className="mobile-dropdown">
                      <button
                        className="-mx-3 flex w-full items-center justify-between rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                        onClick={toggleMobileDropdown}
                      >
                        Community
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mobile-dropdown-icon"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      <div className="mobile-dropdown-content hidden pl-4">
                        <a
                          href="/community/events"
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-normal text-gray-600 hover:bg-gray-50"
                        >
                          Workshop and Events
                        </a>
                        <a
                          href="/community/contribute"
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-normal text-gray-600 hover:bg-gray-50"
                        >
                          Contribute
                        </a>
                        <a
                          href="/community/support"
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-normal text-gray-600 hover:bg-gray-50"
                        >
                          Support
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="py-6">
                    <a
                      href="https://github.com/BhallaLab/moose"
                      className="-mx-3 flex items-center rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      <svg
                        className="h-6 w-6 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M13 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
