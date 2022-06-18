import { CardType } from '../types/model/index'
import { ResCard } from '../types/api/response'
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

export const resCardToCard = (resCards: ResCard[]): CardType[] => {
  const resultCards: CardType[] = []
  resCards.forEach(card => {
    resultCards.push({
      id: card.id,
      name: card.name,
      description: card.description,
      imageUrl: card.image_url,
      cost: card.cost,
      cardType: card.card_type,
      attack: card.attack,
      defense: card.defense,
      actionName: card.action_name,
      executionCount: card.execution_count,
      effectType: card.effect_type
    })
  })
  return resultCards
}

export const getAllPlayerRewardCards = (cards: CardType[]): CardType[] => {
  const resultCards = cards.filter(card => filterAllPlayerRewardCards(card.name))
  return resultCards
}

const filterAllPlayerRewardCards = (cardName: string): boolean => {
  if (cardName === "ストライク" || cardName === "ぼうぎょ") {
    return false
  } else {
    return true
  }
}
