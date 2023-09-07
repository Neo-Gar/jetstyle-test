import React from 'react';
import {useModal} from '@/contexts/ModalsContext'
import {ModalLayout} from '@/components/modals/modalLayout';
import {DeleteModal} from "@/components/modals/deleteModal";
import {EditModal} from "@/components/modals/editModal";
import {AddModal} from "@/components/modals/addModal";

export default function ModalsRoot() {
  const { activeModals, closeModal } = useModal();

  const editModalKey = 'editModal';
  const deleteModalKey = 'deleteModal';
  const addModalKey = 'addModal'

  const editModalParams = activeModals[editModalKey]?.params;
  const deleteModalParams = activeModals[deleteModalKey]?.params;
  const addModalParams = activeModals[addModalKey]?.params
  const handleCloseEditModal = () => {
    closeModal(editModalKey);
  };

  const handleCloseDeleteModal = () => {
    closeModal(deleteModalKey);
  };

  const handleCloseAddModal = () => {
      closeModal(addModalKey)
  }

  return (
    <div id="modals-root">
        {editModalParams && (
            <ModalLayout props={{ isOpen: !!activeModals[editModalKey], onClose: handleCloseEditModal }}>
              <EditModal author={editModalParams.content.author}
                         title={editModalParams.content.title}
                         bookId={editModalParams.content.bookId} />
            </ModalLayout>
        )}
        {deleteModalParams && (
            <ModalLayout props={{ isOpen: !!activeModals[deleteModalKey], onClose: handleCloseDeleteModal }}>
              <DeleteModal bookId={deleteModalParams.content.bookId} />
            </ModalLayout>
        )}
        {!!activeModals[addModalKey] && (
            <ModalLayout props={{ isOpen: !!activeModals[addModalKey], onClose: handleCloseAddModal}}>
                <AddModal/>
            </ModalLayout>
        )}
    </div>
  );
};
