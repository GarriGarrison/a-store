export type PreviewProduct = {
  id: number
  preview: string
  title: string
  subtitle?: string
  description: string
  price: number
  availability: boolean
}

export type ColorsProduct = ['white' | 'black' | 'red' | 'green' | 'gray']
export type SizesProduct = ['XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL']
export type StickerNumbers = [1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20]

export type MadeAlfaProduct = Omit<PreviewProduct, 'subtitle'>

export type YourDesignProduct = {
  id: number
  title: string
  description: string
  products: PreviewProduct[]
}

type OptionsProduct = {
  colors?: ColorsProduct
  sizes?: SizesProduct
  stickerNumbers?: StickerNumbers
  models?: string[] | string
}

export type Product = PreviewProduct & OptionsProduct & {
    images: string[]
  }

export type UnitBasket = Pick<Product, 'colors' | 'sizes' | 'stickerNumbers' | 'models'> & {
  idUnit: string
  idProduct: number
  preview: string
  title: string
  price: number
  count: number
  sum: number
}

export type Order = {
  name: string
  email: string
  phone: string
  address: string
  comment?: string
  deliveryType: 'Доставка по России — 350₽' | 'Курьером по Москве — 300₽' | 'Самовывоз (пр-т Андропова, 18 корп. 3)'
  paymentType: 'Банковская карта' | 'Промокод'
  products?: OrderProduct[]
}

export type OrderProduct = OptionsProduct & {
  id: number
  totalPrice: number
  totalCount: number
}
