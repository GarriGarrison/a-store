import { productPathUrl, productSelect } from './product-path-url'
import mockProducts from 'assets/mock/products.json'
import mockGroups from 'assets/mock/groups.json'


describe('Тесты функции productPathUrl', () => {

  test('выбор продукта на странице «Сделано в Альфе»', () => {
    const changeProductId = 0
    const controlResult = mockProducts.products[changeProductId]

    expect(productPathUrl(`/sdelano-v-alfe/products${changeProductId}`)).toEqual(controlResult)
  })


  test('выбор продукта на странице «Свой дизайн» категория «Бархатные стикеры»', () => {
    const changeGroupId = 0
    const changeProductId = 5
    const controlResult = mockGroups.groups[changeGroupId].products[changeProductId - 5]

    expect(productPathUrl(`/svoy-dizain/groups${changeGroupId}/products${changeProductId}`)).toEqual(controlResult)
  })


  test('негативный, страница «Сделано в Альфе» -несуществующий список товаров', () => {
    const changeProductId = 500

    expect(productPathUrl(`/sdelano-v-alfe/products${changeProductId}`)).toBeNull()
  })


  test('негативный, страница «Свой дизайн» - несуществующая категория (группа товаров)', () => {
    const changeGroupId = 100
    const changeProductId = 5

    expect(productPathUrl(`/svoy-dizain/groups${changeGroupId}/products${changeProductId}`)).toBeNull()
  })


  test('негативный, страница «Свой дизайн» - несуществующий список товаров в выбранной категории', () => {
    const changeGroupId = 0
    const changeProductId = 100

    expect(productPathUrl(`/svoy-dizain/groups${changeGroupId}/products${changeProductId}`)).toBeNull()
  })
})



describe('Тесты функции productSelect (создание списка Options для компонента Select', () => {

  test('создание списка Options из списка строк', () => {
    const colors = ['white', 'black']
    const controlResult = [
      { key: '0', content: 'white' },
      { key: '1', content: 'black' },
    ]

    expect(productSelect(colors)).toEqual(controlResult)
  })


  test('создание списка Options из списка цифр', () => {
    const colors = [1, 2]
    const controlResult = [
      { key: '0', content: '1' },
      { key: '1', content: '2' },
    ]

    expect(productSelect(colors)).toEqual(controlResult)
  })
})
