import axios from 'axios'
import { MadeAlfaProduct, YourDesignProduct, Product, Order } from 'types'


//* т.к это учебный проект, то нет разделения на env.local и env.production
//* .env находится под контролем GIT
const baseUrl = process.env.REACT_APP_BASE_URL


export const getMadeAlfaProducts = async (): Promise<MadeAlfaProduct[]> => {
  const response = await axios.get(`${baseUrl}/made-in-alfa`)
  return await response.data
}

export const getYourDesign = async (): Promise<YourDesignProduct[]> =>{
  const response = await axios.get(`${baseUrl}/your-design`)
  return await response.data
}

export const getProduct = async (id: number): Promise<Product> => {
  const response = await axios.get(`${baseUrl}/product/${id}`)
  return await response.data
}

export const createOrder = async (data: Order) => {
  await axios.post(`${baseUrl}/create-order`, data)
}
