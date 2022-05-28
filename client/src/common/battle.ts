import { PlayerType, EnemyType, CardType } from '../types/model'

export const playerAttack = (player: PlayerType, enemy: EnemyType, card: CardType): void => {
  const playerAttackPoint = player.attack + card.attack
  const damage = calcDamage(playerAttackPoint, enemy.defense)
  enemy.hp -= damage
}

export const enemyAttack = (player: PlayerType, enemy: EnemyType): void => {
  const damage = calcDamage(enemy.attack, player.defense)
  player.hp -= damage
}

export const addBlock = (player: PlayerType, card: CardType): void => {
  player.defense += card.defense
}

const calcDamage = (attackPoint: number, defensePoint: number): number => {
  const diff = defensePoint - attackPoint
  const damage = diff < 0 ? Math.abs(diff) : 0
  return damage
}
