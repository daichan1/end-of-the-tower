import { screen } from "@testing-library/react"
import { render } from '../../testProvider'
import Header from '../../../components/battle/header'
import { headerStore } from '../../factories/battle/header'

describe("header component", () => {
  it("initial render", () => {
    const store = headerStore()
    render(<Header />, store)

    const userName = screen.getByText('プレイヤー')
    const playerName = screen.getByTestId('playerName')

    expect(userName).toBeInTheDocument()
    expect(playerName.textContent).toBe('アタッカー')
  })
})
