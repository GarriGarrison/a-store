import axios from 'axios'
import { request } from '../slice'
import mockData from 'assets/mock/your-design.json'


jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>


describe('Проверяем запросы на сервер', () => {

  test('успешный запрос', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockData })
    
    const dispatch = jest.fn()
    const thunk = request()
    await thunk(dispatch, () => ({}), () => ({}))

    const { calls } = dispatch.mock
    const [start, end] = calls

    expect(start[0].type).toBe('yourDesign/request/pending')
    expect(end[0].type).toBe('yourDesign/request/fulfilled')
    expect(end[0].payload).toBe(mockData)
  })


  test('неудачный запрос', async () => {
    const dispatch = jest.fn()
    const thunk = request()
    await thunk(dispatch, () => ({}), () => ({}))

    const { calls } = dispatch.mock
    const [start, end] = calls

    expect(start[0].type).toBe('yourDesign/request/pending')
    expect(end[0].type).toBe('yourDesign/request/rejected')
    expect(end[0].error).not.toBeUndefined()
    
  })
})
