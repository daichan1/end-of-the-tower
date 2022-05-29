import { CardBaseType, CardType } from '../types/model/index'
import { deckShuffle } from '../common/battle'

export const initializeDeck = (cardList: CardBaseType[]): CardType[] => {
  let defaultDeck: CardType[] = []
  let cardId = 1
  const strike: CardBaseType | undefined = cardList.find((card: CardBaseType) => card.name === "ストライク")
  const protection: CardBaseType | undefined = cardList.find((card: CardBaseType) => card.name === "ぼうぎょ")
  if (strike !== undefined) {
    for (let i = 0; i < 5; i++) {
      defaultDeck.push({
        id: cardId,
        name: strike.name,
        description: strike.description,
        imageUrl: strike.imageUrl,
        cost: strike.cost,
        cardType: strike.cardType,
        attack: strike.attack,
        defense: strike.defense,
        actionName: strike.actionName
      })
      cardId += 1
    }
  }
  if (protection !== undefined) {
    for (let i = 0; i < 5; i++) {
      defaultDeck.push({
        id: cardId,
        name: protection.name,
        description: protection.description,
        imageUrl: protection.imageUrl,
        cost: protection.cost,
        cardType: protection.cardType,
        attack: protection.attack,
        defense: protection.defense,
        actionName: protection.actionName
      })
      cardId += 1
    }
  }
  defaultDeck = deckShuffle(defaultDeck)
  return defaultDeck
}
