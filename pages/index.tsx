import {BaseButton} from "@/components/baseButton";
import styles from '@/styles/pages/home.module.scss'
import {BooksItem} from "@/components/booksItem";
import {useEffect, useState} from "react";
import {BiError} from "react-icons/bi";
import {useModal} from "@/contexts/ModalsContext";

export default function Home() {
    const [books, setBooks] = useState(null)
    const [error, setError] = useState()
    const {openModal} = useModal()

    useEffect(() => {
        const getAuthor = async (authorStrId: string) => {
            try {
                const response = await fetch(`http://localhost:3050/api/authors/${authorStrId}`)
                if (!response.ok) {
                    throw new Error('Ошибка при получении данных')
                }
                const data = await response.json()
                return data.author
            }
            catch (error) {
                setError(error.message)
            }
        }
        // get all books, then put authorStrId in it
        fetch('http://localhost:3050/api/books')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка при полученни данных')
                }
                return response.json()
            })
            .then(async books => {
                const updatedBooks = await Promise.all(
                    books.map(async item => {
                        item.author = await getAuthor(item.authorStrId)
                        return item
                    })
                )
                setBooks(updatedBooks)
            })
            .catch(error => setError(error.message))
    }, []);

    const addBook = () => {
        openModal('addModal')
    }
    return (
        <div className={styles.home}>
            <div className={styles.books}>
                <div className={styles.title}>
                    <h2>Книги</h2>
                    <BaseButton text={'Добавить книгу в коллекцию'} onClick={addBook}/>
                </div>
                <div className={styles.description}>
                    <span className={styles.number}>№</span>
                    <span className={styles.author}>Автор</span>
                    <span className={styles.name}>Название</span>
                </div>
                <div className={styles.booksGrid}>
                    {error ? (
                        <>
                          <BiError/>
                          <p>{error}</p>
                        </>
                    ): !error && books !== null ? (
                        <>
                        {books.map((item, index) => (
                            <BooksItem id={item.id}
                                       author={item.author}
                                       title={item.title}
                                       authorStrId={item.authorStrId}
                                       key={index}/>
                            ))}
                        </>
                    ): (
                        <>
                          <p>Загрузка...</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}