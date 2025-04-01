import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import authReducer from './features/auth/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer
  }
})
