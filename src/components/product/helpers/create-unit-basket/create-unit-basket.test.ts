import { createUnitBasket } from './create-unit-basket'
import { ColorsProduct, SizesProduct, StickerNumbers } from 'types'


describe('Тесты функции selectView', () => {

  const initProductData = {
    id: 10,
    preview: 'image',
    title: 'Товар',
    price: 100,
  }


  test('создание единицы товара без опций', () => {
    const realDateNow = Date.now.bind(global.Date)
    const dateNowStub = jest.fn(() => 0)
    global.Date.now = dateNowStub
    
    const controlResult = {
      idProduct: 10,
      idUnit: '10undefinedundefinedundefinedundefined',
      preview: 'image',
      title: 'Товар',
      price: 100,
      count: 1,
      sum: 1 * 100,
    }

    expect(createUnitBasket(initProductData)).toEqual(controlResult)

    global.Date.now = realDateNow
  })


  test('создание единицы товара со всеми опциями', () => {
    const realDateNow = Date.now.bind(global.Date)
    const dateNowStub = jest.fn(() => 0)
    global.Date.now = dateNowStub

    const optionProduct = {
      color: { selected: { content: 'white' as unknown as ColorsProduct } },
      size: { selected: { content: 'XS' as unknown as SizesProduct } },
      stickerNumber: { selected: { content: 20 as unknown as StickerNumbers } },
      model: { selected: { content: 'iPhone 11' } },
    }

    const controlResult = {
      idProduct: 10,
      idUnit: '10whiteXS20iPhone 11',
      preview: 'image',
      title: 'Товар',
      price: 100,
      count: 1,
      sum: 1 * 100,
      colors: 'white',
      sizes: 'XS',
      stickerNumbers: 20,
      models: 'iPhone 11',
    }

    expect(createUnitBasket(initProductData, optionProduct)).toEqual(controlResult)

    global.Date.now = realDateNow
  })


  test('создание единицы товара со всеми опциями undefined', () => {
    const realDateNow = Date.now.bind(global.Date)
    const dateNowStub = jest.fn(() => 0)
    global.Date.now = dateNowStub

    const optionProduct = {
      color: undefined,
      size: undefined,
      stickerNumber: undefined,
      model: undefined,
    }

    const controlResult = {
      idUnit: "10undefinedundefinedundefinedundefined",
      idProduct: 10,
      preview: 'image',
      title: 'Товар',
      price: 100,
      count: 1,
      sum: 1 * 100,
      colors: undefined,
      sizes: undefined,
      stickerNumbers: undefined,
      models: undefined,
    }

    expect(createUnitBasket(initProductData, optionProduct)).toEqual(controlResult)

    global.Date.now = realDateNow
  })
})
