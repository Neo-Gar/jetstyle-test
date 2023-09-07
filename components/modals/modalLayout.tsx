import React from 'react';
import styles from '@/styles/components/modals/modalLayout.module.scss';
import {FaTimes} from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalLayout = ({props, children}: { props: ModalProps, children: React.ReactNode } ) => {
  const modalStyle = {
    display: props.isOpen ? 'flex' : 'none',
  };

  return (
    <div className={styles.overlay} style={modalStyle} onClick={props.onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <FaTimes className={styles.closeSvg} onClick={props.onClose}/>
        {children}
      </div>
    </div>
  );
};