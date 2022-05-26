import { CardType } from '../types/model/index'

export const initializeDeck = (cardList: CardType[]): CardType[] => {
  let defaultDeck: CardType[] = []
  const strike: CardType | undefined = cardList.find((card: CardType) => card.name === "ストライク")
  const protection: CardType | undefined = cardList.find((card: CardType) => card.name === "ぼうぎょ")
  if (strike !== undefined) {
    for (let i = 0; i < 5; i++) {
      defaultDeck.push(strike)
    }
  }
  if (protection !== undefined) {
    for (let i = 0; i < 5; i++) {
      defaultDeck.push(protection)
    }
  }
  defaultDeck = deckShuffle(defaultDeck)
  return defaultDeck
}

const deckShuffle = (deck: CardType[]): CardType[] => {
  for (let i = deck.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1))
    const tmp = deck[i]
    deck[i] = deck[r]
    deck[r] = tmp
  }
  return deck
}
