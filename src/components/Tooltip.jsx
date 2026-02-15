// ========== //
// Tooltip UI //
// ========== //

import React, { useState, useRef, useEffect } from "react";

export default function Tooltip({ children, text }) 
{
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null);

  // Close tooltip when clicking outside
  useEffect(() => {
    function handleClickOutside(event) 
    {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) 
      {
        setIsVisible(false);
      }
    }

    if (isVisible) 
    {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isVisible]);

  // Auto-close tooltip after 3 seconds
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const handleToggle = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsVisible(!isVisible);
  };

  return (
    <div className="relative inline-block" ref={tooltipRef}>
      <div
        onClick={handleToggle}
        className="cursor-pointer"
      >
        {children}
      </div>
      
      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black text-white text-sm whitespace-nowrap z-50 border-2 border-white animate-jump-in">
          {text}
        </div>
      )}
    </div>
  );
}