import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Page as Layout } from 'components/page'
import { Product } from 'components/product'
import { HomePage } from 'pages/home-page'
import { MadeAlfaPage } from 'pages/made-alfa-page'
import { DesignPage } from 'pages/design-page/'
import { ContactsPage } from 'pages/contacts-page'
import { OrderPage } from 'pages/order-page'
import { PolicyPage } from 'pages/policy-page'
import { NotFoundPage } from 'pages/not-found-page'


export const App: FC = () => {

  return (
    <Routes>
      <Route path="/" element={<Layout children={<HomePage />} />} />
      <Route path="/sdelano-v-alfe" element={<Layout children={<MadeAlfaPage />} />} />
      <Route path="/sdelano-v-alfe/:product" element={<Layout children={<Product />} />} />
      <Route path="/svoy-dizain" element={<Layout children={<DesignPage />} />} />
      <Route path="/svoy-dizain/:group/:product" element={<Layout children={<Product />} />} />
      <Route path="/contact-us" element={<Layout children={<ContactsPage />} />} />
      <Route path="/basket" element={<Layout children={<OrderPage />} />} />
      <Route path="/policy" element={<Layout children={<PolicyPage />} />} />
      <Route path="*" element={<Layout children={<NotFoundPage />} />} />
    </Routes>
  )
}
