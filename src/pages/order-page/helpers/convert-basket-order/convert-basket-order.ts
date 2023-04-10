import { OrderProduct, UnitBasket } from 'types';


export const convertBasketOrder = (basket: UnitBasket[]): OrderProduct[] => {

  return basket.map((product) => {
    return {
      id: product.idProduct,
      totalPrice: product.price,
      totalCount: product.count,
      colors: product.colors,
      sizes: product.sizes,
      stickerNumbers: product.stickerNumbers,
      models: product.models as string,
    }
  })

}
