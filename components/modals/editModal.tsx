import styles from '@/styles/components/modals/editModal.module.scss'
import {useModal} from "@/contexts/ModalsContext";
import React, {useState} from "react";

interface EditModalProps {
    author: string;
    title: string;
    bookId: number;
}

export const EditModal = (props: EditModalProps) => {
    const {closeModal} = useModal()
    const [formData, setFormData] = useState(
        {
            author: '',
            title: ''
        }
    )
    const submitForm = (event: React.FormEvent) => {
        event.preventDefault()

      fetch(`http://localhost:3050/api/books`,
          {method: 'POST',
              body: JSON.stringify({
                  author: formData.author,
                  title: formData.title,
                  bookId: props.bookId
              }),
          headers: {
              'Content-Type': 'application/json'
          }})
          .then(response => {
              if (!response.ok) {
                  throw new Error('Ошибка при получении данных')
              }
          })
          .catch(error => console.error(error.message))

        closeModal('editModal')
        window.location.reload();
    }
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const  {id, value} = event.target
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }))
    }

  return (
      <div className={'edit'}>
          <div className={styles.title}>
              <h2>Редактировать</h2>
          </div>
          <form className={styles.form} onSubmit={submitForm}>
              <div className={styles.formItem}>
                  <label htmlFor="author">Имя автора</label>
                  <input id='author'
                         type="text"
                         placeholder={props.author}
                         onChange={handleInputChange}
                  />
              </div>
              <div className={styles.formItem}>
                  <label htmlFor="title">Название книги</label>
                  <input id='title'
                         type="text"
                         placeholder={props.title}
                         onChange={handleInputChange}
                  />
              </div>
              <div className={styles.formItem}>
                  <input id='submit-form' type="submit" value={'Сохранить'}/>
              </div>
          </form>
      </div>
  )
}