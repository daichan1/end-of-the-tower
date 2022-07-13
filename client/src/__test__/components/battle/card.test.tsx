import { screen, fireEvent } from "@testing-library/react"
import { render } from '../../testProvider'
import { CardType } from '../../../types/model/index'
import Card from '../../../components/battle/card'

describe("card component", () => {
  const card: CardType = {
    id: 1,
    name: "ストライク",
    description: "6ダメージを与える",
    imageUrl: "none",
    cost: 1,
    cardType: "アタック",
    attack: 6,
    defense: 0,
    actionName: "strike",
    executionCount: 1,
    effectType: "oneAttack"
  }

  it("initial render", () => {
    const dummyFunction = jest.fn((card: CardType) => jest.fn())
    render(<Card width={125} height={175} imgHeight={55} cssClass="test" card={card} clickCard={dummyFunction} />)

    const cardName = screen.getByTestId('cardName')
    const cardCost = screen.getByTestId('cardCost')
    const img = screen.getByRole('img')
    const cardDescription = screen.getByTestId('cardDescription')

    expect(cardName.textContent).toBe("ストライク")
    expect(cardCost.textContent).toBe("1")
    expect(img).toBeInTheDocument()
    expect(cardDescription.textContent).toBe("6ダメージを与える")
  })

  it("card click", () => {
    const dummyFunction = jest.fn((card: CardType) => jest.fn())
    render(<Card width={125} height={175} imgHeight={55} cssClass="test" card={card} clickCard={dummyFunction} />)

    const cardComponent = screen.getByTestId('card')
    fireEvent.click(cardComponent)

    expect(dummyFunction).toHaveBeenCalled()
    expect(dummyFunction).toHaveBeenCalledWith(card)
  })
})
