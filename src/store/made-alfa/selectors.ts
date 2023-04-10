import { RootState } from '..'


export const madeAlfaSelector = (state: RootState) => state.madeAlfa

export const productsPreviewSelector = (state: RootState) => madeAlfaSelector(state).productsPreview
export const isLoadingSelector = (state: RootState) => madeAlfaSelector(state).isLoading
export const hasErrorSelector = (state: RootState) => madeAlfaSelector(state).hasError
