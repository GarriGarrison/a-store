import { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { Grid } from '@alfalab/core-components/grid'
import { Typography } from '@alfalab/core-components/typography'
import { Amount } from '@alfalab/core-components/amount'
import { Button } from '@alfalab/core-components/button'
import { Select } from '@alfalab/core-components/select'
import { Gap } from '@alfalab/core-components/gap'
import { Loading } from 'components/loading'
import { ErrorPage } from 'pages/error-page'
import { NotFoundPage } from 'pages/not-found-page'
import { useAppDispatch, useAppSelector } from 'store'
import { hasErrorSelector, isLoadingSelector, productSelector, request } from 'store/product'
import { basketActions } from 'store/basket'
import { productSelectOptions } from './helpers/product-select-option'
import { createUnitBasket } from './helpers/create-unit-basket'
import { ColorsProduct, SizesProduct, StickerNumbers } from 'types'
import styles from './product.module.css'


export type ProductOptions = {
  color?: {
    selected: {
      content: ColorsProduct
    }
  }
  size?: {
    selected: {
      content: SizesProduct
    }
  }
  stickerNumber?: {
    selected: {
      content: StickerNumbers
    }
  }
  model?: {
    selected: {
      content: string
    }
  }
}


export const Product: FC = () => {

  const { control, handleSubmit, formState: { isValid } } = useForm()

  const dispatch = useAppDispatch()
  const product = useAppSelector(productSelector)
  const isLoading = useAppSelector(isLoadingSelector)
  const hasError = useAppSelector(hasErrorSelector)

  const location = useLocation()
  const productId = location.pathname.split('/').at(-1)?.slice(8)

  const [previewImage, setPreviewImage] = useState(0)

  useEffect(() => {
    if (productId) {
      dispatch(request(Number(productId)))
    }
  }, [dispatch, productId])


  if (isLoading) {
    return <Loading />
  }

  if (hasError) {
    return <ErrorPage />
  }

  if (product) {
    const productSelectOptionList = productSelectOptions(product)

    const unitProduct = {
      id: product.id,
      preview: product.preview,
      title: product.title,
      price: product.price,
    }

    const onSubmit = (data: ProductOptions) => {
      const unit = createUnitBasket(unitProduct, data)

      dispatch(basketActions.addProduct(unit))
    }

    const openImage = (index: number) => {
      setPreviewImage(index)
    }

    return (
      <Grid.Row gutter={{ mobile: 0, tablet: 0, desktop: { m: 24 } }}>
        <Grid.Col width={{ mobile: 12, tablet: 12, desktop: 6 }}>
          {product && <img src={product.images[previewImage]} className={styles.view} alt="внешний вид товара" />}
          <div className={styles.preview__wrapper}>
            {product.images.map((image, index) => (
              <div
                key={index}
                onClick={() => {
                  openImage(index)
                }}
                className={styles.preview__image}
                style={{
                  backgroundImage: `url(${image})`,
                }}
              />
            ))}
          </div>
        </Grid.Col>

        <Grid.Col width={{ mobile: 12, tablet: 12, desktop: 6 }}>
          <Typography.TitleResponsive tag="h2" view="medium">
            {product.title}
          </Typography.TitleResponsive>

          <div className={styles.subtitle}>
            <Typography.Text view="primary-large">{product.subtitle}</Typography.Text>
          </div>

          <div className={styles.price}>
            <Typography.TitleResponsive tag="h3" view="small">
              <Amount value={product.price * 100 || 0} minority={100} currency="RUR" />
            </Typography.TitleResponsive>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.price}>
              <Button type="submit" size="m" view="primary" disabled={!isValid}>
                В корзину
              </Button>
            </div>

            <Gap size="l" />

            {productSelectOptionList.map((selectView, index) => (
              <div key={index} className={styles.select}>
                <Typography.TitleResponsive tag="h3" view="xsmall">
                  {selectView.title}
                  <Gap size="m" />
                </Typography.TitleResponsive>
                <Controller
                  name={selectView.name}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select {...field} options={selectView.selectList} size="s" placeholder="Выбор..." />
                  )}
                />
              </div>
            ))}
          </form>

          <Typography.Text>{product.description}</Typography.Text>
        </Grid.Col>
      </Grid.Row>
    )
  }

  return <NotFoundPage />
}
