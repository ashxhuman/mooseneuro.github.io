import React, { useEffect } from "react";

const FloatingButton = ({
  href = "https://github.com/orgs/MooseNeuro/discussions",
  icon = "forum",
  label = "Start Discussion",
  openInNewTab = true,
}) => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=forum";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleClick = () => {
    if (href) {
      if (openInNewTab) {
        window.open(href, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = href;
      }
    }
  };

  return (
    <div className="fixed bottom-8 right-8 group">
      <button
        onClick={handleClick}
        className="flex items-center justify-center w-16 h-16 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-110 focus:outline-none focus:ring-blue-200 hover:cursor-pointer"
        aria-label={label}
      >
        <span className="material-symbols-outlined text-3xl">{icon}</span>

        <div className="absolute right-20 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none">
          {label}
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent border-l-gray-900"></div>
        </div>
      </button>
    </div>
  );
};

export default FloatingButton;
