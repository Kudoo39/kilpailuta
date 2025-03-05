'use client'
import LandingPage from './landing/page'
import { store } from '~/lib/store'
import { Provider } from 'react-redux'

export default function Home() {
  return (
    <Provider store={store}>
      <LandingPage />
    </Provider>
  )
}
