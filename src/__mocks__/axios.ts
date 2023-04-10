/* eslint-disable import/no-anonymous-default-export */
import productMock from '../assets/mock/products.json' 


export default {
  get: jest.fn(() => Promise.resolve({
    data: productMock
  }))
}
