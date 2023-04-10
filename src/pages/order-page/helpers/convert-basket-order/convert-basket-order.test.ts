import { convertBasketOrder } from './convert-basket-order'
import { OrderProduct, UnitBasket } from 'types'

describe('Тесты функции convertBasketOrder', () => {

  test('конвертация одного товара без параметров', () => {
    const initBasket: UnitBasket[] = [
      {
        idProduct: 0,
        idUnit: "0undefinedundefinedundefinedundefined",
        title: "Рюкзак «Для умных и свободных»",
        preview: "http://qa-games.ru/astore/public/images/15932051.jpeg",
        count: 1,
        price: 4999,
        sum: 4999,
      }
    ]

    const controlResult = [
      {
        color: undefined,
        id: 0,
        models: undefined,
        size: undefined,
        stickerNumbers: undefined,
        totalCount: 1,
        totalPrice: 4999,
      }
    ]

    expect(convertBasketOrder(initBasket)).toEqual(controlResult)
  })


  test('конвертация нескольких товаров с параметрами', () => {
    const initBasket: UnitBasket[] = [
      {
        idUnit: '3undefinedundefinedundefinediPhone 11 Pro',
        idProduct: 3,
        preview: 'http://qa-games.ru/astore/public/images/15932051.jpeg',
        title: 'Чехол с кардхолдером"',
        price: 799,
        count: 1,
        sum: 799,
        models: 'iPhone 11 Pro',
      },
      {
        idUnit: '10whiteXL4undefined',
        idProduct: 10,
        preview: 'http://qa-games.ru/astore/public/images/48495271.png',
        title: 'Футболка оверсайз с FLAT-стикерами',
        price: 1949,
        count: 2,
        sum: 3292,
        colors: ['white'],
        sizes: ['XL'],
        stickerNumbers: [4],
      }
    ]

    const controlResult: OrderProduct[] = [
      {
        id: 3,
        totalPrice: 799,
        totalCount: 1,
        models: 'iPhone 11 Pro',
      },
      {
        id: 10,
        totalPrice: 1949,
        totalCount: 2,
        colors: ['white'],
        sizes: ['XL'],
        stickerNumbers: [4],
      }
    ]

    expect(convertBasketOrder(initBasket)).toEqual(controlResult)
  })
})
