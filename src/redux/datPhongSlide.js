import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { datphongService } from "../service/datphong.service";

export const getDatphongApi = createAsyncThunk('datPhong/getDatphongApi', async (_,thunkAPI) => {
    const resolve = await datphongService.getAllDatPhongAdmin();
    return resolve.data.content
})


const initialState = {
    listDatphong: [],
}

const datPhongSlide = createSlice({
  name: 'datphong',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDatphongApi.pending, (state) => {
        state.listDatphong = []
      })
      .addCase(getDatphongApi.fulfilled, (state, action) => {
        state.listDatphong = action.payload
      })
  }
});

export const {} = datPhongSlide.actions

export default datPhongSlide.reducer