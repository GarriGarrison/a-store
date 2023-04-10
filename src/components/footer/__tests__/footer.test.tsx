import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Footer } from '..'


describe('Тесты компонента Footer', () => {

  test('рендер текста - юридическое название фирмы', () => {
    render(
      <Router>
        <Footer />
      </Router>
    )

    const element = screen.getByText(/«Альфа Фьюче Пипл»/i)
    expect(element).toBeInTheDocument()
  })

  test('рендер текста - Политика конфиденциальности и обработки персональных данных', () => {
    render(
      <Router>
        <Footer />
      </Router>
    )

    const elementPolicy = screen.getByText(/Политика конфиденциальности/)
    expect(elementPolicy).toBeInTheDocument()

    const elementDataPersonal = screen.getByText(/и обработки персональных данных/)
    expect(elementDataPersonal).toBeInTheDocument()
  })

  test('снепшот компонента', () => {
    const { baseElement } = render(
      <Router>
        <Footer />
      </Router>
    )

    expect(baseElement).toMatchSnapshot()
  })
})
