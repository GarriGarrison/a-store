import { FC } from 'react'
import { Typography } from '@alfalab/core-components/typography'
import { Card } from 'components/card/card'
import { YourDesignProduct } from 'types'
import styles from './category.module.css'


type Props = {
  groupId: number
  productList: YourDesignProduct
}

export const Category: FC<Props> = ({ groupId, productList }) => {

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Typography.TitleResponsive tag="h2" view="small">
          {productList.title}
        </Typography.TitleResponsive>
        <Typography.Text>{productList.description}</Typography.Text>
      </div>

      <ul className={styles.productList}>
        {productList.products.map((product) => (
          <li key={product.id}>
            <Card
              link={`groups${groupId}/products${product.id}`}
              title={product.title}
              preview={product.preview}
              price={product.price}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
