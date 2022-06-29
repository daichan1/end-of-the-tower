import { screen } from "@testing-library/react"
import { render } from '../../testProvider'
import Energy from '../../../components/battle/energy'
import { energyStore, PreloadedState } from '../../factories/battle/energy'

describe("energy component", () => {
  it("initial render", () => {
    const store = energyStore()
    render(<Energy />, store)

    const energy = screen.getByTestId('energy')

    expect(energy.textContent).toBe("3/3")
  })

  it("energy depletion render", () => {
    const state: PreloadedState = {
      player: {
        name: "アタッカー",
        imageUrl: "none",
        hp: 80,
        maxHp: 80,
        attack: 0,
        defense: 0,
        energy: 2,
        stage: 0,
        deck: [],
        nameplate: [],
        cemetery: []
      }
    }
    const store = energyStore(state)
    render(<Energy />, store)

    const energy = screen.getByTestId('energy')

    expect(energy.textContent).toBe("2/3")
  })
})
