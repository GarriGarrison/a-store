import { basketActions, basketReducer } from '../slice'
import { state } from 'store/store-for-tests'


describe('Проверка Reducer', () => {

  test('проверка на возврат default state при пустом action', () => {
    const result = basketReducer(undefined, { type: '' })
    expect(result).toEqual(state.basket)
  })


  test('проверка action - addProduct', () => {
    const mockData = {
      id: 0,
      preview: 'img',
      title: 'title',
      price: 100,
      count: 1,
      sum: 100,
    }

    const action = {
      type: basketActions.addProduct.type,
      payload: mockData,
    }

    const result = basketReducer(state.basket, action)
    //@ts-ignore
    expect(result.products[0]).toEqual(mockData)
  })
})
