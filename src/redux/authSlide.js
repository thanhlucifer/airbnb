import { createSlice } from '@reduxjs/toolkit'
import { getLocalStorage } from '../util/util';

const initialState = {
    infoUser: getLocalStorage('user')
}

const authSlide = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getInfoUSer: (state, action) => {
       state.infoUser = action.payload
    },
    logout: (state) => {
      state.infoUser = null
      localStorage.removeItem('user'); 
    },
  }
});

export const {getInfoUSer, logout} = authSlide.actions

export default authSlide.reducer