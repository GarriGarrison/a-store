import { UnitBasket } from 'types'
import { ProductOptions } from '../../product'

type ProductData = {
  id: number
  preview: string
  title: string
  price: number
}

export const createUnitBasket = (
  { id, preview, title, price }: ProductData,
  selectData?: ProductOptions | undefined
): UnitBasket => {
  const unit: UnitBasket = {
    idUnit: `${id}${selectData?.color?.selected.content}${selectData?.size?.selected.content}${selectData?.stickerNumber?.selected.content}${selectData?.model?.selected.content}`,
    idProduct: id,
    preview,
    title,
    price,
    count: 1,
    sum: price * 1,
  }

  if (selectData?.color) {
    unit.colors = selectData.color.selected.content
  }

  if (selectData?.size) {
    unit.sizes = selectData.size.selected.content
  }

  if (selectData?.stickerNumber) {
    unit.stickerNumbers = selectData.stickerNumber.selected.content
  }

  if (selectData?.model) {
    unit.models = selectData.model.selected.content
  }

  return unit
}
