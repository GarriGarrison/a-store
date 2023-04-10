import { FC } from 'react'
import { List } from '@alfalab/core-components/list'
import { Typography } from '@alfalab/core-components/typography'
import { Space } from '@alfalab/core-components/space'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'
import styles from './contacts-page.module.css'


const point = [55.694459, 37.661994]


export const ContactsPage: FC = () => {

  return (
    <Space>
      <Typography.TitleResponsive tag="h1" view="large">
        <div className={styles.gap_2xl}>Контакты</div>
      </Typography.TitleResponsive>

      <List tag="ul" marker=" ">
        <Typography.Text>
          +7 906 061 60 20 <br />
          info@alfabankstore.ru
        </Typography.Text>

        <Typography.Text>г. Москва, пр-т Андропова, 18 корп. 3</Typography.Text>

        <Typography.Text>
          пн-чт: 10:00—19:00 <br />
          пт: 10:00—17:30
        </Typography.Text>

        <Typography.Text>Принимаем к оплате карты Visa, Mastercard, МИР.</Typography.Text>
      </List>

      <YMaps>
        <div>
          <Map defaultState={{ center: point, zoom: 15 }} className={styles.map}>
            <Placemark geometry={point} />
          </Map>
        </div>
      </YMaps>
    </Space>
  )
}
