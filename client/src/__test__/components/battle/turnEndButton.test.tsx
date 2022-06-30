import { fireEvent, screen } from "@testing-library/react"
import { render } from '../../testProvider'
import TurnEndButton from '../../../components/battle/turnEndButton'
import { turnEndButtonStore } from '../../factories/battle/turnEndButton'

describe("turn end button component", () => {
  it("initial render", () => {
    const store = turnEndButtonStore()
    render(<TurnEndButton />, store)

    const button = screen.getByText('ターン終了')

    expect(button).toBeInTheDocument()
    expect(button).not.toBeDisabled()
  })

  it("turn value change after click", () => {
    const store = turnEndButtonStore()
    render(<TurnEndButton />, store)

    const button = screen.getByText('ターン終了')
    fireEvent.click(button)

    expect(store.getState().turn).toBe(false)
    expect(button).toBeDisabled()
  })
})
