import { PlayerType, EnemyType } from '../types/model/index'
import { enemyAttack, isRemainsHp } from '../common/battle'

export const enemyAction = (player: PlayerType, enemies: EnemyType[]): void => {
  enemies.forEach((enemy) => {
    enemyAttack(player, enemy)
  })
}

export const checkRemainingHp = (enemies: EnemyType[]): void => {
  enemies.forEach((enemy, index) => {
    if (!isRemainsHp(enemy)) {
      enemies.splice(index, 1)
    }
  })
}

export const isExistEnemy = (enemies: EnemyType[]): boolean => {
  return enemies.length > 0 ? true : false
}
