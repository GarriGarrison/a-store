import { FC } from 'react'
import { Policy } from 'components/policy/policy'
import styles from './footer.module.css'


export const Footer: FC = () => {

  return (
    <footer className={styles.container}>
      <div className={styles.company}>© ООО «Альфа Фьюче Пипл», 2022</div>
      <Policy />
    </footer>
  )
}
