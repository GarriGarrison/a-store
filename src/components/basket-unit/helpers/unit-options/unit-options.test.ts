import { unitOptions } from './unit-options'
import { UnitBasket } from 'types'


describe('Тесты функции unitOptions', () => {

  test('проверка единицы товара со всеми параметрами', () => {
    const mockUnit = {
      id: 1677650600430,
      preview: 'http://qa-games.ru/astore/public/images/51168667.png',
      title: 'Футболка оверсайз с бархатными стикерами',
      price: 1799,
      count: 1,
      sum: 1799,
      colors: 'white',
      sizes: 'M',
      stickerNumbers: '2',
      models: 'oversize',
    }

    const controlResult = [
      { title: 'цвет: ', value: 'white' },
      { title: 'размер: ', value: 'M' },
      { title: 'наклейка: ', value: '2' },
      { title: 'модель: ', value: 'oversize' },
    ]

    expect(unitOptions(mockUnit as unknown as UnitBasket)).toEqual(controlResult)
  })


  test('проверка единицы товара без параметров', () => {
    const mockUnit = {
      id: 1677651250728,
      preview: 'http://qa-games.ru/astore/public/images/15932051.jpeg',
      title: 'Чехол с кардхолдером',
      price: 799,
      count: 1,
      sum: 799,
    }

    const controlResult: UnitBasket[] = []

    expect(unitOptions(mockUnit as unknown as UnitBasket)).toEqual(controlResult)
  })
})
