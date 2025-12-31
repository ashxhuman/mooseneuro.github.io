import React, { useState, useRef } from "react";
import type { NavItem } from "./nav-data";

interface DesktopDropdownProps {
  item: NavItem;
}

export default function DesktopDropdown({ item }: DesktopDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const openDropdown = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const closeDropdown = (delay = 200) => {
    timeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, delay);
  };

  return (
    <div
      className="relative dropdown-container"
      onMouseEnter={openDropdown}
      onMouseLeave={() => closeDropdown()}
    >
      <a
        href={item.href || "#"}
        className="text-base font-semibold text-white transition duration-200 hover:text-white hover:border-b-2 hover:border-highlight-neon flex items-center gap-1"
      >
        {item.title}
        {item.dropdown && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            } pointer-events-none`}
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
        )}
      </a>

      {item.dropdown && (
        <div
          className={[
            "absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition duration-200 ease-in-out z-[70]",
            isOpen ? "visible opacity-100" : "invisible opacity-0",
          ].join(" ")}
          onMouseEnter={openDropdown}
          onMouseLeave={() => closeDropdown()}
        >
          <div className="py-1">
            {item.dropdown.map((subItem) => (
              <a
                key={subItem.title}
                href={subItem.href}
                className="block px-4 py-2 text-sm text-black hover:bg-indigo-50 hover:text-base hover:border-s-2 hover:border-highlight-neon"
              >
                {subItem.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
