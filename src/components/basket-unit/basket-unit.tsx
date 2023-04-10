import { FC } from 'react'
import { Typography } from '@alfalab/core-components/typography'
import { Amount } from '@alfalab/core-components/amount'
import { IconButton } from '@alfalab/core-components/icon-button'
import { CrossMIcon } from '@alfalab/icons-glyph/CrossMIcon'
import { AddMIcon } from '@alfalab/icons-glyph/AddMIcon'
import { MinusMIcon } from '@alfalab/icons-glyph/MinusMIcon'
import { Divider } from '@alfalab/core-components/divider'
import { Gap } from '@alfalab/core-components/gap'
import { useAppDispatch } from 'store'
import { basketActions } from 'store/basket'
import { unitOptions } from './helpers/unit-options'
import { UnitBasket } from 'types'
import styles from './basket-unit.module.css'


type Props = {
  unit: UnitBasket
}

export const BasketUnit: FC<Props> = ({ unit }) => {

  const dispatch = useAppDispatch()

  const unitOptionsList = unitOptions(unit)

  const handleUnitRemove = () => {
    dispatch(basketActions.removeProduct(unit.idUnit))
  }

  const handleUnitIncrement = () => {
    dispatch(basketActions.incCountProduct(unit.idUnit))
  }

  const handleUnitDecrement = () => {
    dispatch(basketActions.decCountProduct(unit.idUnit))
  }
  

  return (
    <div className={styles.container}>
      <img src={unit.preview} className={styles.image} alt={unit.title} />
      <div className={styles.description_wrapper}>
        <div className={styles.description}>
          <Typography.Text>{unit.title}</Typography.Text>
          <Gap size="s" />
          {unitOptionsList.map((unit, index) => (
            <div key={index}>
              <Typography.Text>
                <span className={styles.options}>{unit.title}</span> {unit.value}
              </Typography.Text>
            </div>
          ))}
        </div>
        <div>
          <IconButton icon={CrossMIcon} size="xxs" className={styles.button} onClick={handleUnitRemove} />
        </div>
      </div>
      <div>
        <Typography.Title tag="div" view="small">
          <IconButton icon={MinusMIcon} size="xxs" className={styles.button} onClick={handleUnitDecrement} />
          <span className={styles.count}>{unit.count}</span>
          <IconButton icon={AddMIcon} size="xxs" className={styles.button} onClick={handleUnitIncrement} />
        </Typography.Title>
      </div>
      <Amount value={unit.sum * 100 || 0} minority={100} currency="RUR" className={styles.price} />
      <Divider className={styles.divider} />
    </div>
  )
}
