import { screen } from "@testing-library/react"
import { render } from '../../testProvider'
import Deck from '../../../components/battle/deck'
import { deckStore } from '../../factories/battle/deck'

describe("deck component", () => {
  it("initial render", () => {
    const store = deckStore()
    render(<Deck />, store)

    const deckCount = screen.getByTestId('deckCount')

    expect(deckCount.textContent).toBe("2")
  })
})
