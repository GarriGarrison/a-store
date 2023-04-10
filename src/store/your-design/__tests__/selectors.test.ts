import { productsPreviewSelector, isLoadingSelector, hasErrorSelector } from '../selectors'
import { state } from 'store/store-for-tests'
import mockData from 'assets/mock/your-design.json'


describe('Проверка Selectors', () => {
  
  test('получение productsPreview', () => {    
    const products = productsPreviewSelector(state)
    expect(products).toEqual(mockData)

    const isLoading = isLoadingSelector(state)
    expect(isLoading).toBe(false)

    const hasError = hasErrorSelector(state)
    expect(hasError).toBe(false)
  })
})
