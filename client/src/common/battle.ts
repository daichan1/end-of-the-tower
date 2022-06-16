import { PlayerType, EnemyType, CardType } from '../types/model'

export const addBlock = (character: PlayerType | EnemyType, defense: number): void => {
  character.defense += defense
}

export const sleep = (msec: number) => new Promise(resolve => setTimeout(resolve, msec))

export const hpAdjustment = (value: number, maxHp: number, minHp: number): number => {
  return ((value - minHp) * 100) / (maxHp - minHp)
}

export const cardsShuffle = (cards: CardType[]): CardType[] => {
  for (let i = cards.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1))
    const tmp = cards[i]
    cards[i] = cards[r]
    cards[r] = tmp
  }
  return cards
}

export const isRemainsHp = (character: PlayerType | EnemyType): boolean => {
  return character.hp > 0 ? true : false
}

export const calcDamage = (character: PlayerType | EnemyType, attack: number): number => {
  let damage = 0
  const diff = character.defense - attack
  if (diff < 0) {
    subtractDefense(character, 0)
    damage = Math.abs(diff)
  } else {
    subtractDefense(character, diff)
    damage = 0
  }
  return damage
}

export const calcBlockDamage = (character: PlayerType | EnemyType, attack: number): void => {
  const diff = character.defense - attack
  if (diff < 0) {
    subtractDefense(character, 0)
  } else {
    subtractDefense(character, diff)
  }
}

export const subtractHp = (character: PlayerType | EnemyType, damage: number): void => {
  character.hp -= damage
}

const subtractDefense = (character: PlayerType | EnemyType, defense: number): void => {
  character.defense = defense
}
