import { productSelectOptions } from './product-select-option'
import mockProducts from 'assets/mock/products.json'
import { Product } from 'types'


describe('Тесты функции selectView', () => {

  test('проверка входного параметра с выбором цвета и размера', () => {
    const changeProduct = mockProducts.products[1] as Product

    const controlResult = [
      {
        title: 'Выбери подходящий цвет',
        name: 'color',
        selectList: [
          { key: '0', content: 'white' },
          { key: '1', content: 'black' },
          { key: '2', content: 'red' },
        ],
      },
      {
        title: 'Выбери нужный размер',
        name: 'size',
        selectList: [
          { key: '0', content: 'S' },
          { key: '1', content: 'M' },
          { key: '2', content: 'L' },
          { key: '3', content: 'XL' },
        ],
      },
    ]

    expect(productSelectOptions(changeProduct)).toEqual(controlResult)
  })

  
  test('проверка входного параметра равным NULL', () => {
    const controlResult: Product[] = []

    expect(productSelectOptions(null)).toEqual(controlResult)
  })
})
