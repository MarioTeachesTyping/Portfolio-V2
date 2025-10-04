// ============= //
// Modal Creator //
// ============= //

import React, { useEffect, useState } from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';

export default function Modal({ isOpen, onClose, children }) 
{
  const [show, setShow] = useState(isOpen);

  useEffect(() => {
    if (isOpen) 
    {
      setShow(true);
    } 
    else 
    {
      // Wait for fadeout.
      const timer = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-black border-4 border-white text-white overflow-y-auto ${
          isOpen ? 'modal-enter' : 'modal-exit'
        }`}
        style={{
          width: '1200px',
          maxHeight: '80vh',
          padding: '24px',
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:opacity-80"
        >
          <IoCloseCircleOutline size={40} />
        </button>
        {children}
      </div>
    </div>
  );
}