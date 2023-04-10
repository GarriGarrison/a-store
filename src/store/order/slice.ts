import { CaseReducer, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createOrder } from 'api/astore'
import { Order } from 'types'


type State = {
  order: Order | undefined
  isLoading: boolean
  hasError: boolean
  success: boolean 
}

const initialState: State = {
  order: undefined,
  isLoading: false,
  hasError: false,
  success: false,
}

export const create = createAsyncThunk(
  'order/create',
  async (order: Order) => await createOrder(order)
)

const addOrder: CaseReducer<State, PayloadAction<Order>> = (state, { payload }) => {
  state.order = payload
}

const editSuccess: CaseReducer<State, PayloadAction<boolean>> = (state, { payload }) => {
  state.success = payload
}


export const { actions: orderActions, reducer: orderReducer } = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder,
    editSuccess,
  },
  extraReducers: (builder) => {
    builder
      .addCase(create.pending, (state) => {
        state.isLoading = true
        state.hasError = false
        state.success = false
      })
      .addCase(create.fulfilled, (state) => {
        state.isLoading = false
        state.hasError = false
        state.success = true
      })
      .addCase(create.rejected, (state) => {
        state.isLoading = false
        state.hasError = true
        state.success = false
      })
  },
})
