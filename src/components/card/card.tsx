import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@alfalab/core-components/typography'
import { Amount } from '@alfalab/core-components/amount'
import { Space } from '@alfalab/core-components/space'
import styles from './card.module.css'


type Props = {
  preview: string
  title: string
  subtitle?: string
  price: number
  link: string
}

export const Card: FC<Props> = ({ preview, title, subtitle, price, link }) => {
  
  return (
    <Link to={link} className={styles.container}>
      <Space size="s">
        <img src={preview} className={styles.image} alt={title} />
        <Typography.Text tag="div">{title}</Typography.Text>
        <Typography.Text tag="div">{subtitle}</Typography.Text>
        <Amount value={price * 100 || 0} minority={100} currency="RUR" />
      </Space>
    </Link>
  )
}
