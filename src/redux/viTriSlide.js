import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { viTriService} from "../service/viTri.service";
export const getViTriApi = createAsyncThunk('viTri/getViTriApi', async (_,thunkAPI) => {
    const resolve = await viTriService.getALLViTriAdmin();
    return resolve.data.content
})


const initialState = {
    listViTri: [],
}

const viTriSlide = createSlice({
  name: 'viTri',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getViTriApi.fulfilled, (state, action) => {
        state.listViTri = action.payload
      })
  }
})

export const {} = viTriSlide.actions

export default viTriSlide.reducer