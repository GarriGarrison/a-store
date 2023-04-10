import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SuperEllipse } from '@alfalab/core-components/icon-view/super-ellipse'
import { PfmBasketMIcon } from '@alfalab/icons-glyph/PfmBasketMIcon'
import { SidePanelDesktop } from '@alfalab/core-components/side-panel/desktop'
import { Button } from '@alfalab/core-components/button'
import { Typography } from '@alfalab/core-components/typography'
import { Divider } from '@alfalab/core-components/divider'
import { Badge } from '@alfalab/core-components/badge'
import { BasketUnit } from 'components/basket-unit'
import { useAppSelector } from 'store'
import { isViewSelector, productsSelector, totalSelector } from 'store/basket'
import styles from './basket.module.css'


export const Basket: FC = () => {

  const basket = useAppSelector(productsSelector)
  const total = useAppSelector(totalSelector)
  const isView = useAppSelector(isViewSelector)

  const [isOpen, setIsOpen] = useState(false)
  const handleMenuOpen = () => setIsOpen(!isOpen)


  return (
    <>
      {basket?.length && isView ? (
        <div>
          <button onClick={handleMenuOpen} className={styles.button}>
            <SuperEllipse size={64} backgroundColor="#1d2434">
              <PfmBasketMIcon className={styles.icon} />
            </SuperEllipse>
            <Badge view="count" height={24} content={basket.length} className={styles.count} />
          </button>
        </div>
      ) : null}

      <div>
        <SidePanelDesktop open={isOpen && !!basket?.length} onClose={handleMenuOpen}>
          <SidePanelDesktop.Header hasCloser={true} sticky={true} />
          <SidePanelDesktop.Content>
            <Typography.Title tag="div" view="large">
              Ваш заказ
            </Typography.Title>
            <Divider className={styles.divider} />

            <div style={{ position: 'relative' }}>
              <Typography.Title tag="div" view="small">
                <ul>
                  {basket?.map((unit) => (
                    <li key={unit.idUnit}>
                      <BasketUnit unit={unit} />
                    </li>
                  ))}
                </ul>
              </Typography.Title>
            </div>
            <div className={styles.total}>
              <Typography.Title tag="div" view="small">
                Сумма: {total}
              </Typography.Title>
            </div>
            <Link to="/basket">
              <Button onClick={handleMenuOpen} block>
                Оформить заказ
              </Button>
            </Link>
          </SidePanelDesktop.Content>
        </SidePanelDesktop>
      </div>
    </>
  )
}
