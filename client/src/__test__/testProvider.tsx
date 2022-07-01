import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { render as rtlRender } from '@testing-library/react'

// Storeを使用するコンポーネントと使用しないコンポーネントを分ける
export const render = (component: JSX.Element, store?: EnhancedStore) => {
  if (store !== undefined) {
    return rtlRender(<Provider store={store} >{component}</Provider>)
  } else {
    return rtlRender(<div>{component}</div>)
  }
}
