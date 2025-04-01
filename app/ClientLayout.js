'use client'

import { Provider } from 'react-redux'
import { store } from '~/lib/store'
import Navbar from '~/components/nav/Navbar'
import Footer from '~/components/footer/Footer'
import AuthInitializer from '~/components/authInitializer/AuthInitializer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function ClientLayout({ children }) {
  return (
    <Provider store={store}>
      <AuthInitializer>
        <Navbar />
        {children}
        <Footer />
        <ToastContainer theme='colored' />
      </AuthInitializer>
    </Provider>
  )
}
