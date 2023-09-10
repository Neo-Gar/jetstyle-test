import styles from '@/styles/components/modals/editModal.module.scss'
import {useModal} from "@/contexts/ModalsContext";
import React, {useState} from "react";

export const AddModal = () => {
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
                  title: formData.title
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

        closeModal('addModal')
        /**
         * так можно делать только в сложных случаях
         * например когда код обрабатывает ошибки и 
         * становится понятно что все сломано, то тогда
         * очень хорошо перезагрузить страницу
         */
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
      <div className={'add'}>
          <div className={styles.title}>
              <h2>Добавить книгу</h2>
          </div>
          <form className={styles.form} onSubmit={submitForm}>
              <div className={styles.formItem}>
                  <label htmlFor="author">Имя автора</label>
                  <input id='author'
                         type="text"
                         onChange={handleInputChange}
                  />
              </div>
              <div className={styles.formItem}>
                  <label htmlFor="title">Название книги</label>
                  <input id='title'
                         type="text"
                         onChange={handleInputChange}
                  />
              </div>
              <div className={styles.formItem}>
                  <input id='submit-form' type="submit" value={'Добавить'}/>
              </div>
          </form>
      </div>
  )
}