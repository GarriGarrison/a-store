import { FC } from 'react'
import { Link } from 'react-router-dom';
import { Grid } from '@alfalab/core-components/grid'
import frame_45 from './img/Frame_45.jpeg'
import frame_46 from './img/Frame_46.jpeg'
import styles from './home-page.module.css'


export const HomePage: FC = () => {
  
  return (
    <div className={styles.wrapper}>
      <Grid.Row gutter={{ mobile: 0, tablet: 0, desktop: 0 }}>
        <Grid.Col width={{ mobile: 12, tablet: 12, desktop: 6 }}>
          <Link to="/sdelano-v-alfe" className={styles.darken}>
            <img src={frame_46} className={styles.image} alt="Сделано в Альфе" />
          </Link>
        </Grid.Col>
        <Grid.Col width={{ mobile: 12, tablet: 12, desktop: 6 }}>
          <Link to="/svoy-dizain" className={styles.darken}>
            <img src={frame_45} className={styles.image} alt="Свой дизайн" />
          </Link>
        </Grid.Col>
      </Grid.Row>
    </div>
  )
}
