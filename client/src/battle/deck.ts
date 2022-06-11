import { CardBaseType, CardType } from '../types/model/index'
import { ResCard } from '../types/api/response'

export const initializeAllPlayerCards = (cardList: CardBaseType[]): CardType[] => {
  const defaultDeck: CardType[] = []
  let cardId = 1
  const strike: CardBaseType | undefined = cardList.find((card: CardBaseType) => card.name === "ストライク")
  const protection: CardBaseType | undefined = cardList.find((card: CardBaseType) => card.name === "ぼうぎょ")
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
        executionCount: strike.executionCount
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
        executionCount: protection.executionCount
      })
      cardId += 1
    }
  }
  return defaultDeck
}

export const initializeAttackerCards = (attackerCards: ResCard[]): CardType[] => {
  const resultCards: CardType[] = []
  let cardId = 8
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
      executionCount: scorpion.execution_count
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
      executionCount: moleclaw.execution_count
    })
  }
  return resultCards
}
