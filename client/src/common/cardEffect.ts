import { PlayerType, EnemyType, CardType } from '../types/model'
import { calcDamage, subtractHp, calcBlockDamage } from '../common/battle'

export const attack = (player: PlayerType, enemy: EnemyType, card: CardType): number => {
  const attack = player.attack + card.attack
  const damage = calcDamage(enemy, attack)
  subtractHp(enemy, damage)
  return damage
}

export const randomAttack = (player: PlayerType, enemy: EnemyType, card: CardType): number => {
  const max = Number(card.description.split('~')[1].substring(0, 1)) + 1
  const attack = player.attack + Math.floor(Math.random() * (max - card.attack) + card.attack)
  const damage = calcDamage(enemy, attack)
  subtractHp(enemy, damage)
  return damage
}

export const blockAttack = (enemy: EnemyType, card: CardType): void => {
  calcBlockDamage(enemy, card.attack)
}

export const addBlock = (character: PlayerType | EnemyType, defense: number): void => {
  character.defense += defense
}

export const cardDraw = (player: PlayerType, num: number): void => {
  player.deck.forEach((card, i) => {
    if (i < num) { player.nameplate.push(card) }
  })
  player.deck.splice(0, num)
}
