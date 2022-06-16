import { CardType } from '../types/model/index'
import { ResCard } from '../types/api/response'

export const initializeAllPlayerCards = (cardList: CardType[]): CardType[] => {
  const defaultDeck: CardType[] = []
  let cardId = 1
  const strike: CardType | undefined = cardList.find((card: CardType) => card.name === "ストライク")
  const protection: CardType | undefined = cardList.find((card: CardType) => card.name === "ぼうぎょ")
  if (strike !== undefined) {
    for (let i = 0; i < 4; i++) {
      defaultDeck.push({
        id: cardId,
        name: strike.name,
        description: strike.description,
        imageUrl: strike.imageUrl,
        cost: strike.cost,
        cardType: strike.cardType,
        attack: strike.attack,
        defense: strike.defense,
        actionName: strike.actionName,
        executionCount: strike.executionCount,
        effectType: strike.effectType
      })
      cardId += 1
    }
  }
  if (protection !== undefined) {
    for (let i = 0; i < 4; i++) {
      defaultDeck.push({
        id: cardId,
        name: protection.name,
        description: protection.description,
        imageUrl: protection.imageUrl,
        cost: protection.cost,
        cardType: protection.cardType,
        attack: protection.attack,
        defense: protection.defense,
        actionName: protection.actionName,
        executionCount: protection.executionCount,
        effectType: protection.effectType
      })
      cardId += 1
    }
  }
  return defaultDeck
}

export const initializeAttackerCards = (attackerCards: ResCard[]): CardType[] => {
  const resultCards: CardType[] = []
  let cardId = 9
  const scorpion: ResCard | undefined = attackerCards.find((card: ResCard) => card.name === "スコーピオン")
  const moleclaw: ResCard | undefined = attackerCards.find((card: ResCard) => card.name === "モールクロー")
  if (scorpion !== undefined) {
    resultCards.push({
      id: cardId,
      name: scorpion.name,
      description: scorpion.description,
      imageUrl: scorpion.image_url,
      cost: scorpion.cost,
      cardType: scorpion.card_type,
      attack: scorpion.attack,
      defense: scorpion.defense,
      actionName: scorpion.action_name,
      executionCount: scorpion.execution_count,
      effectType: scorpion.effect_type
    })
    cardId += 1
  }
  if (moleclaw !== undefined) {
    resultCards.push({
      id: cardId,
      name: moleclaw.name,
      description: moleclaw.description,
      imageUrl: moleclaw.image_url,
      cost: moleclaw.cost,
      cardType: moleclaw.card_type,
      attack: moleclaw.attack,
      defense: moleclaw.defense,
      actionName: moleclaw.action_name,
      executionCount: moleclaw.execution_count,
      effectType: moleclaw.effect_type
    })
  }
  return resultCards
}

export const resCardToCard = (resCards: ResCard[]): CardType[] => {
  const resultCards: CardType[] = []
  resCards.forEach(card => {
    resultCards.push({
      // 型の統一を行うまでこのまま
      id: 0,
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
