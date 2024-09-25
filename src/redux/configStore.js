import { configureStore } from '@reduxjs/toolkit'
import authSlide from './authSlide'
export const store = configureStore({
  reducer: {
    authSlide
  },
})