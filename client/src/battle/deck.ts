import { CardType } from '../types/model'

export const deckShuffle = (deck: CardType[]): CardType[] => {
  for (let i = deck.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1))
    const tmp = deck[i]
    deck[i] = deck[r]
    deck[r] = tmp
  }
  return deck
}
