import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import reportWebVitals from './reportWebVitals'
import { App } from './app'
import { ErrorBoundary } from 'components/error-boundary'
import { store } from 'store'
import './index.css'


const persistor = persistStore(store)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)


root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
