"use client";
import React, {
  useEffect,
} from "react";

export const Dialog = ({
  isOpen,
  onClose,
  children,
}) => {
  useEffect(() => {
    const handleEscape = (
      e
    ) => {
      if (
        e.key === "Escape"
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener(
        "keydown",
        handleEscape
      );
      document.body.style.overflow =
        "hidden";
    }

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
      document.body.style.overflow =
        "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {children}
      </div>
    </div>
  );
};

export const DialogContent =
  ({
    children,
    className = "",
  }) => {
    return (
      <div
        className={`p-4 ${className}`}
      >
        {children}
      </div>
    );
  };

export const DialogHeader = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`p-4 border-b ${className}`}
    >
      {children}
    </div>
  );
};

export const DialogFooter = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`p-4 border-t ${className}`}
    >
      {children}
    </div>
  );
};
