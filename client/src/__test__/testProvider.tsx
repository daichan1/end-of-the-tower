import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { render as rtlRender } from '@testing-library/react'

export const render = (component: JSX.Element, store: EnhancedStore) => {
  return rtlRender(<Provider store={store} >{component}</Provider>)
}
