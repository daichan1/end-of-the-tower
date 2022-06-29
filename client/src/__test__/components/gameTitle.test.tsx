import { fireEvent, screen } from "@testing-library/react"
import { render } from '../testProvider'
import GameTitle from '../../components/gameTitle'
import { gameTitleStore } from '../factories/gameTitle'

describe("game title component", () => {
  it("initial render", () => {
    const store = gameTitleStore()
    render(<GameTitle />, store)

    const title = screen.getByText('End of the Tower')
    const button = screen.getByText('ゲームスタート')

    expect(title).toBeInTheDocument()
    expect(button).toBeInTheDocument()
    expect(screen.queryByText('キャラクターを選択してください')).toBeNull()
  })

  it("render modal after click game start button", () => {
    const store = gameTitleStore()
    render(<GameTitle />, store)

    const button = screen.getByText('ゲームスタート')
    fireEvent.click(button)
    const modalText = screen.getByText('キャラクターを選択してください')
    const images = screen.getAllByRole('img')

    expect(modalText).toBeInTheDocument()
    expect(images.length).toBe(3)
  })

  it("screen switching after character select button click", () => {
    const store = gameTitleStore()
    render(<GameTitle />, store)

    const gameStartButton = screen.getByText('ゲームスタート')
    fireEvent.click(gameStartButton)
    const playerSelectButtons = screen.getByText('アタッカー')
    fireEvent.click(playerSelectButtons)

    expect(store.getState().gameTitle).toEqual(true)
    expect(store.getState().rootSelect).toEqual(false)
    expect(screen.queryByText('キャラクターを選択してください')).toBeNull()
  })
})
