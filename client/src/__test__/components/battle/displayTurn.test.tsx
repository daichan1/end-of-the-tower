import { screen } from "@testing-library/react"
import { render } from '../../testProvider'
import DisplayTurn from '../../../components/battle/displayTurn'
import { displayTurnStore, PreloadedState } from '../../factories/battle/displayTurn'

describe("display turn component", () => {
  it("player turn", () => {
    const store = displayTurnStore()
    render(<DisplayTurn />, store)

    const paper = screen.getByTestId('playerTurn')

    expect(paper.textContent).toBe("プレイヤーのターン")
  })

  it("enemy turn", () => {
    const state: PreloadedState = {
      turn: false
    }
    const store = displayTurnStore(state)
    render(<DisplayTurn />, store)

    const paper = screen.getByTestId('enemyTurn')

    expect(paper.textContent).toBe('敵のターン')
  })
})
