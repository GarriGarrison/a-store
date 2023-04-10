import { render, screen } from '@testing-library/react'
import {BrowserRouter as Router} from 'react-router-dom'
import { ErrorPage } from '..'


describe('Тесты страницы «404»', () => {
  
  test('рендер заголовка H1', () => {
    render(
      <Router>
        <ErrorPage />
      </Router>
    )
    
    const element = screen.getByText('Ошибка сервера')
    expect(element).toBeInTheDocument()
  })

  test('отображение весёлой картинки', () => {
    render(
      <Router>
        <ErrorPage />
      </Router>
    )

    const testImage = screen.getByRole('img') as HTMLImageElement
    expect(testImage.alt).toMatch(/error server/i)
  })

  test('снепшот страницы', () => {
    const { baseElement } = render(
      <Router>
        <ErrorPage />
      </Router>
    )
    
    expect(baseElement).toMatchSnapshot()
  })
})
