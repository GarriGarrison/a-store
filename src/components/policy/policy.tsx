import { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './policy.module.css'

export const Policy: FC = () => {
  return (
    <div className={styles.container}>
      <Link to="/policy" className={styles.link}>
        Политика конфиденциальности<br />
        и обработки персональных данных
      </Link>
    </div>
  )
}
