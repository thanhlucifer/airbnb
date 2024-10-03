import { configureStore } from '@reduxjs/toolkit'
import authSlide from './authSlide'
import nguoiDungSilde from './nguoiDungSilde'
import viTriSlide from './viTriSlide'
import phongThueSlide from './phongThueSlide'

export const store = configureStore({
  reducer: {
    authSlide,
    nguoiDungSilde,
    viTriSlide,
    phongThueSlide
  },
})