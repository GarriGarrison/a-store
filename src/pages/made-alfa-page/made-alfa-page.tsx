import { FC, useEffect } from 'react'
import { Typography } from '@alfalab/core-components/typography'
import { Card } from 'components/card'
import { Loading } from 'components/loading'
import { ErrorPage } from 'pages/error-page'
import { useAppDispatch, useAppSelector } from 'store'
import { hasErrorSelector, isLoadingSelector, productsPreviewSelector, request } from 'store/made-alfa'
import styles from './made-alfa-page.module.css'


export const MadeAlfaPage: FC = () => {
  
  const dispatch = useAppDispatch()
  const productList = useAppSelector(productsPreviewSelector)
  const isLoading = useAppSelector(isLoadingSelector)
  const hasError = useAppSelector(hasErrorSelector)

  useEffect(() => {
    dispatch(request())
  }, [dispatch])


  if (isLoading) {
    return <Loading />
  }

  if (hasError) {
    return <ErrorPage />
  }

  return (
    <>
      <div className={styles.title}>
        <Typography.TitleResponsive tag="h1">Сделано в Альфе</Typography.TitleResponsive>
        <Typography.Text>Хотим каждую из этих вещей! Себе, родным и друзьям</Typography.Text>
      </div>

      <ul className={styles.cardList}>
        {productList.length && productList.map((product) => (
          <li key={product.id}>
            <Card
              link={`products${product.id}`}
              title={product.title}
              preview={product.preview}
              price={product.price}
            />
          </li>
        ))}
      </ul>
    </>
  )
}
