import mockProducts from 'assets/mock/products.json'
import mockGroups from 'assets/mock/groups.json'
import { Product } from 'types'


export const productPathUrl = (url: string): Product | null => {

  const pathUlr = url.split('/')

  const productTypeUrt = pathUlr[1]
  let groupUrl: number
  let productUrl: number

  if (productTypeUrt === 'svoy-dizain') {
    groupUrl = Number(pathUlr[2].slice(6))
    productUrl = Number(pathUlr[3].slice(8))

    const group = mockGroups.groups.find((group) => group.id === groupUrl)

    if (group) {
      const product = group.products.find((product) => product.id === productUrl)

      if (product) {
        return product as unknown as Product
      }

      return null
    }

    return null
  }

  productUrl = Number(pathUlr[2].slice(8))
  const product = mockProducts.products.find((product) => product.id === productUrl)

  if (product) {
    return product as unknown as Product
  }

  return null
}

export const productSelect = <T>(list: T[]) => {
  return list.map((item, index) => {
    return { key: String(index), content: String(item) }
  })
}
