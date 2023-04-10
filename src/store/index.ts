import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { madeAlfaReducer } from './made-alfa'
import { yourDesignReducer } from './your-design'
import { productReducer } from './product'
import { basketReducer } from './basket'
import { orderReducer } from './order'


const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['madeAlfaReducer', 'yourDesignReducer', 'productReducer', 'orderReducer'],
}

export const store = configureStore({
  reducer: {
    madeAlfa: madeAlfaReducer,
    yourDesign: yourDesignReducer,
    product: productReducer,
    basket: persistReducer(persistConfig, basketReducer),
    order: orderReducer,
  },
})


export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
