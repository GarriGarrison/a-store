import { RootState } from '..'

export const productStateSelector = (state: RootState) => state.product

export const productSelector = (state: RootState) => productStateSelector(state).product
export const isLoadingSelector = (state: RootState) => productStateSelector(state).isLoading
export const hasErrorSelector = (state: RootState) => productStateSelector(state).hasError
