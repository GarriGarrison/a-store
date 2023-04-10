import { RootState } from '..'

export const yourDesignSelector = (state: RootState) => state.yourDesign

export const productsPreviewSelector = (state: RootState) => yourDesignSelector(state).productsPreview
export const isLoadingSelector = (state: RootState) => yourDesignSelector(state).isLoading
export const hasErrorSelector = (state: RootState) => yourDesignSelector(state).hasError
