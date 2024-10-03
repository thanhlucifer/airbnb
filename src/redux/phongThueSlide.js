import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { phongthueService } from "../service/phongthue.service";

export const getPhongthueApi = createAsyncThunk('phongThue/getPhongthueApi', async (_,thunkAPI) => {
    const resolve = await phongthueService.getAllphongthue();
    return resolve.data.content
})


const initialState = {
    listPhongthue: [],
}

const phongThueSlide = createSlice({
  name: 'phongthue',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPhongthueApi.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPhongthueApi.fulfilled, (state, action) => {
        state.isLoading = false
        state.listPhongthue = action.payload
      })
      .addCase(getPhongthueApi.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export const {} = phongThueSlide.actions

export default phongThueSlide.reducer