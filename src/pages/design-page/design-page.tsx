import { FC, useEffect } from 'react'
import { Typography } from '@alfalab/core-components/typography'
import { Category } from 'components/category'
import { Loading } from 'components/loading'
import { ErrorPage } from 'pages/error-page'
import { useAppDispatch, useAppSelector } from 'store'
import { hasErrorSelector, isLoadingSelector, productsPreviewSelector, request } from 'store/your-design'
import styles from './design-page.module.css'


export const DesignPage: FC = () => {

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
        <Typography.TitleResponsive tag="h1" view="large">
          Свой дизайн
        </Typography.TitleResponsive>
        <Typography.Text>
          Выберите вещь, а затем — цвет, размер и стикер. Перенесём стикер на вещь как на фото
        </Typography.Text>
      </div>

      <ul>
        {productList.length && productList.map((group) => (
          <li key={group.id}>
            <Category groupId={group.id} productList={group} />
          </li>
        ))}
      </ul>
    </>
  )
}
