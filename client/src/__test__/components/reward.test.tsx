import { screen, fireEvent } from "@testing-library/react"
import { render } from '../testProvider'
import Reward from '../../components/reward'
import { rewardStore, PreloadedState, cards } from '../factories/reward'

describe("reward component", () => {
  it("initial render", () => {
    const store = rewardStore()
    render(<Reward />, store)

    const message = screen.getByText('勝利！')
    const subMessage = screen.getByText('カードを1枚選択してください')
    const rewardCards = screen.getAllByTestId('rewardCard')
    const button = screen.getByText('スキップ')

    expect(message).toBeInTheDocument()
    expect(subMessage).toBeInTheDocument()
    expect(rewardCards.length).toBe(3)
    expect(button).toBeInTheDocument()
    expect(screen.queryByTestId('modalRewardCard')).toBeNull()
  })

  it("reward card click", () => {
    const store = rewardStore()
    render(<Reward />, store)

    const rewardCards = screen.getAllByTestId('card')
    fireEvent.click(rewardCards[0])

    const modalRewardCard = screen.getByTestId('modalRewardCard')

    expect(modalRewardCard).toBeInTheDocument()
  })

  it("modal reward card click", () => {
    const store = rewardStore()
    render(<Reward />, store)

    const rewardCards = screen.getAllByTestId('card')
    fireEvent.click(rewardCards[0])

    const modalRewardCard = screen.getAllByTestId('card')
    fireEvent.click(modalRewardCard[modalRewardCard.length - 1])

    const reward = screen.getByTestId('reward')

    expect(store.getState().player.deck.length).toBe(1)
    expect(reward).not.toBeVisible()
  })

  it("when boss destroyed modal reward card click", () => {
    const state: PreloadedState = {
      player: {
        name: "アタッカー",
        imageUrl: "none",
        hp: 80,
        maxHp: 80,
        attack: 0,
        defense: 0,
        energy: 3,
        stage: 6,
        deck: [],
        nameplate: [],
        cemetery: []
      },
      reward: {
        disabled: false,
        displayCards: cards,
        cards: cards
      },
      floor: 0
    }
    const store = rewardStore(state)
    render(<Reward />, store)

    const rewardCards = screen.getAllByTestId('card')
    fireEvent.click(rewardCards[0])

    const modalRewardCard = screen.getAllByTestId('card')
    fireEvent.click(modalRewardCard[modalRewardCard.length - 1])

    expect(store.getState().floor).toBe(1)
  })

  it("skip button click", () => {
    const store = rewardStore()
    render(<Reward />, store)

    const button = screen.getByText('スキップ')
    fireEvent.click(button)

    const reward = screen.getByTestId('reward')

    expect(reward).not.toBeVisible()
  })
})
