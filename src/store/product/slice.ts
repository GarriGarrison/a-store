import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getProduct } from 'api/astore'
import { Product } from 'types'

type State = {
  product: Product | undefined
  isLoading: boolean
  hasError: boolean
}

const initialState: State = {
  product: undefined,
  isLoading: false,
  hasError: false,
}

export const request = createAsyncThunk(
  'product/request',
  async (id: number) => await getProduct(id)
)

export const { actions: productActions, reducer: productReducer } = createSlice({
  name: 'product',
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
        state.product = action.payload
      })
      .addCase(request.rejected, (state) => {
        state.isLoading = false
        state.hasError = true
        state.product = undefined
      })
  },
})
