import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller, FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Grid } from '@alfalab/core-components/grid'
import { Gap } from '@alfalab/core-components/gap'
import { Typography } from '@alfalab/core-components/typography'
import { Input } from '@alfalab/core-components/input'
import { PhoneInput } from '@alfalab/core-components/phone-input'
import { RadioGroup } from '@alfalab/core-components/radio-group'
import { Radio } from '@alfalab/core-components/radio'
import { Checkbox } from '@alfalab/core-components/checkbox'
import { Textarea } from '@alfalab/core-components/textarea'
import { Button } from '@alfalab/core-components/button'
import { Amount } from '@alfalab/core-components/amount'
import { IconButton } from '@alfalab/core-components/icon-button'
import { ModalDesktop } from '@alfalab/core-components/modal/desktop'
import { BasketUnit } from 'components/basket-unit'
import { Loading } from 'components/loading'
import { ErrorPage } from 'pages/error-page'
import { CrossHeavyMIcon } from '@alfalab/icons-glyph/CrossHeavyMIcon'
import { MaterialArrowBackMIcon } from '@alfalab/icons-glyph/MaterialArrowBackMIcon'
import { useAppDispatch, useAppSelector } from 'store'
import { basketActions, productsSelector, totalSelector } from 'store/basket'
import { create, hasErrorSelector, isLoadingSelector, orderActions, successSelector } from 'store/order'
import { convertBasketOrder } from './helpers/convert-basket-order'
import { Order } from 'types'
import styles from './order-page.module.css'
import { useInputsStorage } from './use-inputs-storage'


const schema = yup
  .object({
    fullname: yup.string().min(3, 'минимум 3 символа').required('обязательное поле'),
    email: yup.string().email('несоответствует формату почты').required('обязательное поле'),
    phone: yup.string().min(16, 'телефонный номер должен состоять из 10-ти цифр').required('обязательное поле'),
    address: yup.string(),
    deliveryType: yup.string(),
    promo: yup.string(),
    policy: yup.boolean().required('обязательное поле'),
    comment: yup.string(),
    paymentType: yup.string().required('обязательное поле'),
  })
  .required()

type FormData = yup.InferType<typeof schema>


