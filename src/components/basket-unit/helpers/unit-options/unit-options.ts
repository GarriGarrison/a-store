import { UnitBasket } from 'types'


export const unitOptions = (unit: UnitBasket) => {
  const result = []

  if (unit.colors) {
    result.push({
      title: 'цвет: ',
      value: unit.colors,
    })
  }

  if (unit.sizes) {
    result.push({
      title: 'размер: ',
      value: unit.sizes,
    })
  }

  if (unit.stickerNumbers) {
    result.push({
      title: 'наклейка: ',
      value: unit.stickerNumbers,
    })
  }

  if (unit.models) {
    result.push({
      title: 'модель: ',
      value: unit.models,
    })
  }

  return result
}
