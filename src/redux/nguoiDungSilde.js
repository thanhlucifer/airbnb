import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nguoidungService } from "../service/nguoidung.service";

export const getValueUserApi = createAsyncThunk('nguoiDung/getValueUserApi', async (_,thunkAPI) => {
    const resolve = await nguoidungService.getAll();
    console.log(resolve)
    return resolve.data.content
})


const initialState = {
    listNguoiDung: [],
}

const nguoiDungSlide = createSlice({
  name: 'nguoiDung',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getValueUserApi.fulfilled, (state, action) => {
        console.log(action)
        state.listNguoiDung = action.payload
    })
  }
})

export const {} = nguoiDungSlide.actions

export default nguoiDungSlide.reducer