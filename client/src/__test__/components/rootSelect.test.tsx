import { screen } from "@testing-library/react"
import { render } from '../testProvider'
import RootSelect from '../../components/rootSelect'
import { rootSelectStore, PreloadedState } from '../factories/rootSelect'

describe('root select component', () => {
  it("initial render", () => {
    const store = rootSelectStore()
    render(<RootSelect />, store)

    const img = screen.getByRole('img')
    const circles = screen.getAllByRole('button')
    const lines = screen.getAllByTestId('line')

    expect(img).toBeInTheDocument()
    expect(circles.length).toBe(6)
    expect(lines.length).toBe(5)
  })

  it("display none", () => {
    const state: PreloadedState = {
      player: {
        name: "アタッカー",
        imageUrl: "none",
        hp: 80,
        maxHp: 80,
        attack: 0,
        defense: 0,
        energy: 3,
        stage: 0,
        deck: [],
        nameplate: [],
        cemetery: []
      },
      rootSelect: true
    }
    const store = rootSelectStore(state)
    render(<RootSelect />, store)

    expect(screen.getByTestId('rootSelect')).not.toBeVisible()
  })
})
