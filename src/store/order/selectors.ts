import { RootState } from '..'

export const orderStateSelector = (state: RootState) => state.order

export const orderSelector = (state: RootState) => orderStateSelector(state).order
export const isLoadingSelector = (state: RootState) => orderStateSelector(state).isLoading
export const hasErrorSelector = (state: RootState) => orderStateSelector(state).hasError
export const successSelector = (state: RootState) => orderStateSelector(state).success
