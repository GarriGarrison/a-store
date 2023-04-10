import { productSelect } from '../product-path-url/product-path-url'
import { Product } from 'types'


type ProductSelectOptions = {
  title: string
  name: string
  selectList: {
    key: string
    content: string
  }[]
}

export const productSelectOptions = (product?: Product | null): ProductSelectOptions[] => {
  const result = []

  if (product?.colors) {
    result.push({
      title: 'Выбери подходящий цвет',
      name: 'color',
      selectList: productSelect(product.colors),
    })
  }

  if (product?.sizes) {
    result.push({
      title: 'Выбери нужный размер',
      name: 'size',
      selectList: productSelect(product.sizes),
    })
  }

  if (product?.stickerNumbers) {
    result.push({
      title: 'Выбери понравившуюся наклейку',
      name: 'stickerNumber',
      selectList: productSelect(product.stickerNumbers),
    })
  }

  if (product?.models) {
    result.push({
      title: 'Выбери понравившуюся модель',
      name: 'model',
      selectList: productSelect(product.models as string[]),
    })
  }

  return result
}
