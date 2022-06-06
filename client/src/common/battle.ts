import { PlayerType, EnemyType, CardType } from '../types/model'

export const playerAttack = (player: PlayerType, enemy: EnemyType, card: CardType): void => {
  const damage = calcDamage(enemy, player.attack)
  enemy.hp -= damage
}

export const addBlock = (character: PlayerType | EnemyType, defense: number): void => {
  character.defense += defense
}

export const sleep = (msec: number) => new Promise(resolve => setTimeout(resolve, msec))

export const hpAdjustment = (value: number, maxHp: number, minHp: number): number => {
  return ((value - minHp) * 100) / (maxHp - minHp)
}

export const deckShuffle = (deck: CardType[]): CardType[] => {
  for (let i = deck.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1))
    const tmp = deck[i]
    deck[i] = deck[r]
    deck[r] = tmp
  }
  return deck
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

export const subtractHp = (character: PlayerType | EnemyType, damage: number): void => {
  character.hp -= damage
}

const subtractDefense = (character: PlayerType | EnemyType, defense: number): void => {
  character.defense = defense
}
