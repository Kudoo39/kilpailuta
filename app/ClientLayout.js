'use client'

import { Provider } from 'react-redux'
import { store } from '~/lib/store'
import Navbar from '~/components/nav/Navbar'
import Footer from '~/components/footer/Footer'

export default function ClientLayout({ children }) {
  return (
    <Provider store={store}>
      <Navbar />
      {children}
      <Footer />
    </Provider>
  )
}
