import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { SidePanelDesktop } from '@alfalab/core-components/side-panel/desktop'
import { Typography } from '@alfalab/core-components/typography'
import { Policy } from 'components/policy'
import { useWindowSize } from 'hooks/use-window-size'
import { menuList, mobileWidth } from '../../constants'
import menu from './img/menu.svg'
import logo from './img/logo.png'
import styles from './header.module.css'


export const Header: FC = () => {

  const [isOpen, setIsOpen] = useState(false)
  const handleMenuOpen = () => setIsOpen(!isOpen)

  const size = useWindowSize()

  
  return (
    <header className={styles.container}>
      <Link to="/">
        <img src={logo} className={styles.logo} alt="logo" data-testid="logo" />
      </Link>

      <nav>
        <div className={styles.menu} onClick={handleMenuOpen}>
          <img src={menu} className={styles.image} alt="menu" data-testid="menu" />
          {size.width > mobileWidth && <span>МЕНЮ</span>}
        </div>

        <SidePanelDesktop open={isOpen} onClose={handleMenuOpen}>
          <SidePanelDesktop.Header hasCloser={true} sticky={true} />
          <SidePanelDesktop.Content>
            <div style={{ position: 'relative' }}>
              <Typography.Title tag="div" view="small">
                <ul>
                  {menuList.map((item, index) => (
                    <li key={index} onClick={handleMenuOpen}>
                      <Link to={item.to}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </Typography.Title>
            </div>
          </SidePanelDesktop.Content>
          <SidePanelDesktop.Footer sticky={true}>
            <Link to="/policy" onClick={handleMenuOpen}>
              <Policy />
            </Link>
          </SidePanelDesktop.Footer>
        </SidePanelDesktop>
      </nav>
    </header>
  )
}
