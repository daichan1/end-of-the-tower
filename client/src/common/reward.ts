import { CardType } from '../types/model/index'

export const getDisplayRewardCards = (cards: CardType[]): CardType[] => {
  const result: CardType[] = []
  let rewardCards: CardType[] = JSON.parse(JSON.stringify(cards))
  rewardCards = CardsShuffle(rewardCards)
  rewardCards.forEach((card, index) => {
    if (index < 3) { result.push(card) }
  })
  return result
}

const CardsShuffle = (cards: CardType[]): CardType[] => {
  for (let i = cards.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1))
    const tmp = cards[i]
    cards[i] = cards[r]
    cards[r] = tmp
  }
  return cards
}
