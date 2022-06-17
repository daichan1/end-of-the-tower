import { CardType } from '../types/model/index'
import { ResCard, ResPlayer } from '../types/api/response'

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

export const initializePlayerUniqueCards = (player: ResPlayer, playerUniqueCards: ResCard[]): CardType[] => {
  const resultCards: CardType[] = []
  let firstUniqueCard: ResCard | undefined = undefined
  let secondUniqueCard: ResCard | undefined = undefined
  let cardId = 9
  if (player.name === "アタッカー") {
    firstUniqueCard = playerUniqueCards.find((card: ResCard) => card.name === "スコーピオン")
    secondUniqueCard = playerUniqueCards.find((card: ResCard) => card.name === "モールクロー")
  } else if (player.name === "シューター") {
    firstUniqueCard = playerUniqueCards.find((card: ResCard) => card.name === "アステロイド")
    secondUniqueCard = playerUniqueCards.find((card: ResCard) => card.name === "グレネード")
  }

  if (firstUniqueCard !== undefined) {
    resultCards.push({
      id: cardId,
      name: firstUniqueCard.name,
      description: firstUniqueCard.description,
      imageUrl: firstUniqueCard.image_url,
      cost: firstUniqueCard.cost,
      cardType: firstUniqueCard.card_type,
      attack: firstUniqueCard.attack,
      defense: firstUniqueCard.defense,
      actionName: firstUniqueCard.action_name,
      executionCount: firstUniqueCard.execution_count,
      effectType: firstUniqueCard.effect_type
    })
    cardId += 1
  }
  if (secondUniqueCard !== undefined) {
    resultCards.push({
      id: cardId,
      name: secondUniqueCard.name,
      description: secondUniqueCard.description,
      imageUrl: secondUniqueCard.image_url,
      cost: secondUniqueCard.cost,
      cardType: secondUniqueCard.card_type,
      attack: secondUniqueCard.attack,
      defense: secondUniqueCard.defense,
      actionName: secondUniqueCard.action_name,
      executionCount: secondUniqueCard.execution_count,
      effectType: secondUniqueCard.effect_type
    })
  }
  return resultCards
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
