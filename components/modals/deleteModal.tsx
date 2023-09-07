import {BaseButton} from "@/components/baseButton";
import styles from '@/styles/components/modals/deleteModal.module.scss'
import {useModal} from "@/contexts/ModalsContext";
interface DeleteModalProps {
    bookId: number;
}

export const DeleteModal = (props: DeleteModalProps) => {
    const {closeModal} = useModal()

    const toggleCloseModal = () => {
        closeModal('deleteModal')
    }

    const deleteBook = () => {
      fetch(`http://localhost:3050/api/books/${props.bookId}`, {
          method: 'DELETE'
      }).then(response => {
          if (!response.ok) {
              throw new Error('Ошибка при получении данных')
          }
      })
      .catch(error => console.error(error.message))

        toggleCloseModal()
        window.location.reload();
    }

  return (
      <div className={styles.delete}>
          <div className={styles.title}>
              <h2>Удалить</h2>
          </div>
          <div className={styles.confirm}>
              <p>Вы уверены что хотите удалить эту книгу?</p>
          </div>
          <div className={styles.buttons}>
              <BaseButton text={'Отмена'} onClick={toggleCloseModal}/>
              <BaseButton text={'Удалить'} onClick={deleteBook}/>
          </div>
      </div>
  )
}