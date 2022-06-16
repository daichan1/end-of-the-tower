import { CardType } from '../types/model/index'
import { cardsShuffle } from '../common/battle'

export const getDisplayRewardCards = (cards: CardType[]): CardType[] => {
  const result: CardType[] = []
  let rewardCards: CardType[] = JSON.parse(JSON.stringify(cards))
  rewardCards = cardsShuffle(rewardCards)
  rewardCards.forEach((card, index) => {
    if (index < 3) { result.push(card) }
  })
  return result
}
