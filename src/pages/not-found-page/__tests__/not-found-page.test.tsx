import { render, screen } from '@testing-library/react'
import {BrowserRouter as Router} from 'react-router-dom'
import { NotFoundPage } from '..'


describe('Тесты страницы «404»', () => {
  
  test('рендер заголовка H1', () => {
    render(
      <Router>
        <NotFoundPage />
      </Router>
    )
    
    const element = screen.getByText('Страница не найдена')
    expect(element).toBeInTheDocument()
  })

  test('отображение весёлой картинки', () => {
    render(
      <Router>
        <NotFoundPage />
      </Router>
    )

    const testImage = screen.getByRole('img') as HTMLImageElement
    expect(testImage.alt).toMatch(/not found/i)
  })

  test('снепшот страницы', () => {
    const { baseElement } = render(
      <Router>
        <NotFoundPage />
      </Router>
    )
    
    expect(baseElement).toMatchSnapshot()
  })
})
