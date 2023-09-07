import {FaTimes} from "react-icons/fa";
import styles from '@/styles/components/booksItem.module.scss'
import {useModal} from "@/contexts/ModalsContext";
import Link from "next/link";

interface BooksItemProps {
    id: number;
    author: string;
    title: string;
    authorStrId: string
}
export const BooksItem = (props: BooksItemProps) => {
    const {openModal} = useModal()

    const deleteBook = () => {
      openModal('deleteModal',
          {content: {'bookId': props.id}})
    }
    
    const editBook = () => {
      openModal('editModal',
          {content: {'author': props.author,
                  'title': props.title,
                  'bookId': props.id}})
    }


  return (
      <div className={styles.item}>
          <span>{props.id}</span>
          <Link href={`/author/${props.authorStrId}`} className={styles.author}>{props.author}</Link>
          <span>{props.title}</span>
          <button onClick={editBook}>Редактировать</button>
          <button onClick={deleteBook}><FaTimes/></button>
      </div>
  )
}