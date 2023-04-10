import mockData from 'assets/mock/your-design.json'


export const state = {
  madeAlfa: {
    productsPreview: [],
    isLoading: false,
    hasError: false,
  },
  yourDesign: {
    productsPreview: mockData,
    isLoading: false,
    hasError: false,
  },
  product: {
    product: undefined,
    isLoading: false,
    hasError: false,
  },
  basket: {
    products: undefined,
    total: 0,
    isView: true,
    isLoading: false,
    hasError: false,
  },
  order: {
    order: undefined,
    isLoading: false,
    hasError: false,
    success: false,
  },
}
