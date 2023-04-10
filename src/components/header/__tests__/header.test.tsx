import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Header } from '..'


// const handleMenuOpen = jest.fn()

describe('Тесты компонента Header', () => {
  test('рендер изображения - логотипа', () => {
    render(
      <Router>
        <Header />
      </Router>
    )

    const element = screen.getByTestId('logo')
    expect(element).toBeInTheDocument()
  })


  test('рендер изображения - меню', () => {
    render(
      <Router>
        <Header />
      </Router>
    )

    const element = screen.getByTestId('menu')
    expect(element).toBeInTheDocument()
  })


  test('рендер текста - меню', () => {
    render(
      <Router>
        <Header />
      </Router>
    )

    const element = screen.getByText('МЕНЮ')
    expect(element).toBeInTheDocument()
  })


  test('снепшот компонента', () => {
    const { baseElement } = render(
      <Router>
        <Header />
      </Router>
    )

    expect(baseElement).toMatchSnapshot()
  })
})
