import { yourDesignReducer, request } from '../slice'
import mockData from 'assets/mock/your-design.json'


const initialState = {
  productsPreview: [],
  isLoading: false,
  hasError: false,
}


describe('Прверяем extraReducers', () => {

  test('статус - pending', () => {
    const state = yourDesignReducer(initialState, request.pending(''))

    expect(state.isLoading).toBe(true)
    expect(state.hasError).toBe(false)
  })


  test('статус - fulfilled', () => {
    const state = yourDesignReducer(initialState, request.fulfilled(mockData, ''))
    
    expect(state.productsPreview).toBe(mockData)
    expect(state.isLoading).toBe(false)
    expect(state.hasError).toBe(false)
  })

  
  test('статус - rejected', () => {
    const state = yourDesignReducer(initialState, request.rejected(null, ''))

    expect(state.productsPreview).toEqual([])
    expect(state.isLoading).toBe(false)
    expect(state.hasError).toBe(true)
  })
})
