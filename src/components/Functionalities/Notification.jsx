import React from 'react';

function Notification({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="fixed top-20 right-5 bg-red text-white px-4 py-2 rounded shadow-lg z-50">
      {message}
      <button onClick={onClose} className="ml-2 text-bold">
        &times;
      </button>
    </div>
  );
}

export default Notification;