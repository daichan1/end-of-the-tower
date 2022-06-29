import { fireEvent, screen } from '@testing-library/react'
import { render } from '../../testProvider'
import Circle from '../../../components/root_select/circle'
import { circleStore } from '../../factories/root_select/circle'

describe('Circle Component', () => {
  it('render circle button', () => {
    const store = circleStore()
    render(<Circle left={10} top={510} rootNumber={0} />, store)

    const circle = screen.getByRole('button')
    expect(circle).toBeInTheDocument()
  })

  it("display battle component after click", () => {
    const store = circleStore()
    render(<Circle left={10} top={510} rootNumber={0} />, store)

    expect(store.getState().battle).toEqual(true)

    const circle = screen.getByRole('button')
    fireEvent.click(circle)
    expect(store.getState().battle).toEqual(false)
  })

  it("disabled battle component after click", () => {
    const store = circleStore()
    render(<Circle left={10} top={510} rootNumber={1} />, store)

    expect(store.getState().battle).toEqual(true)

    const circle = screen.getByRole('button')
    fireEvent.click(circle)
    expect(store.getState().battle).toEqual(true)
  })
})
