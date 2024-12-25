import React, { useRef, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (backdropRef.current === event.target && modalRef.current) {
        onClose();
      }
    };

    if (isOpen && backdropRef.current) {
      const backdropElement = backdropRef.current;
      backdropElement.addEventListener("click", handleClickOutside);

      return () => {
        backdropElement.removeEventListener("click", handleClickOutside);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70"
    >
      <div
        ref={modalRef}
        className="w-full max-w-xl rounded-xl border-2 border-borderPrimary bg-bgPrimary p-8 text-textPrimary shadow-lg"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
