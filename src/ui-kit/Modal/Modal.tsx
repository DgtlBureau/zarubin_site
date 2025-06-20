import React from 'react';

interface IModalProps {
  isModalOpen: boolean;
  children: React.ReactNode;
}

export const Modal = ({ isModalOpen, children }: IModalProps) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex bg-modal/60 transition-all ${isModalOpen ? 'opacity-100 ' : 'pointer-events-none opacity-0'} items-center justify-center backdrop-blur-[15px] duration-300`}
    >
      {children}
    </div>
  );
};
