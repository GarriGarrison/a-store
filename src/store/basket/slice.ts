import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UnitBasket } from 'types'


type State = {
  products: UnitBasket[] | undefined
  total: number
  isView: boolean
  isLoading: boolean
  hasError: boolean
}

const initialState: State = {
  products: undefined,
  total: 0,
  isView: true,
  isLoading: false,
  hasError: false,
}

const addProduct: CaseReducer<State, PayloadAction<UnitBasket>> = (state, { payload }) => {
  if (state.products) {
    const res = state.products.find((product) => product.idUnit === payload.idUnit)

    if (res) {
      res.count += 1
      res.sum = res.count * res.price
    } else {
      state.products = [...state.products, payload]
    }
  } else {
    state.products = [payload]
  }

  state.total += payload.price
}

const removeProduct: CaseReducer<State, PayloadAction<string>> = (state, { payload }) => {
  state.products = state.products?.filter((item) => {
    if (item.idUnit !== payload) {
      return true
    }
    
    state.total -= item.sum
    return false
  })
}

const incCountProduct: CaseReducer<State, PayloadAction<string>> = (state, { payload }) => {
  state.products?.forEach((item) => {
    if (item.idUnit === payload) {
      item.count += 1
      item.sum = item.count * item.price
      state.total += item.price
    }
  })
}

const decCountProduct: CaseReducer<State, PayloadAction<string>> = (state, { payload }) => {
  state.products?.forEach((item) => {
    if (item.idUnit === payload && item.count > 1) {
      item.count -= 1
      item.sum = item.count * item.price
      state.total -= item.price
    }
  })
}

const checkView: CaseReducer<State, PayloadAction<boolean>> = (state, { payload }) => {
  state.isView = payload
}

const loadBasket: CaseReducer<State, PayloadAction<UnitBasket[]>> = (state, { payload }) => {
  state.products = payload
  state.total = state.products.reduce((sum, product) => sum + product.price * product.count, 0)
}

const clearBasket: CaseReducer<State> = (state) => {
  state.products = undefined
  state.total = 0
}


export const { actions: basketActions, reducer: basketReducer } = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addProduct,
    removeProduct,
    incCountProduct,
    decCountProduct,
    checkView,
    loadBasket,
    clearBasket,
  },
})
