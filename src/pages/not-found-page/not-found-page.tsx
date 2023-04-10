import { FC } from 'react'
import { Typography } from '@alfalab/core-components/typography'
import notFound from './img/notFound.png'
import styles from './not-found-page.module.css'


export const NotFoundPage: FC = () => {

  return (
    <div className={styles.container}>
      <Typography.TitleResponsive tag="h1" view="xlarge">
        Страница не найдена
      </Typography.TitleResponsive>

      <img src={notFound} alt="Not Found" />
    </div>
  )
}
