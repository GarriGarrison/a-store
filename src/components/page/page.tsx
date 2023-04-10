import { FC, ReactNode } from 'react'
import { Header } from 'components/header'
import { Footer } from 'components/footer'
import { Basket } from 'components/basket'
import styles from './page.module.css'


type Props = {
  children?: ReactNode
}

export const Page: FC<Props> = ({ children }) => {
  
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <div className={styles.body}>{children}</div>
      </main>
      <Footer />

      <Basket />
    </div>
  )
}
