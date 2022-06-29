import { screen } from "@testing-library/react"
import { render } from '../../testProvider'
import Player from '../../../components/battle/player'
import { playerStore, PreloadedState } from '../../factories/battle/player'

describe("player component", () => {
  it("initial render", () => {
    const store = playerStore()
    render(<Player />, store)

    const img = screen.getByRole('img')
    const playerDamage = screen.getByTestId('playerDamage')
    const playerHp = screen.getByTestId('playerHp')
    const playerDefense = screen.getByTestId('playerDefense')

    expect(img).toBeInTheDocument()
    expect(playerDamage.textContent).toBe("0")
    expect(playerHp.textContent).toBe("80/80")
    expect(playerDefense.textContent).toBe("0")
  })

  it("change player status", () => {
    const state: PreloadedState = {
      player: {
        name: "アタッカー",
        imageUrl: "none",
        hp: 50,
        maxHp: 80,
        attack: 0,
        defense: 8,
        energy: 3,
        stage: 0,
        deck: [],
        nameplate: [],
        cemetery: []
      },
      playerDamage: 5,
    }
    const store = playerStore(state)
    render(<Player />, store)

    const playerDamage = screen.getByTestId('playerDamage')
    const playerHp = screen.getByTestId('playerHp')
    const playerDefense = screen.getByTestId('playerDefense')

    expect(playerDamage.textContent).toBe("5")
    expect(playerHp.textContent).toBe("50/80")
    expect(playerDefense.textContent).toBe("8")
  })
})
