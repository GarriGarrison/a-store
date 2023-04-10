import { FC } from 'react'
import { Typography } from '@alfalab/core-components/typography'
import errorServer from './img/errorServer.jpg'
import styles from './error-page.module.css'


export const ErrorPage: FC = () => {
  
  return (
    <div className={styles.container}>
      <Typography.TitleResponsive tag="h1" view="xlarge">
        Ошибка сервера
      </Typography.TitleResponsive>

      <img src={errorServer} alt="Error server" />
    </div>
  )
}
