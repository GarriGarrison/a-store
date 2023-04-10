import { FC } from 'react'
import { Spinner } from '@alfalab/core-components/spinner'
import styles from './loading.module.css'


export const Loading: FC = () => {

  return (
    <div className={styles.container}>
      <Spinner visible={true} size="m" />
    </div>
  )
}
