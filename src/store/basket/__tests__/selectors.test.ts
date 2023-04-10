import { productsSelector, totalSelector, isLoadingSelector, hasErrorSelector } from '../selectors'
import { state } from 'store/store-for-tests'


describe('Проверка Selectors', () => {
  
  test('получение productsPreview', () => {    
    const products = productsSelector(state)
    expect(products).toEqual(undefined)

    const total = totalSelector(state)
    expect(total).toBe(0)

    const isLoading = isLoadingSelector(state)
    expect(isLoading).toBe(false)

    const hasError = hasErrorSelector(state)
    expect(hasError).toBe(false)
  })
})
