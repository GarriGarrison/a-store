import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getYourDesign } from 'api/astore'
import { YourDesignProduct } from 'types'


type State = {
  productsPreview: YourDesignProduct[]
  isLoading: boolean
  hasError: boolean
}

const initialState: State = {
  productsPreview: [],
  isLoading: false,
  hasError: false,
}

export const request = createAsyncThunk(
  'yourDesign/request',
  async () => await getYourDesign()
)

export const { actions: yourDesignActions, reducer: yourDesignReducer } = createSlice({
  name: 'yourDesign',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(request.pending, (state) => {
        state.isLoading = true
        state.hasError = false
      })
      .addCase(request.fulfilled, (state, action) => {
        state.isLoading = false
        state.hasError = false
        state.productsPreview = action.payload
      })
      .addCase(request.rejected, (state) => {
        state.isLoading = false
        state.hasError = true
        state.productsPreview = []
      })
  },
})
