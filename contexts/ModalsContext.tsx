import React, { createContext, useContext, useState } from 'react';

interface ModalParams {
  content: {};
}

interface ActiveModal {
  key: string;
  params?: ModalParams;
}


const ModalContext = createContext<{
  activeModals: { [key: string]: ActiveModal | null };
  openModal: (key: string, params?: ModalParams) => void;
  closeModal: (key: string) => void;
} | undefined>(undefined);

export const ModalProvider = ({ children }: {children: React.ReactNode}) => {
  const [activeModals, setActiveModals] = useState<{ [key: string]: ActiveModal | null }>({});

  const openModal = (modalKey: string, params?: ModalParams) => {
    setActiveModals((prevActiveModals) => ({
      ...prevActiveModals,
      [modalKey]: { key: modalKey, params },
    }));
  };

  const closeModal = (modalKey: string) => {
    setActiveModals((prevActiveModals) => ({
      ...prevActiveModals,
      [modalKey]: null,
    }));
  };

  return (
    <ModalContext.Provider value={{ activeModals, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
