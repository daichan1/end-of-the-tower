import { PlayerType, EnemyType, CardType } from '../types/model'

export const playerAttack = (player: PlayerType, enemy: EnemyType, card: CardType): void => {
  const playerAttackPoint = player.attack + card.attack
  const damage = calcDamage(playerAttackPoint, enemy.defense)
  enemy.hp -= damage
}

const calcDamage = (attackPoint: number, defensePoint: number): number => {
  const diff = defensePoint - attackPoint
  const damage = diff < 0 ? Math.abs(diff) : 0
  return damage
}
