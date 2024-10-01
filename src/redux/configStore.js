import { configureStore } from '@reduxjs/toolkit'
import authSlide from './authSlide'
import nguoiDungSilde from './nguoiDungSilde'

export const store = configureStore({
  reducer: {
    authSlide,
    nguoiDungSilde
  },
})