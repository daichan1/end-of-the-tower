import { fireEvent, screen } from "@testing-library/react"
import { render } from '../../testProvider'
import DrawButton from '../../../components/battle/drawButton'
import { drawButtonStore } from '../../factories/battle/drawButton'

describe("draw button component", () => {
  it("initial render", () => {
    const store = drawButtonStore()
    render(<DrawButton />, store)

    const button = screen.getByText('ドロー')

    expect(button).toBeInTheDocument()
    expect(button).not.toBeDisabled()
  })

  it("draw button disabled after click", () => {
    const store = drawButtonStore()
    render(<DrawButton />, store)

    const button = screen.getByText('ドロー')
    fireEvent.click(button)

    expect(button).toBeDisabled()
  })
})
