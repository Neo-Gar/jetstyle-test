import styles from "@/styles/pages/author.module.scss";
import baseButtonStyles from "@/styles/components/baseButton.module.scss"
import {router} from "next/client";
import Link from 'next/link'
import {useEffect, useState} from "react";
import {BiError} from "react-icons/bi";


export default function Author() {
    const [data, setData] = useState(null)
    const [error, setError] = useState()

    useEffect(() => {
        fetch(`http://localhost:3050/api/authors/${router.query.slug}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка при получении данных')
                }
                return response.json();
            })
            .then(data => setData(data))
            .catch(error => setError(error.message))
    }, []);


    return (
      <div className={styles.wrap}>
          <div className={styles.author}>
              <div className={styles.title}>
                  <h2>О авторе</h2>
              </div>
              {error ? (
                  <>
                    <BiError/>
                    <p>{error}</p>
                  </>
              ): !error && data !== null ? (
                  <div className={styles.content}>
                      <div className={styles.name}>
                          <h3>{data.author}</h3>
                      </div>
                      <div className={styles.bio}>
                          <h3>Биография</h3>
                          <p>{data.bio}</p>
                      </div>
                  </div>
              ): (
                  <>
                    <p>Загрузка...</p>
                  </>
              )}
              <Link href={'/'} className={baseButtonStyles.baseButton}>
                  Назад
              </Link>
          </div>
      </div>
  )
}