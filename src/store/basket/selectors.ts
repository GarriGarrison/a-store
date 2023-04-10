import { RootState } from '..'


export const basketSelector = (state: RootState) => state.basket

export const productsSelector = (state: RootState) => basketSelector(state).products
export const totalSelector = (state: RootState) => basketSelector(state).total
export const isViewSelector = (state: RootState) => basketSelector(state).isView
export const isLoadingSelector = (state: RootState) => basketSelector(state).isLoading
export const hasErrorSelector = (state: RootState) => basketSelector(state).hasError
