import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getMadeAlfaProducts } from 'api/astore'
import { MadeAlfaProduct } from 'types'


type State = {
  productsPreview: MadeAlfaProduct[]
  isLoading: boolean
  hasError: boolean
}

const initialState: State = {
  productsPreview: [],
  isLoading: false,
  hasError: false,
}

export const request = createAsyncThunk(
  'madeAlfa/request',
  async () => await getMadeAlfaProducts()
)

export const { actions: madeAlfaActions, reducer: madeAlfaReducer } = createSlice({
  name: 'madeAlfa',
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