export const OrderPage: FC = () => {
  const navigate = useNavigate()

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'all',
    resolver: yupResolver(schema),
  })

  const dispatch = useAppDispatch()
  const basket = useAppSelector(productsSelector)
  const total = useAppSelector(totalSelector)
  const isLoading = useAppSelector(isLoadingSelector)
  const hasError = useAppSelector(hasErrorSelector)
  const successOrder = useAppSelector(successSelector)

  const [deliveryMoney, setDeliveryMoney] = useState(0)
  const handleChange = (value: number) => {
    setDeliveryMoney(value)
  }

  useEffect(() => {
    dispatch(basketActions.checkView(false))

    return () => {
      dispatch(basketActions.checkView(true))
    }
  }, [dispatch])

  const handleNavigateReturn = () => navigate(-1)

  const { setInputStorage, inputFullName, inputEmail, inputPhone, inputAddress, inputPromo, inputComment } = useInputsStorage()

  const onSubmit = (data: FieldValues) => {
    const order: Order = {
      name: data.fullname,
      email: data.email,
      phone: data.phone,
      address: data.address,
      comment: data.comment,
      deliveryType: data.deliveryType,
      paymentType: data.paymentType,
      products: convertBasketOrder(basket!),
    }

    dispatch(create(order))
    dispatch(orderActions.addOrder(order))
    reset()
    setDeliveryMoney(0)
    dispatch(basketActions.clearBasket())
  }

  const handleModalClose = () => {
    dispatch(orderActions.editSuccess(false))

    handleNavigateReturn()
  }

  if (isLoading) {
    return <Loading />
  }

  if (hasError) {
    return <ErrorPage />
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <IconButton icon={MaterialArrowBackMIcon} size="xxs" className={styles.button} onClick={handleNavigateReturn} />
        <Typography.TitleResponsive tag="h1">Ваш Заказ</Typography.TitleResponsive>
        <IconButton icon={CrossHeavyMIcon} size="xxs" className={styles.button} onClick={handleNavigateReturn} />
      </div>
      <Gap size="3xl" />

      <Grid.Row gutter={{ mobile: 0, tablet: 0, desktop: { m: 24 } }}>
        <Grid.Col width={{ mobile: 12, tablet: 12, desktop: 4 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography.Text>
              <label htmlFor="fullname">ФИО</label>
              <Controller
                name="fullname"
                control={control}
                rules={{ required: true }}
                render={({ field: { value = inputFullName || '' } }) => (
                  <Input {...register('fullname')} value={value} onBlur={setInputStorage} />
                )}
              />
              {errors?.fullname && <p className={styles.error}>{(errors?.fullname?.message as string) || 'Error'}</p>}
            </Typography.Text>

            <Gap size="xl" />

            <Typography.Text>
              <label htmlFor="email">e-mail</label>
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field: { value = inputEmail || '' } }) => (
                  <Input {...register('email')} value={value} onBlur={setInputStorage} />
                )}
              />
              {errors?.email && <p className={styles.error}>{(errors?.email?.message as string) || 'Error'}</p>}
            </Typography.Text>

            <Gap size="xl" />

            <Typography.Text>
              <label htmlFor="phone">Телефон</label>
              <Controller
                name="phone"
                control={control}
                rules={{ required: true }}
                render={({ field: { value = inputPhone || '' } }) => (
                  <PhoneInput {...register('phone')} value={value} onBlur={setInputStorage} />
                )}
              />
              {errors?.phone && <p className={styles.error}>{(errors?.phone?.message as string) || 'Error'}</p>}
            </Typography.Text>

            <Gap size="xl" />

            <Typography.Text>
              <label htmlFor="address">Адрес (если вы выбрали самовывоз — оставьте поле пустым)</label>
              <Controller
                name="address"
                control={control}
                rules={{ required: true }}
                render={({ field: { value = inputAddress || '' } }) => (
                  <Input {...register('address')} value={value} onBlur={setInputStorage} />
                )}
              />
            </Typography.Text>

            <Gap size="xl" />

            <Typography.Text>
              <Controller
                name="deliveryType"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <RadioGroup label="Доставка" direction="vertical" name="radioGroup" onChange={onChange} value={value}>
                    <Radio
                      label="Доставка по России — 350₽"
                      value="Доставка по России — 350₽"
                      onClick={() => handleChange(350)}
                    />
                    <Radio
                      label="Курьером по Москве — 300₽"
                      value="Курьером по Москве — 300₽"
                      onClick={() => handleChange(300)}
                    />
                    <Radio
                      label="Самовывоз (пр-т Андропова, 18 корп. 3)"
                      value="Самовывоз (пр-т Андропова, 18 корп. 3)"
                      onClick={() => handleChange(0)}
                    />
                  </RadioGroup>
                )}
              />
              {errors?.deliveryType && <p className={styles.error}>Обязательно нужно delivery</p>}
            </Typography.Text>

            <Gap size="xl" />

            <Typography.Text>
              <label htmlFor="promo">Промокод</label>
              <Controller
                name="promo"
                control={control}
                rules={{ required: true }}
                render={({ field: { value = inputPromo || '' } }) => (
                  <Input {...register('promo')} value={value} onBlur={setInputStorage} />
                )}
              />
            </Typography.Text>

            <Gap size="xl" />

            <Typography.Text>
              <Controller
                name="policy"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value = false } }) => (
                  <Checkbox
                    onChange={onChange}
                    checked={value}
                    label="Согласен с политикой конфиденциальности и обработки персональных данных"
                  />
                )}
              />
              {errors?.policy && <p className={styles.error}>Обязательно нужно согласиться</p>}
            </Typography.Text>

            <Gap size="xl" />

            <Typography.Text>
              <label htmlFor="comment">Комментарий к заказу</label>
              <Controller
                name="comment"
                control={control}
                rules={{ required: true }}
                render={({ field: { value = inputComment || '' } }) => (
                  <Textarea {...register('comment')} value={value} onBlur={setInputStorage} />
                )}
              />
            </Typography.Text>

            <Gap size="xl" />

            <Typography.Text>
              Выберите способ оплаты «Промокод», если ваш заказ не превышает сумму промокода. Если больше — выберите
              оплату картой.
              <Controller
                name="paymentType"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <RadioGroup
                    label="Способ оплаты"
                    direction="vertical"
                    name="radioGroup"
                    onChange={onChange}
                    value={value}
                  >
                    <Radio label="Банковская карта" value="Банковская карта" />
                    <Radio label="Промокод" value="Промокод" />
                  </RadioGroup>
                )}
              />
              {errors?.paymentType && <p className={styles.error}>Обязательно нужно выбрать способ оплаты</p>}
            </Typography.Text>
            <Gap size="xl" />

            <Button type="submit" size="xxs" view="primary" block className={styles.button}>
              Дальше
            </Button>
          </form>
        </Grid.Col>
        <Grid.Col width={{ mobile: 12, tablet: 12, desktop: 4 }}>
          <ul>
            {basket?.map((unit) => (
              <li key={unit.idUnit}>
                <BasketUnit unit={unit} />
              </li>
            ))}
          </ul>
        </Grid.Col>

        <Grid.Col width={{ mobile: 12, tablet: 12, desktop: 4 }}>
          <div className={styles.total}>
            <Typography.Title tag="div" view="small">
              Сумма:&#160;
              <Amount value={total * 100} minority={100} currency="RUR" className={styles.price} />
            </Typography.Title>
            <Gap size="xl" />
            <>
              <Typography.Text>
                Доставка по России —&#160;
                <Amount value={Number(deliveryMoney) * 100} minority={100} currency="RUR" className={styles.price} />
              </Typography.Text>
              <Typography.Title tag="div" view="small">
                Итого:&#160;
                <Amount value={(total + deliveryMoney) * 100} minority={100} currency="RUR" className={styles.price} />
              </Typography.Title>
            </>
          </div>
        </Grid.Col>
      </Grid.Row>

      <ModalDesktop open={successOrder} onClose={handleModalClose} size="m">
        <ModalDesktop.Header hasCloser={true} />
        <ModalDesktop.Content>
          <Typography.Title tag="div" view="small">
            Ваш заказ успешно оформлен
          </Typography.Title>
          <br />
          <Typography.Text tag="p">Будет совершён возврат на страницу товара</Typography.Text>
        </ModalDesktop.Content>
        <ModalDesktop.Footer>
          <Button view="primary" size="s" onClick={handleModalClose}>
            ʕ•́ᴥ•̀ʔっ♡ Отлично! ʕ ᵔᴥᵔ ʔ
          </Button>
        </ModalDesktop.Footer>
      </ModalDesktop>
    </div>
  )
}
