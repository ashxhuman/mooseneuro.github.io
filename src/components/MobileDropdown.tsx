import React, { useState } from "react";
import type { NavItem } from "./nav-data";

interface MobileDropdownProps {
  item: NavItem;
  closeMobileMenu: () => void;
}

export default function MobileDropdown({ item, closeMobileMenu }: MobileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const mobileIconRotate = (open: boolean) => (open ? "rotate-180" : "");

  if (!item.dropdown) {
    return (
      <a
        href={item.href || "#"}
        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
        onClick={closeMobileMenu}
      >
        {item.title}
      </a>
    );
  }

  return (
    <div className="mobile-dropdown">
      <button
        className="-mx-3 flex w-full items-center justify-between rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        {item.title}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 mobile-dropdown-icon transition-transform ${mobileIconRotate(isOpen)}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="pl-4">
          {item.dropdown.map((subItem) => (
            <a
              key={subItem.title}
              href={subItem.href}
              className="-mx-3 block rounded-lg px-3 py-2 text-base font-normal text-gray-600 hover:bg-gray-50"
              onClick={closeMobileMenu}
            >
              {subItem.title}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
